import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, isLocale, type Locale } from './config';

/**
 * Content lookup across locales.
 *
 * Entry ids look like `en/odysseia` or `en/odysseia/01-troy`, so the locale,
 * the saga slug and the anchor all come out of the path.
 *
 * When a locale has no translation for a saga yet, the default locale is used
 * instead. That keeps every language navigable while translations land, rather
 * than serving an empty page.
 */

type Saga = CollectionEntry<'sagas'>;
type Station = CollectionEntry<'stations'>;

function parts(id: string): string[] {
  return id.split('/');
}

export function localeOf(entry: Saga | Station): Locale {
  const head = parts(entry.id)[0];
  return isLocale(head) ? head : DEFAULT_LOCALE;
}

/** `en/odysseia` → `odysseia` */
export function sagaSlug(saga: Saga): string {
  return parts(saga.id).slice(1).join('/');
}

/** `en/odysseia/01-troy` → `troy` — the anchor used for links and video files. */
export function stationAnchor(station: Station): string {
  return parts(station.id).at(-1)!.replace(/^\d+-/, '');
}

/** Sagas available in a locale, falling back per saga to the default locale. */
export async function listSagas(locale: Locale): Promise<Saga[]> {
  const all = await getCollection('sagas');

  const translated = new Map<string, Saga>();
  const fallback = new Map<string, Saga>();

  for (const saga of all) {
    const slug = sagaSlug(saga);
    if (localeOf(saga) === locale) translated.set(slug, saga);
    else if (localeOf(saga) === DEFAULT_LOCALE) fallback.set(slug, saga);
  }

  const slugs = new Set([...translated.keys(), ...fallback.keys()]);

  return [...slugs]
    .map((slug) => translated.get(slug) ?? fallback.get(slug)!)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function findSaga(locale: Locale, slug: string): Promise<Saga | undefined> {
  const sagas = await listSagas(locale);
  return sagas.find((saga) => sagaSlug(saga) === slug);
}

/** Stations of a saga in a locale, falling back to the default locale. */
export async function listStations(locale: Locale, slug: string): Promise<Station[]> {
  const all = await getCollection('stations');

  const pick = (want: Locale) =>
    all
      .filter((s) => localeOf(s) === want && s.data.saga === slug)
      .sort((a, b) => a.data.order - b.data.order);

  const translated = pick(locale);
  return translated.length ? translated : pick(DEFAULT_LOCALE);
}
