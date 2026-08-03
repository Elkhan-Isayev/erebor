/**
 * Kithara — procedural ancient music on the Web Audio API.
 *
 * Higgsfield does not generate music as a standalone asset, so the sound is
 * synthesised in the browser instead. That turned out to suit the site better
 * anyway: the mode changes together with the scene, the piece never repeats,
 * and it weighs nothing.
 *
 * The tuning is real. An ancient scale is built from tetrachords, and a
 * tetrachord exists in three genera (γένη). In cents:
 *
 *   diatonic    semitone + tone + tone
 *   chromatic   semitone + semitone + tone and a half
 *   enharmonic  a quarter-tone pyknon + a ditone
 *
 * An octave is two tetrachords separated by a whole tone (the diazeuxis).
 */

export type Genus = 'diatonic' | 'chromatic' | 'enharmonic';

const GENERA: Record<Genus, number[]> = {
  diatonic: [0, 100, 300, 500],
  chromatic: [0, 100, 200, 500],
  enharmonic: [0, 50, 100, 500],
};

export interface Mood {
  genus: Genus;
  /** Frequency of the mese — the tonic of the mode, Hz. */
  tonic: number;
  /** Average gap between plucks, seconds. */
  gap: number;
}

export const DEFAULT_MOOD: Mood = { genus: 'enharmonic', tonic: 130.81, gap: 2.4 };

/** Tetrachord + disjunctive tone + tetrachord. */
function octaveCents(genus: Genus): number[] {
  const lower = GENERA[genus];
  return [...lower, ...lower.map((c) => c + 700)];
}

/**
 * Impulse response of a stone hall.
 *
 * The amplitude has to be pushed right down: convolving with full-scale noise
 * produces enormous gain — the output was close to clipping instead of a
 * distant reverberation.
 */
function makeImpulse(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const ir = ctx.createBuffer(2, length, ctx.sampleRate);
  const amplitude = 0.2;

  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay) * amplitude;
    }
  }
  return ir;
}

/** Brown noise — the low, breathing body of a flame. */
function brownNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.2;
  }
  return buffer;
}

/** One spit of a burning torch: a noise grain with a very fast decay. */
function crackleBuffer(ctx: AudioContext, ms: number): AudioBuffer {
  const length = Math.floor((ctx.sampleRate * ms) / 1000);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 6);
  }
  return buffer;
}

/**
 * Karplus–Strong pluck: a short burst of noise looped through a delay line
 * with smoothing. It gives the gut-string ring characteristic of a lyre.
 */
function pluckBuffer(ctx: AudioContext, freq: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const period = Math.max(2, Math.round(sr / freq));
  const length = Math.floor(sr * 3.4);
  const buffer = ctx.createBuffer(1, length, sr);
  const out = buffer.getChannelData(0);

  // Excitation is smoothed noise: without smoothing the pluck reads as a clap.
  const line = new Float32Array(period);
  let smoothed = 0;
  for (let i = 0; i < period; i++) {
    smoothed += (Math.random() * 2 - 1 - smoothed) * 0.45;
    line[i] = smoothed;
  }

  let index = 0;
  let previous = 0;
  const decay = 0.9945;

  for (let i = 0; i < length; i++) {
    const current = line[index];
    line[index] = (current + previous) * 0.5 * decay;
    previous = current;
    out[i] = current;
    index = (index + 1) % period;
  }

  // The tail is faded by hand, otherwise the end of the buffer clicks.
  const tail = Math.floor(sr * 0.35);
  for (let i = length - tail; i < length; i++) {
    out[i] *= (length - i) / tail;
  }

  return buffer;
}

export class Kithara {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private wet!: GainNode;
  private dry!: GainNode;
  private droneGain!: GainNode;
  private drones: OscillatorNode[] = [];

  private fire!: GainNode;
  private crackles: AudioBuffer[] = [];
  private nextCrackleAt = 0;

  private plucks = new Map<number, AudioBuffer>();
  private mood: Mood = DEFAULT_MOOD;
  private degree = 0;
  private nextNoteAt = 0;
  private timer: number | null = null;

  /** The level the listener asked for; 0 means off. */
  private level = 0;

  get playing(): boolean {
    return this.level > 0;
  }

  private build() {
    const AC: typeof AudioContext =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;

    this.master = ctx.createGain();
    this.master.gain.value = 0;

    // Safety against peaks: plucks, hall tail and drone can line up.
    const guard = ctx.createDynamicsCompressor();
    guard.threshold.value = -12;
    guard.knee.value = 12;
    guard.ratio.value = 6;
    guard.attack.value = 0.006;
    guard.release.value = 0.4;

    this.master.connect(guard);
    guard.connect(ctx.destination);

    // A stone hall: long reverberation, almost no early signal.
    const convolver = ctx.createConvolver();
    convolver.buffer = makeImpulse(ctx, 3.6, 3.1);

    this.wet = ctx.createGain();
    this.wet.gain.value = 0.5;
    this.wet.connect(convolver);
    convolver.connect(this.master);

    const dry = ctx.createGain();
    dry.gain.value = 0.55;
    dry.connect(this.master);
    this.dry = dry;

    // The ison — a continuous low drone under the melody.
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0.06;

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 420;
    droneFilter.Q.value = 0.7;

    this.droneGain.connect(droneFilter);
    droneFilter.connect(this.master);

    for (const ratio of [1, 1.5]) {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = this.mood.tonic * ratio * 0.5;
      osc.connect(this.droneGain);
      osc.start();
      this.drones.push(osc);
    }

    // The torch. A low bed of filtered noise with a slow breath in the
    // filter, plus irregular crackles on top — so wherever the reader is on
    // the site, the same fire the descent opens with is still burning.
    this.fire = ctx.createGain();
    this.fire.gain.value = 1;
    this.fire.connect(this.master);

    const bed = ctx.createBufferSource();
    bed.buffer = brownNoise(ctx, 4);
    bed.loop = true;

    const bedFilter = ctx.createBiquadFilter();
    bedFilter.type = 'lowpass';
    bedFilter.frequency.value = 430;
    bedFilter.Q.value = 0.6;

    const bedGain = ctx.createGain();
    bedGain.gain.value = 0.16;

    bed.connect(bedFilter);
    bedFilter.connect(bedGain);
    bedGain.connect(this.fire);
    bed.start();

    const breath = ctx.createOscillator();
    breath.frequency.value = 0.13;
    const breathDepth = ctx.createGain();
    breathDepth.gain.value = 150;
    breath.connect(breathDepth);
    breathDepth.connect(bedFilter.frequency);
    breath.start();

    // A handful of grain shapes, varied further by playback rate on use.
    this.crackles = [18, 26, 34, 45, 60, 80].map((ms) => crackleBuffer(ctx, ms));

    // A slight breath on the drone so it does not sound synthetic.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.018;
    lfo.connect(lfoDepth);
    lfoDepth.connect(this.droneGain.gain);
    lfo.start();
  }

  private pluck(freq: number, at: number, gain: number) {
    const ctx = this.ctx!;
    const key = Math.round(freq * 2) / 2;

    let buffer = this.plucks.get(key);
    if (!buffer) {
      buffer = pluckBuffer(ctx, key);
      this.plucks.set(key, buffer);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = freq / key;

    const body = ctx.createBiquadFilter();
    body.type = 'lowpass';
    body.frequency.value = 2400;
    body.Q.value = 0.5;

    const level = ctx.createGain();
    level.gain.value = gain;

    source.connect(body);
    body.connect(level);
    level.connect(this.wet);
    level.connect(this.dry);
    source.start(at);
    source.stop(at + 3.4);
  }

  private crackle(at: number) {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = this.crackles[(Math.random() * this.crackles.length) | 0];
    source.playbackRate.value = 0.7 + Math.random() * 0.9;

    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 800 + Math.random() * 2600;
    band.Q.value = 1.2;

    const level = ctx.createGain();
    level.gain.value = 0.04 + Math.random() * 0.13;

    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.random() * 1.4 - 0.7;

    source.connect(band);
    band.connect(level);
    level.connect(pan);
    pan.connect(this.fire);
    source.start(at);
  }

  /** Free rhythm: a walk across the degrees of the mode, pulled to the tonic. */
  private schedule = () => {
    const ctx = this.ctx;
    if (!ctx || this.level === 0) return;

    const cents = octaveCents(this.mood.genus);
    const horizon = ctx.currentTime + 2;

    // The fire keeps its own irregular pulse, unrelated to the melody.
    while (this.nextCrackleAt < horizon) {
      const at = Math.max(this.nextCrackleAt, ctx.currentTime + 0.05);
      this.crackle(at);
      this.nextCrackleAt = at + 0.04 + Math.random() * 0.5;
    }

    while (this.nextNoteAt < horizon) {
      const at = Math.max(this.nextNoteAt, ctx.currentTime + 0.05);

      // Random walk: small steps most of the time, leaps rarely.
      const step =
        Math.random() < 0.72
          ? Math.random() < 0.5
            ? -1
            : 1
          : Math.random() < 0.5
            ? -2
            : 3;
      this.degree += step;
      if (this.degree < -3) this.degree = -3 + Math.abs(step);
      if (this.degree > 11) this.degree = 11 - Math.abs(step);

      // Every few notes it returns to the tonic, which is what makes the
      // mode audible as a mode.
      if (Math.random() < 0.16) this.degree = 0;

      const octave = Math.floor(this.degree / cents.length);
      const inside = ((this.degree % cents.length) + cents.length) % cents.length;
      const freq = this.mood.tonic * Math.pow(2, (cents[inside] + octave * 1200) / 1200);

      const accent = this.degree === 0 ? 0.38 : 0.25 + Math.random() * 0.1;
      this.pluck(freq, at, accent);

      // The gap floats around the requested one — ancient citharody has no metre.
      this.nextNoteAt = at + this.mood.gap * (0.55 + Math.random() * 0.95);

      // Now and then an empty bar, to let the hall finish ringing.
      if (Math.random() < 0.12) this.nextNoteAt += this.mood.gap;
    }
  };

  async start(level = 0.6) {
    if (!this.ctx) this.build();
    const ctx = this.ctx!;
    if (ctx.state === 'suspended') await ctx.resume();

    this.level = level;
    this.nextNoteAt = ctx.currentTime + 0.3;
    this.nextCrackleAt = ctx.currentTime + 0.1;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(level, ctx.currentTime, 1.2);

    this.schedule();
    if (this.timer === null) {
      this.timer = window.setInterval(this.schedule, 400);
    }
  }

  stop() {
    const ctx = this.ctx;
    this.level = 0;
    if (!ctx) return;

    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.5);

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** Scene change: the mode slides into its new tuning over a few seconds. */
  setMood(mood: Mood) {
    this.mood = mood;
    const ctx = this.ctx;
    if (!ctx) return;

    this.drones.forEach((osc, i) => {
      const ratio = i === 0 ? 1 : 1.5;
      osc.frequency.setTargetAtTime(mood.tonic * ratio * 0.5, ctx.currentTime, 2.2);
    });
  }
}
