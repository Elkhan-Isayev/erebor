import type { Locale } from './config';

/**
 * The layer above a saga: the mythological tradition it belongs to.
 *
 * The project covers pre-Christian-era traditions. It opens as a pilot —
 * Greek myth first, and inside it the Odyssey — with the rest following one
 * at a time. Sagas declare their tradition in frontmatter; everything else
 * here is labels, so this stays a data module rather than a collection.
 */

export type TraditionId =
  | 'greek'
  | 'egyptian'
  | 'mesopotamian'
  | 'vedic'
  | 'persian'
  | 'chinese';

export interface Tradition {
  id: TraditionId;
  /**
   * The tradition's own script, used as a display mark. Egyptian uses the
   * ankh rather than hieroglyphs: the Egyptian Hieroglyphs Unicode block is
   * not covered by system fonts and renders as tofu.
   */
  mark: string;
  /** false renders it as a future section of the catalogue. */
  published: boolean;
  order: number;
}

export const TRADITIONS: Tradition[] = [
  { id: 'greek', mark: 'ΕΛΛΑΣ', published: true, order: 1 },
  { id: 'egyptian', mark: '☥', published: false, order: 2 },
  { id: 'mesopotamian', mark: '𒀭', published: false, order: 3 },
  { id: 'vedic', mark: 'वेद', published: false, order: 4 },
  { id: 'persian', mark: '𐎠𐎡𐎼', published: false, order: 5 },
  { id: 'chinese', mark: '山海', published: false, order: 6 },
];

interface Text {
  name: string;
  era: string;
  note: string;
}

export const TRADITION_TEXT: Record<Locale, Record<TraditionId, Text>> = {
  en: {
    greek: { name: 'Greek myth', era: '8th–5th century BC', note: 'Homer, Hesiod, Apollonius, the tragedians.' },
    egyptian: { name: 'Egyptian myth', era: '3rd–1st millennium BC', note: 'Osiris and Isis, the voyage of Ra, the Book of the Dead.' },
    mesopotamian: { name: 'Mesopotamian myth', era: '3rd–2nd millennium BC', note: 'Gilgamesh, Enuma Elish, the descent of Inanna.' },
    vedic: { name: 'Vedic myth', era: '2nd–1st millennium BC', note: 'The Rigveda, Indra and Vritra, the Mahabharata.' },
    persian: { name: 'Persian myth', era: '2nd–1st millennium BC', note: 'The Avesta, Ahura Mazda and Angra Mainyu.' },
    chinese: { name: 'Chinese myth', era: '1st millennium BC', note: 'The Classic of Mountains and Seas, Yu the Great, the archer Yi.' },
  },
  de: {
    greek: { name: 'Griechischer Mythos', era: '8.–5. Jahrhundert v. Chr.', note: 'Homer, Hesiod, Apollonios, die Tragiker.' },
    egyptian: { name: 'Ägyptischer Mythos', era: '3.–1. Jahrtausend v. Chr.', note: 'Osiris und Isis, die Fahrt des Re, das Totenbuch.' },
    mesopotamian: { name: 'Mesopotamischer Mythos', era: '3.–2. Jahrtausend v. Chr.', note: 'Gilgamesch, Enuma Elisch, Inannas Gang zur Unterwelt.' },
    vedic: { name: 'Vedischer Mythos', era: '2.–1. Jahrtausend v. Chr.', note: 'Der Rigveda, Indra und Vritra, das Mahabharata.' },
    persian: { name: 'Persischer Mythos', era: '2.–1. Jahrtausend v. Chr.', note: 'Das Awesta, Ahura Mazda und Angra Mainyu.' },
    chinese: { name: 'Chinesischer Mythos', era: '1. Jahrtausend v. Chr.', note: 'Das Buch der Berge und Meere, Yu der Große, der Schütze Yi.' },
  },
  es: {
    greek: { name: 'Mito griego', era: 'Siglos VIII–V a. C.', note: 'Homero, Hesíodo, Apolonio, los trágicos.' },
    egyptian: { name: 'Mito egipcio', era: 'Milenios III–I a. C.', note: 'Osiris e Isis, el viaje de Ra, el Libro de los Muertos.' },
    mesopotamian: { name: 'Mito mesopotámico', era: 'Milenios III–II a. C.', note: 'Gilgamesh, Enuma Elish, el descenso de Inanna.' },
    vedic: { name: 'Mito védico', era: 'Milenios II–I a. C.', note: 'El Rigveda, Indra y Vritra, el Mahabharata.' },
    persian: { name: 'Mito persa', era: 'Milenios II–I a. C.', note: 'El Avesta, Ahura Mazda y Angra Mainyu.' },
    chinese: { name: 'Mito chino', era: 'Milenio I a. C.', note: 'El Clásico de montañas y mares, Yu el Grande, el arquero Yi.' },
  },
  fr: {
    greek: { name: 'Mythe grec', era: 'VIIIe–Ve siècle av. J.-C.', note: 'Homère, Hésiode, Apollonios, les tragiques.' },
    egyptian: { name: 'Mythe égyptien', era: 'IIIe–Ier millénaire av. J.-C.', note: 'Osiris et Isis, la course de Rê, le Livre des morts.' },
    mesopotamian: { name: 'Mythe mésopotamien', era: 'IIIe–IIe millénaire av. J.-C.', note: 'Gilgamesh, l’Enuma Elish, la descente d’Inanna.' },
    vedic: { name: 'Mythe védique', era: 'IIe–Ier millénaire av. J.-C.', note: 'Le Rigveda, Indra et Vritra, le Mahabharata.' },
    persian: { name: 'Mythe perse', era: 'IIe–Ier millénaire av. J.-C.', note: 'L’Avesta, Ahura Mazda et Angra Mainyu.' },
    chinese: { name: 'Mythe chinois', era: 'Ier millénaire av. J.-C.', note: 'Le Livre des monts et des mers, Yu le Grand, l’archer Yi.' },
  },
  el: {
    greek: { name: 'Ελληνικός μύθος', era: '8ος–5ος αιώνας π.Χ.', note: 'Όμηρος, Ησίοδος, Απολλώνιος, οι τραγικοί.' },
    egyptian: { name: 'Αιγυπτιακός μύθος', era: '3η–1η χιλιετία π.Χ.', note: 'Όσιρις και Ίσιδα, το ταξίδι του Ρα, η Βίβλος των Νεκρών.' },
    mesopotamian: { name: 'Μεσοποταμιακός μύθος', era: '3η–2η χιλιετία π.Χ.', note: 'Γκιλγκαμές, Ενούμα Ελίς, η κάθοδος της Ινάνα.' },
    vedic: { name: 'Βεδικός μύθος', era: '2η–1η χιλιετία π.Χ.', note: 'Η Ριγκβέδα, ο Ίντρα και ο Βρίτρα, η Μαχαμπχάρατα.' },
    persian: { name: 'Περσικός μύθος', era: '2η–1η χιλιετία π.Χ.', note: 'Η Αβέστα, ο Αχούρα Μάζντα και ο Άνγκρα Μαΐνιου.' },
    chinese: { name: 'Κινεζικός μύθος', era: '1η χιλιετία π.Χ.', note: 'Το Βιβλίο Βουνών και Θαλασσών, ο Γιου ο Μέγας, ο τοξότης Γι.' },
  },
  tr: {
    greek: { name: 'Yunan mitolojisi', era: 'MÖ 8.–5. yüzyıl', note: 'Homeros, Hesiodos, Apollonios, tragedya şairleri.' },
    egyptian: { name: 'Mısır mitolojisi', era: 'MÖ 3.–1. binyıl', note: 'Osiris ile İsis, Ra’nın yolculuğu, Ölüler Kitabı.' },
    mesopotamian: { name: 'Mezopotamya mitolojisi', era: 'MÖ 3.–2. binyıl', note: 'Gılgamış, Enuma Eliş, İnanna’nın inişi.' },
    vedic: { name: 'Vedik mitoloji', era: 'MÖ 2.–1. binyıl', note: 'Rigveda, İndra ile Vritra, Mahabharata.' },
    persian: { name: 'Pers mitolojisi', era: 'MÖ 2.–1. binyıl', note: 'Avesta, Ahura Mazda ile Angra Mainyu.' },
    chinese: { name: 'Çin mitolojisi', era: 'MÖ 1. binyıl', note: 'Dağlar ve Denizler Kitabı, Büyük Yu, okçu Yi.' },
  },
  az: {
    greek: { name: 'Yunan mifologiyası', era: 'B.e.ə. VIII–V əsrlər', note: 'Homer, Hesiod, Apolloni, faciə şairləri.' },
    egyptian: { name: 'Misir mifologiyası', era: 'B.e.ə. III–I minilliklər', note: 'Osiris və İsida, Ranın səyahəti, Ölülər Kitabı.' },
    mesopotamian: { name: 'Mesopotamiya mifologiyası', era: 'B.e.ə. III–II minilliklər', note: 'Gilqameş, «Enuma eliş», İnannanın enişi.' },
    vedic: { name: 'Veda mifologiyası', era: 'B.e.ə. II–I minilliklər', note: 'Riqveda, İndra və Vritra, «Mahabharata».' },
    persian: { name: 'Fars mifologiyası', era: 'B.e.ə. II–I minilliklər', note: 'Avesta, Ahura Mazda və Anqra-Mainyu.' },
    chinese: { name: 'Çin mifologiyası', era: 'B.e.ə. I minillik', note: '«Dağlar və Dənizlər Kitabı», Böyük Yuy, oxatan İ.' },
  },
  uk: {
    greek: { name: 'Грецький міф', era: 'VIII–V століття до н. е.', note: 'Гомер, Гесіод, Аполлоній, трагіки.' },
    egyptian: { name: 'Єгипетський міф', era: 'III–I тисячоліття до н. е.', note: 'Осіріс та Ісіда, плавання Ра, Книга мертвих.' },
    mesopotamian: { name: 'Месопотамський міф', era: 'III–II тисячоліття до н. е.', note: 'Гільгамеш, «Енума еліш», сходження Інанни.' },
    vedic: { name: 'Ведійський міф', era: 'II–I тисячоліття до н. е.', note: 'Ріґведа, Індра і Вритра, «Магабгарата».' },
    persian: { name: 'Перський міф', era: 'II–I тисячоліття до н. е.', note: 'Авеста, Ахура Мазда й Ангра-Майнью.' },
    chinese: { name: 'Китайський міф', era: 'I тисячоліття до н. е.', note: '«Книга гір і морів», Юй Великий, стрілець Ї.' },
  },
  ru: {
    greek: { name: 'Греческий миф', era: 'VIII–V века до н. э.', note: 'Гомер, Гесиод, Аполлоний, трагики.' },
    egyptian: { name: 'Египетский миф', era: 'III–I тысячелетия до н. э.', note: 'Осирис и Исида, плавание Ра, Книга мёртвых.' },
    mesopotamian: { name: 'Месопотамский миф', era: 'III–II тысячелетия до н. э.', note: 'Гильгамеш, «Энума элиш», нисхождение Инанны.' },
    vedic: { name: 'Ведийский миф', era: 'II–I тысячелетия до н. э.', note: 'Ригведа, Индра и Вритра, «Махабхарата».' },
    persian: { name: 'Персидский миф', era: 'II–I тысячелетия до н. э.', note: 'Авеста, Ахура Мазда и Ангра-Майнью.' },
    chinese: { name: 'Китайский миф', era: 'I тысячелетие до н. э.', note: '«Книга гор и морей», Юй Великий, стрелок И.' },
  },
  ar: {
    greek: { name: 'الأسطورة الإغريقية', era: 'القرن الثامن–الخامس ق.م.', note: 'هوميروس وهسيودوس وأبولونيوس وشعراء التراجيديا.' },
    egyptian: { name: 'الأسطورة المصرية', era: 'الألف الثالث–الأول ق.م.', note: 'أوزيريس وإيزيس، ورحلة رع، وكتاب الموتى.' },
    mesopotamian: { name: 'أسطورة بلاد الرافدين', era: 'الألف الثالث–الثاني ق.م.', note: 'جلجامش، وإينوما إيليش، ونزول إنانا.' },
    vedic: { name: 'الأسطورة الفيدية', era: 'الألف الثاني–الأول ق.م.', note: 'الريغفيدا، وإندرا وفريترا، والمهابهاراتا.' },
    persian: { name: 'الأسطورة الفارسية', era: 'الألف الثاني–الأول ق.م.', note: 'الأفستا، وأهورا مزدا وأنغرا مينيو.' },
    chinese: { name: 'الأسطورة الصينية', era: 'الألف الأول ق.م.', note: 'كتاب الجبال والبحار، ويو العظيم، والرامي يي.' },
  },
};
