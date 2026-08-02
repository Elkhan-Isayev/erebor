# EREBOR

A collection of stories from antiquity — named after the mountain under
which the hoard is kept. The first saga is Homer's *Odyssey*:
ten stations from the ash of Troy to a bowstring drawn in his own hall.

**Live: https://elkhan-isayev.github.io/erebor/**

Built with [Astro](https://astro.build) and content collections, no client
framework. All the interactivity is a handful of small vanilla TS scripts.

```sh
npm install
npm run dev      # http://localhost:4321/erebor/
npm run build    # → dist/
npm run preview
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`withastro/action` and publishes to GitHub Pages. Pages is configured with
GitHub Actions as its build source, not a branch.

It is a **project** site, so everything is served from `/erebor/`. Astro
rewrites the paths it generates itself, but hand-written absolute paths are
not touched — those go through `asset()`, `localePath()` and `anchorPath()` in
`src/i18n/config.ts`, which prepend `import.meta.env.BASE_URL`. Adding a new
`/media/...` reference directly, without `asset()`, will work locally and 404
in production.

## Layout

```
src/
  components/
    ScrollDescent.astro   torchlit descent: canvas, frames driven by scroll
    Station.astro         one station — video scene, lead, story, epigraph
    VoyageMap.astro       the voyage chart, background layer of a saga
    EmberTrail.astro      embers that carry from one scene into the next
    MusicToggle.astro     kithara control
    LanguageSwitcher.astro
    SiteHeader / SiteFooter
    pages/                HomePage, SagaPage — shared by every locale
  content/
    sagas/<locale>/<saga>.md
    stations/<locale>/<saga>/NN-<anchor>.md
  content.config.ts       collection schemas
  i18n/
    config.ts             locales, direction, path helpers
    ui.ts                 every interface string, per locale
    places.ts             map labels, per locale
    content.ts            locale-aware content lookup with fallback
  layouts/Base.astro
  pages/
    index.astro                 English home
    [lang]/index.astro          the other seven
    sagas/[slug].astro          English saga
    [lang]/sagas/[slug].astro   the other seven
  scripts/kithara.ts      ancient music synthesis
  styles/global.css       palette, typography, ornaments, RTL
public/media/
  descent/w1280 · w720    121 descent frames at two widths
  descent/poster.webp     poster and reduced-motion fallback
  stations/*.mp4          ten animated scenes, one per station
```

## Languages

English is the default and is served from the root; the other seven live under
a prefix: `/de`, `/es`, `/fr`, `/el`, `/uk`, `/ru`, `/ar`. Every page emits
`hreflang` alternates for all eight plus `x-default`.

Arabic runs right to left. The layout uses logical properties, so `dir="rtl"`
on `<html>` is nearly enough on its own; the handful of genuinely
direction-bound rules live in one block at the end of `global.css`.

Neither EB Garamond nor Forum carries Arabic, so Arabic switches to **Amiri**,
a Naskh face whose classical feel matches the rest of the design. EB Garamond
covers Latin, Greek and Cyrillic, which is what the other seven need. Letter
spacing and uppercase transforms are switched off for Arabic — they break its
joins and it has no case.

`listSagas` / `listStations` fall back to English per saga when a locale has
no translation yet, so every language stays navigable while translations land
rather than serving an empty page.

**Homeric quotations.** Where a public-domain translation exists and is well
known it is used and credited — Butler for English, Voß for German, Segalá for
Spanish, Leconte de Lisle for French, Zhukovsky for Russian. Greek shows the
original text. Ukrainian and Arabic have no public-domain translation
available, so those renderings were made for this edition and say so; they are
never attributed to a translator who did not write them.

## The torchlit descent

The hero is not a video but a sequence of frames painted into a `<canvas>`.
Scroll inside a block `520svh` tall maps linearly onto a frame number; the
frame on screen chases the target with a little lag, so the motion reads as
film rather than as steps.

- Frames load with a concurrency of 6; the descent unlocks after the first 24
  rather than waiting for all of them, the rest arrive in the background, and
  `nearestLoaded()` makes sure the canvas is never blank.
- Screens narrower than 900px and `Save-Data` get the `w720` set (1.7 MB
  instead of 3.9 MB).
- Under `prefers-reduced-motion: reduce` the sequence is never fetched: poster
  plus all the text layers in ordinary flow.
- `requestAnimationFrame` only runs while the block is on screen and the
  picture has not caught up.

Text layers are pinned to progress through `data-in` / `data-out`. The outer
edge of the first and last layer is never faded — otherwise the title would be
missing at the very top of the page and the call to action at the bottom.

## Station scenes and the transition between them

Each station is a screen of video (10s, looped, silent) and a text panel that
rides over it. A clip is fetched only once its station is close
(`rootMargin: 150%`), plays only while visible, and pauses when the tab goes
away. Until the video arrives an optimised still stands in as the poster, and
it stays under `prefers-reduced-motion`.

Scenes hand off rather than cut. A single scroll-driven `scene-pass` animation
runs across the whole crossing of the viewport: the scene arrives dimmed and
pushed back, settles while it is being read, then recedes again as the panel
takes over. Over the top of all of it, `EmberTrail` paints drifting embers on
a fixed canvas whose fall is driven by scroll delta — the same sparks travel
down with the reader and are still there when the next scene arrives, so
nothing ever reads as a hard boundary.

## The voyage chart

`VoyageMap.astro` is a layer fixed to the viewport underneath the saga. The
station scenes cover it and the text panels are translucent, so the chart is
visible while reading.

Coastlines are built from coordinate lists and projected to SVG in the
template. The ship's position is tied not to overall page progress but to
where the stations actually sit: length along the course is interpolated
between landfalls, so on station V the ship is exactly at Circe.

The course crosses itself off Sicily, and the return leg runs almost through
Polyphemus — so each landfall is located **only ahead** of the previous one.
Without that, Polyphemus snapped to the later leg of the line.

Landfalls follow the traditional identifications (Polyphemus on Sicily, Circe
at Cape Circeo, Calypso on Gozo). Homer ties almost none of them to real
geography, which the note under the table of contents says outright.

## Music

Higgsfield does not generate music as a standalone asset, so the sound is
synthesised in the browser — `src/scripts/kithara.ts`. That turned out to suit
the site better anyway: the mode changes with the scene, the piece never
repeats, and it weighs nothing.

The tuning is real. The scale is built from tetrachords in three genera —
diatonic, chromatic, and enharmonic with a quarter-tone pyknon. An octave is
two tetrachords separated by a whole tone. Plucks are synthesised with
Karplus–Strong over a drone and a convolution reverb of a stone hall. Each
station declares its own mode in frontmatter (`music.genus`, `music.tonic`,
`music.gap`).

Sound always starts from a click — browsers require it — and the choice is
kept in `localStorage`. Levels were set by measuring the output: peak ≈ 0.19,
RMS ≈ 0.05, with a compressor as a safety net before `destination`.

## Structure

Three levels: **tradition → saga → station**.

The project covers traditions from before the common era and opens as a pilot:
Greek myth first, and inside it the Odyssey. Egyptian, Mesopotamian, Vedic,
Persian and Chinese are declared in the catalogue as future sections.

Traditions live in `src/i18n/traditions.ts` rather than in a collection — they
are a name, an era and a one-line note per locale, not long-form content. Each
saga names its tradition in frontmatter.

## Adding a saga

1. `src/content/sagas/<locale>/<id>.md` — metadata in frontmatter, the
   introduction in the body. `tradition:` picks the section it appears under;
   `published: false` renders the catalogue card as "in preparation".
2. `src/content/stations/<locale>/<id>/NN-<anchor>.md` — one file per station;
   `saga: <id>`, `order`, `numeral`, `image` (a path into `src/assets/art`).
3. Everything else — the route, the table of contents, the station count — is
   assembled automatically.

Content exists in all eight locales. When adding a new saga, `listSagas` falls
back to English per saga, so a partially translated addition still leaves every
language navigable.

> If the catalogue renders a tradition heading with no cards under it, check
> that no `astro dev` server is squatting on port 4321: `astro preview` will
> fail to bind and you will be looking at a stale content cache from dev.

## Assets

Artwork and video were generated through Higgsfield: `cinematic_studio_2_5`
for the station stills at 2K, and `kling2_6` for the ten animated scenes and
the torchlit descent (10s each, image-to-video from the corresponding still).
Frames were cut with `ffmpeg` and re-encoded with `sharp`.
