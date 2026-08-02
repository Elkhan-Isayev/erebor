import type { Locale } from './config';

/**
 * Place names printed on the voyage map.
 *
 * These are labels for the chart, not station titles: the station may be
 * called "The Ash of Ilion" while the map simply says "Troy". Keys match the
 * station anchors, plus the unnumbered waypoints.
 */
export type PlaceKey =
  | 'troy'
  | 'malea'
  | 'lotus'
  | 'polyphemus'
  | 'aiolos'
  | 'circe'
  | 'hades'
  | 'sirens'
  | 'scylla'
  | 'thrinacia'
  | 'calypso'
  | 'phaeacians'
  | 'ithaca';

export const PLACES: Record<Locale, Record<PlaceKey, string>> = {
  en: {
    troy: 'Troy',
    malea: 'Cape Malea',
    lotus: 'Lotus-Eaters',
    polyphemus: 'Polyphemus',
    aiolos: 'Aeolus',
    circe: 'Circe',
    hades: 'Hades',
    sirens: 'Sirens',
    scylla: 'Scylla and Charybdis',
    thrinacia: 'Thrinacia',
    calypso: 'Calypso',
    phaeacians: 'Phaeacians',
    ithaca: 'Ithaca',
  },
  de: {
    troy: 'Troja',
    malea: 'Kap Malea',
    lotus: 'Lotophagen',
    polyphemus: 'Polyphem',
    aiolos: 'Aiolos',
    circe: 'Kirke',
    hades: 'Hades',
    sirens: 'Sirenen',
    scylla: 'Skylla und Charybdis',
    thrinacia: 'Thrinakia',
    calypso: 'Kalypso',
    phaeacians: 'Phaiaken',
    ithaca: 'Ithaka',
  },
  es: {
    troy: 'Troya',
    malea: 'Cabo Malea',
    lotus: 'Lotófagos',
    polyphemus: 'Polifemo',
    aiolos: 'Eolo',
    circe: 'Circe',
    hades: 'Hades',
    sirens: 'Sirenas',
    scylla: 'Escila y Caribdis',
    thrinacia: 'Trinacria',
    calypso: 'Calipso',
    phaeacians: 'Feacios',
    ithaca: 'Ítaca',
  },
  fr: {
    troy: 'Troie',
    malea: 'Cap Malée',
    lotus: 'Lotophages',
    polyphemus: 'Polyphème',
    aiolos: 'Éole',
    circe: 'Circé',
    hades: 'Hadès',
    sirens: 'Sirènes',
    scylla: 'Charybde et Scylla',
    thrinacia: 'Thrinacie',
    calypso: 'Calypso',
    phaeacians: 'Phéaciens',
    ithaca: 'Ithaque',
  },
  el: {
    troy: 'Τροία',
    malea: 'Ακρωτήριο Μαλέας',
    lotus: 'Λωτοφάγοι',
    polyphemus: 'Πολύφημος',
    aiolos: 'Αίολος',
    circe: 'Κίρκη',
    hades: 'Άδης',
    sirens: 'Σειρήνες',
    scylla: 'Σκύλλα και Χάρυβδις',
    thrinacia: 'Θρινακία',
    calypso: 'Καλυψώ',
    phaeacians: 'Φαίακες',
    ithaca: 'Ιθάκη',
  },
  uk: {
    troy: 'Троя',
    malea: 'Мис Малея',
    lotus: 'Лотофаги',
    polyphemus: 'Поліфем',
    aiolos: 'Еол',
    circe: 'Кірка',
    hades: 'Аїд',
    sirens: 'Сирени',
    scylla: 'Скілла і Харибда',
    thrinacia: 'Трінакія',
    calypso: 'Каліпсо',
    phaeacians: 'Феаки',
    ithaca: 'Ітака',
  },
  ru: {
    troy: 'Троя',
    malea: 'Мыс Малея',
    lotus: 'Лотофаги',
    polyphemus: 'Полифем',
    aiolos: 'Эол',
    circe: 'Кирка',
    hades: 'Аид',
    sirens: 'Сирены',
    scylla: 'Скилла и Харибда',
    thrinacia: 'Тринакия',
    calypso: 'Калипсо',
    phaeacians: 'Феаки',
    ithaca: 'Итака',
  },
  ar: {
    troy: 'طروادة',
    malea: 'رأس ماليا',
    lotus: 'آكلو اللوتس',
    polyphemus: 'بوليفيموس',
    aiolos: 'أيولوس',
    circe: 'كيركي',
    hades: 'هاديس',
    sirens: 'السيرينات',
    scylla: 'سكيلا وخاريبديس',
    thrinacia: 'ثريناكيا',
    calypso: 'كاليبسو',
    phaeacians: 'الفياكيون',
    ithaca: 'إيثاكا',
  },
};
