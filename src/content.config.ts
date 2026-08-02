import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content is stored one directory per locale:
 *
 *   src/content/sagas/<locale>/<saga>.md
 *   src/content/stations/<locale>/<saga>/NN-<anchor>.md
 *
 * The entry id therefore carries the locale, e.g. `en/odysseia`. Helpers in
 * src/i18n/content.ts split it back into locale, saga slug and anchor, so no
 * frontmatter field has to repeat what the path already says.
 */

/** A saga is a full cycle (Odyssey, Iliad, Argonautica…). Body = introduction. */
const sagas = defineCollection({
  loader: glob({ base: './src/content/sagas', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      greek: z.string(),
      transliteration: z.string(),
      /** Mythological tradition this saga belongs to — see src/i18n/traditions.ts. */
      tradition: z.enum(['greek', 'egyptian', 'mesopotamian', 'vedic', 'persian', 'chinese']),
      tagline: z.string(),
      author: z.string(),
      era: z.string(),
      /** Position in the catalogue on the home page. */
      order: z.number(),
      /** false renders the catalogue card as "in preparation". */
      published: z.boolean().default(false),
      cover: image().optional(),
      accent: z.string().default('#d3ae63'),
    }),
});

/** A station is one stop on the hero's road. Body = the story itself. */
const stations = defineCollection({
  loader: glob({ base: './src/content/stations', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      /** Saga slug without the locale, e.g. `odysseia`. */
      saga: z.string(),
      order: z.number(),
      /** Roman numeral of the station. */
      numeral: z.string(),
      title: z.string(),
      greek: z.string(),
      /** Setting, printed under the title. */
      place: z.string(),
      /** One sentence carrying the point of the station, set large. */
      lead: z.string(),
      image: image(),
      alt: z.string(),
      /**
       * The mode this station sounds in. An ancient scale is built from
       * tetrachords in three genera — see src/scripts/kithara.ts.
       */
      music: z
        .object({
          genus: z.enum(['diatonic', 'chromatic', 'enharmonic']).default('diatonic'),
          /** Frequency of the tonic, Hz. */
          tonic: z.number().default(146.83),
          /** Average gap between plucks, seconds. */
          gap: z.number().default(1.8),
        })
        .default({}),
      epigraph: z
        .object({
          text: z.string(),
          source: z.string(),
        })
        .optional(),
    }),
});

export const collections = { sagas, stations };
