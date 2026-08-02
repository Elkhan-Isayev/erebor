import type { Locale } from './config';

/**
 * Every string that is not part of the story content itself.
 *
 * A note on the Homeric quotations: where a public-domain translation exists
 * and is well known, it is used and credited. Greek shows the original text.
 * Ukrainian and Arabic have no public-domain translation available here, so
 * those renderings were made for this edition and are labelled as such —
 * never attributed to a translator who did not write them.
 */
export interface Strings {
  skip: string;

  nav: { sagas: string; odyssey: string; about: string; home: string };
  brandHome: string;
  navAria: string;
  footerNavAria: string;

  lang: { label: string; aria: string };

  footer: { note: string; legal: string; name: string };
  /** Credit line for the Odyssey quotations used in this locale. */
  quoteCredit: string;

  descent: {
    aria: string;
    loader: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    invocation: [string, string, string];
    invocationCite: string;
    warYears: string;
    roadYears: string;
    fleet: string;
    sagaFirst: string;
    cta: string;
    cue: string;
    posterAlt: string;
  };

  about: {
    eyebrow: string;
    titleLines: [string, string, string];
    p1: string;
    p2: string;
    principles: { greek: string; title: string; text: string }[];
  };

  catalogue: {
    eyebrow: string;
    title: string;
    traditions: string;
    pilot: string;
    note: string;
    /** Receives the station count. */
    read: (n: number) => string;
    soon: string;
  };

  saga: {
    author: string;
    era: string;
    stations: string;
    route: string;
    routeAria: string;
    endText: string;
    endCta: string;
  };

  music: { label: string; turnOn: string; turnOff: string };

  map: { aria: string; note: string };

  meta: { homeTitle: string; homeDescription: string; sagaDescription: (s: string, n: number) => string };
}

export const UI: Record<Locale, Strings> = {
  /* ── English ─────────────────────────────────────────────────────────── */
  en: {
    skip: 'Skip to content',
    nav: { sagas: 'Sagas', odyssey: 'Odyssey', about: 'About', home: 'Home' },
    brandHome: 'EREBOR — home',
    navAria: 'Main navigation',
    footerNavAria: 'Footer navigation',
    lang: { label: 'Language', aria: 'Choose a language' },
    footer: {
      name: 'Erebor — the mountain under which the hoard is kept.',
      note: 'Ancient stories told as stories, not as monuments.',
      legal:
        'Artwork and video generated with AI. Coastlines on the map are schematic.',
    },
    quoteCredit:
      'Odyssey quotations in the public-domain translation by Samuel Butler.',
    descent: {
      aria: 'Descent into the dark — prologue',
      loader: 'Lighting the torch',
      titleLine1: 'Stories of',
      titleLine2: 'Antiquity',
      subtitle: 'Go down. There is only one light here — and you are carrying it.',
      invocation: [
        'Tell me, O Muse, of that ingenious hero who travelled far and wide',
        'after he had sacked the famous town of Troy.',
        'Many cities did he visit, and many were the nations whose manners he learned…',
      ],
      invocationCite: 'Homer, Odyssey I. Translated by Samuel Butler',
      warYears: 'years of war.',
      roadYears: 'years of the road home.',
      fleet: 'Of twelve ships, not one will reach Ithaca.',
      sagaFirst: 'Saga One',
      cta: 'Begin the descent',
      cue: 'down',
      posterAlt: 'A torch lighting an ancient stone stairway falling away into darkness',
    },
    about: {
      eyebrow: 'About',
      titleLines: ['These stories outlived', 'three thousand years.', 'They will outlive us.'],
      p1: 'Ancient stories reach us in one of two states: an academic translation buried under a quarter-page of commentary, or a children’s retelling with everything worth reading stripped out of it.',
      p2: '**EREBOR** is an attempt at a third way. We take the story whole, tell it as a story rather than a monument, and show it — because the Greeks could see these scenes, and all we inherited was the text.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Clarity',
          text: 'No footnotes in three languages, no school-primer summary. Prose that holds you from the first line.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Accuracy',
          text: 'The plots follow the sources: Homer, Apollonius, the tragedians. Quotations are credited and placed by book.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Spectacle',
          text: 'Every station is its own shot. Antiquity here looks the way it looked to the people who believed in it.',
        },
      ],
    },
    catalogue: {
      traditions: 'Traditions',
      pilot: 'Traditions of the world before the common era. Greek myth is open, starting with the Odyssey; the others are in preparation.',
      eyebrow: 'Collection',
      title: 'Sagas',
      note: 'One is open in full. The rest are in preparation — one at a time, without hurry.',
      read: (n) => `${n} stations · read`,
      soon: 'In preparation',
    },
    saga: {
      author: 'Author',
      era: 'Period',
      stations: 'Stations',
      route: 'The route',
      routeAria: 'Stations of the voyage',
      endText:
        'Twenty years, twelve ships and not one companion who came back. The only man who reached home was the one who refused, the whole way, to stay.',
      endCta: 'Other sagas',
    },
    music: {
      label: 'Kithara',
      turnOn: 'Play the kithara — music in an ancient mode',
      turnOff: 'Stop the kithara',
    },
    map: {
      aria: 'Map of the Mediterranean with the route of Odysseus from Troy to Ithaca',
      note: 'Landfalls follow the traditional identifications. Homer ties almost none of them to real geography.',
    },
    meta: {
      homeTitle: 'EREBOR — stories of antiquity',
      homeDescription:
        'Ancient stories retold. The first saga is Homer’s Odyssey: ten stations from the ash of Troy to a bowstring drawn in his own hall.',
      sagaDescription: (s, n) => `${s} ${n} stations of the voyage.`,
    },
  },

  /* ── Deutsch ─────────────────────────────────────────────────────────── */
  de: {
    skip: 'Zum Inhalt springen',
    nav: { sagas: 'Sagen', odyssey: 'Odyssee', about: 'Über das Projekt', home: 'Startseite' },
    brandHome: 'EREBOR — zur Startseite',
    navAria: 'Hauptnavigation',
    footerNavAria: 'Navigation im Fußbereich',
    lang: { label: 'Sprache', aria: 'Sprache wählen' },
    footer: {
      name: 'Erebor — der Berg, unter dem der Hort liegt.',
      note: 'Antike Stoffe, erzählt als Geschichten und nicht als Denkmäler.',
      legal:
        'Bilder und Videos wurden mit KI erzeugt. Die Küstenlinien der Karte sind schematisch.',
    },
    quoteCredit:
      'Zitate aus der Odyssee in der gemeinfreien Übersetzung von Johann Heinrich Voß.',
    descent: {
      aria: 'Abstieg ins Dunkel — Vorspiel',
      loader: 'Die Fackel wird entzündet',
      titleLine1: 'Geschichten',
      titleLine2: 'der Antike',
      subtitle: 'Steigen Sie hinab. Es gibt hier nur ein Licht — und Sie tragen es.',
      invocation: [
        'Sage mir, Muse, die Taten des vielgewanderten Mannes,',
        'Welcher so weit geirrt, nach der heiligen Troja Zerstörung,',
        'Vieler Menschen Städte gesehn, und Sitte gelernt hat…',
      ],
      invocationCite: 'Homer, Odyssee I. Übersetzt von Johann Heinrich Voß',
      warYears: 'Jahre Krieg.',
      roadYears: 'Jahre Heimweg.',
      fleet: 'Von zwölf Schiffen erreicht kein einziges Ithaka.',
      sagaFirst: 'Erste Sage',
      cta: 'Den Abstieg beginnen',
      cue: 'hinab',
      posterAlt:
        'Eine Fackel erhellt eine antike Steintreppe, die sich in der Dunkelheit verliert',
    },
    about: {
      eyebrow: 'Über das Projekt',
      titleLines: ['Diese Geschichten', 'überlebten drei Jahrtausende.', 'Sie überleben auch uns.'],
      p1: 'Antike Stoffe erreichen uns in zwei Zuständen: als akademische Übersetzung unter einem Viertel Seite Kommentar — oder als Nacherzählung für Kinder, aus der alles entfernt wurde, wofür man sie überhaupt liest.',
      p2: '**EREBOR** ist der Versuch eines dritten Wegs. Wir nehmen den Stoff im Ganzen, erzählen ihn als Geschichte statt als Denkmal — und zeigen ihn, denn den Griechen waren diese Szenen sichtbar, uns blieb nur der Text.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Klarheit',
          text: 'Keine Fußnoten in drei Sprachen, keine Schulbuchfassung. Prosa, die von der ersten Zeile an trägt.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Genauigkeit',
          text: 'Die Handlung folgt den Quellen: Homer, Apollonios, den Tragikern. Zitate sind belegt und nach Gesang verortet.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Anschauung',
          text: 'Jede Station ist eine eigene Einstellung. Die Antike sieht hier so aus, wie sie denen erschien, die an sie glaubten.',
        },
      ],
    },
    catalogue: {
      traditions: 'Überlieferungen',
      pilot: 'Überlieferungen der Welt vor unserer Zeitrechnung. Der griechische Mythos ist geöffnet, beginnend mit der Odyssee; die übrigen sind in Vorbereitung.',
      eyebrow: 'Sammlung',
      title: 'Sagen',
      note: 'Eine ist vollständig geöffnet. Die übrigen entstehen — eine nach der anderen, ohne Eile.',
      read: (n) => `${n} Stationen · lesen`,
      soon: 'In Vorbereitung',
    },
    saga: {
      author: 'Autor',
      era: 'Zeit',
      stations: 'Stationen',
      route: 'Der Weg',
      routeAria: 'Stationen der Fahrt',
      endText:
        'Zwanzig Jahre, zwölf Schiffe und kein einziger Gefährte, der zurückkam. Heim gelangte nur der, der sich den ganzen Weg lang weigerte zu bleiben.',
      endCta: 'Andere Sagen',
    },
    music: {
      label: 'Kithara',
      turnOn: 'Kithara einschalten — Musik in antiker Tonart',
      turnOff: 'Kithara ausschalten',
    },
    map: {
      aria: 'Karte des Mittelmeers mit der Fahrt des Odysseus von Troja nach Ithaka',
      note: 'Die Stationen folgen den überlieferten Gleichsetzungen. Homer bindet fast keine davon an reale Geographie.',
    },
    meta: {
      homeTitle: 'EREBOR — Geschichten der Antike',
      homeDescription:
        'Antike Stoffe neu erzählt. Die erste Sage ist Homers Odyssee: zehn Stationen von der Asche Trojas bis zur gespannten Sehne in der eigenen Halle.',
      sagaDescription: (s, n) => `${s} ${n} Stationen der Fahrt.`,
    },
  },

  /* ── Español ─────────────────────────────────────────────────────────── */
  es: {
    skip: 'Ir al contenido',
    nav: { sagas: 'Sagas', odyssey: 'Odisea', about: 'El proyecto', home: 'Inicio' },
    brandHome: 'EREBOR — inicio',
    navAria: 'Navegación principal',
    footerNavAria: 'Navegación del pie',
    lang: { label: 'Idioma', aria: 'Elegir idioma' },
    footer: {
      name: 'Érebor — la montaña bajo la que se guarda el tesoro.',
      note: 'Historias antiguas contadas como historias, no como monumentos.',
      legal:
        'Ilustraciones y vídeo generados con IA. Las costas del mapa son esquemáticas.',
    },
    quoteCredit:
      'Las citas de la Odisea siguen la traducción de dominio público de Luis Segalá y Estalella.',
    descent: {
      aria: 'Descenso a la oscuridad — prólogo',
      loader: 'Encendiendo la antorcha',
      titleLine1: 'Historias de',
      titleLine2: 'la Antigüedad',
      subtitle: 'Descienda. Aquí sólo hay una luz — y la lleva usted.',
      invocation: [
        'Háblame, Musa, de aquel varón de multiforme ingenio que,',
        'después de destruir la sacra ciudad de Troya,',
        'anduvo peregrinando larguísimo tiempo y vio muchas ciudades…',
      ],
      invocationCite: 'Homero, Odisea I. Traducción de Luis Segalá y Estalella',
      warYears: 'años de guerra.',
      roadYears: 'años de camino a casa.',
      fleet: 'De doce naves, ninguna llegará a Ítaca.',
      sagaFirst: 'Saga primera',
      cta: 'Comenzar el descenso',
      cue: 'abajo',
      posterAlt:
        'Una antorcha ilumina una antigua escalera de piedra que se hunde en la oscuridad',
    },
    about: {
      eyebrow: 'El proyecto',
      titleLines: ['Estas historias han vivido', 'tres mil años.', 'Nos sobrevivirán.'],
      p1: 'Los relatos antiguos nos llegan de dos formas: como traducción académica sepultada bajo un cuarto de página de comentario, o como versión infantil a la que se ha quitado todo aquello por lo que valía la pena leerlos.',
      p2: '**EREBOR** es un intento de tercera vía. Tomamos el relato entero, lo contamos como historia y no como monumento, y lo mostramos: porque los griegos veían estas escenas y a nosotros sólo nos quedó el texto.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Claridad',
          text: 'Sin notas en tres idiomas ni resumen de manual. Prosa que sostiene desde la primera línea.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Exactitud',
          text: 'Los argumentos siguen las fuentes: Homero, Apolonio, los trágicos. Las citas van acreditadas y situadas por canto.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Espectáculo',
          text: 'Cada estación es un plano propio. Aquí la Antigüedad se ve como la veían quienes creían en ella.',
        },
      ],
    },
    catalogue: {
      traditions: 'Tradiciones',
      pilot: 'Tradiciones del mundo anterior a nuestra era. El mito griego está abierto, empezando por la Odisea; las demás están en preparación.',
      eyebrow: 'Colección',
      title: 'Sagas',
      note: 'Una está abierta por completo. Las demás se preparan — de una en una, sin prisa.',
      read: (n) => `${n} estaciones · leer`,
      soon: 'En preparación',
    },
    saga: {
      author: 'Autor',
      era: 'Época',
      stations: 'Estaciones',
      route: 'La ruta',
      routeAria: 'Estaciones del viaje',
      endText:
        'Veinte años, doce naves y ni un solo compañero de vuelta. Llegó a casa únicamente quien se negó, durante todo el camino, a quedarse.',
      endCta: 'Otras sagas',
    },
    music: {
      label: 'Cítara',
      turnOn: 'Encender la cítara — música en modo antiguo',
      turnOff: 'Apagar la cítara',
    },
    map: {
      aria: 'Mapa del Mediterráneo con la ruta de Odiseo de Troya a Ítaca',
      note: 'Las escalas siguen las identificaciones tradicionales. Homero casi nunca las ata a una geografía real.',
    },
    meta: {
      homeTitle: 'EREBOR — historias de la Antigüedad',
      homeDescription:
        'Relatos antiguos contados de nuevo. La primera saga es la Odisea de Homero: diez estaciones desde las cenizas de Troya hasta el arco tensado en su propia sala.',
      sagaDescription: (s, n) => `${s} ${n} estaciones del viaje.`,
    },
  },

  /* ── Français ────────────────────────────────────────────────────────── */
  fr: {
    skip: 'Aller au contenu',
    nav: { sagas: 'Sagas', odyssey: 'Odyssée', about: 'Le projet', home: 'Accueil' },
    brandHome: 'EREBOR — accueil',
    navAria: 'Navigation principale',
    footerNavAria: 'Navigation du pied de page',
    lang: { label: 'Langue', aria: 'Choisir une langue' },
    footer: {
      name: 'Erebor — la montagne sous laquelle repose le trésor.',
      note: 'Des récits antiques racontés comme des histoires, non comme des monuments.',
      legal:
        'Illustrations et vidéos générées par IA. Les côtes de la carte sont schématiques.',
    },
    quoteCredit:
      'Les citations de l’Odyssée suivent la traduction de Leconte de Lisle, dans le domaine public.',
    descent: {
      aria: 'Descente dans les ténèbres — prologue',
      loader: 'On allume la torche',
      titleLine1: 'Récits de',
      titleLine2: 'l’Antiquité',
      subtitle: 'Descendez. Il n’y a ici qu’une seule lumière — et c’est vous qui la portez.',
      invocation: [
        'Dis-moi, Muse, cet homme subtil qui erra si longtemps,',
        'après qu’il eut renversé la citadelle sacrée de Troie,',
        'et qui vit les cités et connut l’esprit de nombreux hommes…',
      ],
      invocationCite: 'Homère, Odyssée I. Traduction de Leconte de Lisle',
      warYears: 'ans de guerre.',
      roadYears: 'ans de chemin du retour.',
      fleet: 'Sur douze navires, pas un n’atteindra Ithaque.',
      sagaFirst: 'Première saga',
      cta: 'Commencer la descente',
      cue: 'descendre',
      posterAlt:
        'Une torche éclaire un ancien escalier de pierre qui s’enfonce dans l’obscurité',
    },
    about: {
      eyebrow: 'Le projet',
      titleLines: ['Ces récits ont survécu', 'à trois mille ans.', 'Ils nous survivront.'],
      p1: 'Les récits antiques nous parviennent sous deux formes : une traduction savante ensevelie sous un quart de page de notes, ou un abrégé pour enfants dont on a retiré tout ce qui valait la peine d’être lu.',
      p2: '**EREBOR** tente une troisième voie. Nous prenons le récit entier, nous le racontons comme une histoire et non comme un monument, et nous le montrons — car les Grecs voyaient ces scènes, et il ne nous est resté que le texte.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Clarté',
          text: 'Ni notes en trois langues, ni résumé scolaire. Une prose qui tient dès la première ligne.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Exactitude',
          text: 'Les intrigues suivent les sources : Homère, Apollonios, les tragiques. Les citations sont créditées et situées par chant.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Spectacle',
          text: 'Chaque station est un plan. L’Antiquité y ressemble à ce qu’elle était pour ceux qui y croyaient.',
        },
      ],
    },
    catalogue: {
      traditions: 'Traditions',
      pilot: 'Traditions du monde d’avant notre ère. Le mythe grec est ouvert, à commencer par l’Odyssée ; les autres sont en préparation.',
      eyebrow: 'Collection',
      title: 'Sagas',
      note: 'Une est ouverte en entier. Les autres se préparent — une à la fois, sans hâte.',
      read: (n) => `${n} stations · lire`,
      soon: 'En préparation',
    },
    saga: {
      author: 'Auteur',
      era: 'Époque',
      stations: 'Stations',
      route: 'Le parcours',
      routeAria: 'Stations du voyage',
      endText:
        'Vingt ans, douze navires et pas un compagnon revenu. Seul rentra celui qui, tout au long de la route, refusa de rester.',
      endCta: 'Autres sagas',
    },
    music: {
      label: 'Cithare',
      turnOn: 'Allumer la cithare — musique en mode antique',
      turnOff: 'Éteindre la cithare',
    },
    map: {
      aria: 'Carte de la Méditerranée avec la route d’Ulysse de Troie à Ithaque',
      note: 'Les escales suivent les identifications traditionnelles. Homère n’en rattache presque aucune à une géographie réelle.',
    },
    meta: {
      homeTitle: 'EREBOR — récits de l’Antiquité',
      homeDescription:
        'Les récits antiques racontés à neuf. La première saga est l’Odyssée d’Homère : dix stations, des cendres de Troie à l’arc bandé dans sa propre salle.',
      sagaDescription: (s, n) => `${s} ${n} stations du voyage.`,
    },
  },

  /* ── Ελληνικά ────────────────────────────────────────────────────────── */
  el: {
    skip: 'Μετάβαση στο περιεχόμενο',
    nav: { sagas: 'Έπη', odyssey: 'Οδύσσεια', about: 'Το εγχείρημα', home: 'Αρχική' },
    brandHome: 'EREBOR — αρχική',
    navAria: 'Κύρια πλοήγηση',
    footerNavAria: 'Πλοήγηση υποσέλιδου',
    lang: { label: 'Γλώσσα', aria: 'Επιλογή γλώσσας' },
    footer: {
      name: 'Έρεβορ — το βουνό κάτω από το οποίο φυλάγεται ο θησαυρός.',
      note: 'Αρχαίες ιστορίες, ειπωμένες ως ιστορίες και όχι ως μνημεία.',
      legal:
        'Οι εικόνες και τα βίντεο δημιουργήθηκαν με τεχνητή νοημοσύνη. Οι ακτογραμμές του χάρτη είναι σχηματικές.',
    },
    quoteCredit: 'Τα παραθέματα δίνονται στο πρωτότυπο ομηρικό κείμενο.',
    descent: {
      aria: 'Κάθοδος στο σκοτάδι — πρόλογος',
      loader: 'Ανάβει ο δαυλός',
      titleLine1: 'Ιστορίες της',
      titleLine2: 'αρχαιότητας',
      subtitle: 'Κατεβείτε. Ένα μόνο φως υπάρχει εδώ — και το κρατάτε εσείς.',
      invocation: [
        'Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον, ὃς μάλα πολλὰ',
        'πλάγχθη, ἐπεὶ Τροίης ἱερὸν πτολίεθρον ἔπερσεν·',
        'πολλῶν δ’ ἀνθρώπων ἴδεν ἄστεα καὶ νόον ἔγνω…',
      ],
      invocationCite: 'Ὅμηρος, Ὀδύσσεια Α´ — πρωτότυπο κείμενο',
      warYears: 'χρόνια πολέμου.',
      roadYears: 'χρόνια δρόμος για το σπίτι.',
      fleet: 'Από τα δώδεκα καράβια δεν θα φτάσει στην Ιθάκη ούτε ένα.',
      sagaFirst: 'Πρώτο έπος',
      cta: 'Αρχίστε την κάθοδο',
      cue: 'κάτω',
      posterAlt:
        'Δαυλός φωτίζει αρχαία πέτρινη σκάλα που χάνεται στο σκοτάδι',
    },
    about: {
      eyebrow: 'Το εγχείρημα',
      titleLines: ['Αυτές οι ιστορίες άντεξαν', 'τρεις χιλιάδες χρόνια.', 'Θα μας επιβιώσουν.'],
      p1: 'Οι αρχαίες ιστορίες φτάνουν σ’ εμάς με δύο μορφές: είτε ως ακαδημαϊκή μετάφραση θαμμένη κάτω από ένα τέταρτο σελίδας σχολίων, είτε ως παιδική διασκευή από την οποία έχει αφαιρεθεί καθετί για το οποίο αξίζει να διαβαστούν.',
      p2: 'Το **EREBOR** επιχειρεί έναν τρίτο δρόμο. Παίρνουμε την ιστορία ολόκληρη, τη λέμε ως ιστορία κι όχι ως μνημείο, και τη δείχνουμε — γιατί οι Έλληνες έβλεπαν αυτές τις σκηνές, ενώ σ’ εμάς έμεινε μόνο το κείμενο.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Σαφήνεια',
          text: 'Χωρίς υποσημειώσεις σε τρεις γλώσσες, χωρίς σχολική περίληψη. Πεζός λόγος που κρατάει από την πρώτη γραμμή.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Ακρίβεια',
          text: 'Οι υποθέσεις ακολουθούν τις πηγές: Όμηρο, Απολλώνιο, τους τραγικούς. Τα παραθέματα αναφέρονται με ραψωδία.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Θέαμα',
          text: 'Κάθε σταθμός είναι ξεχωριστό πλάνο. Η αρχαιότητα εδώ μοιάζει όπως τη φαντάζονταν όσοι πίστευαν σ’ αυτήν.',
        },
      ],
    },
    catalogue: {
      traditions: 'Παραδόσεις',
      pilot: 'Παραδόσεις του κόσμου πριν από την εποχή μας. Ο ελληνικός μύθος είναι ανοιχτός, ξεκινώντας από την Οδύσσεια· οι υπόλοιπες ετοιμάζονται.',
      eyebrow: 'Συλλογή',
      title: 'Έπη',
      note: 'Το ένα είναι ανοιχτό ολόκληρο. Τα υπόλοιπα ετοιμάζονται — ένα κάθε φορά, χωρίς βιασύνη.',
      read: (n) => `${n} σταθμοί · ανάγνωση`,
      soon: 'Ετοιμάζεται',
    },
    saga: {
      author: 'Συγγραφέας',
      era: 'Εποχή',
      stations: 'Σταθμοί',
      route: 'Η διαδρομή',
      routeAria: 'Σταθμοί του ταξιδιού',
      endText:
        'Είκοσι χρόνια, δώδεκα καράβια και ούτε ένας σύντροφος πίσω. Έφτασε στο σπίτι μόνο εκείνος που σ’ όλο τον δρόμο αρνιόταν να μείνει.',
      endCta: 'Άλλα έπη',
    },
    music: {
      label: 'Κιθάρα',
      turnOn: 'Ανάψτε την κιθάρα — μουσική σε αρχαία αρμονία',
      turnOff: 'Σβήστε την κιθάρα',
    },
    map: {
      aria: 'Χάρτης της Μεσογείου με τη διαδρομή του Οδυσσέα από την Τροία στην Ιθάκη',
      note: 'Οι σταθμοί ακολουθούν τις παραδοσιακές ταυτίσεις. Ο Όμηρος σχεδόν κανέναν δεν τον δένει με πραγματική γεωγραφία.',
    },
    meta: {
      homeTitle: 'EREBOR — ιστορίες της αρχαιότητας',
      homeDescription:
        'Αρχαίες ιστορίες ειπωμένες ξανά. Το πρώτο έπος είναι η Οδύσσεια του Ομήρου: δέκα σταθμοί από τη στάχτη της Τροίας ως το τεντωμένο τόξο στη δική του αίθουσα.',
      sagaDescription: (s, n) => `${s} ${n} σταθμοί του ταξιδιού.`,
    },
  },

  /* ── Українська ──────────────────────────────────────────────────────── */
  uk: {
    skip: 'Перейти до змісту',
    nav: { sagas: 'Саги', odyssey: 'Одіссея', about: 'Про проєкт', home: 'Головна' },
    brandHome: 'EREBOR — на головну',
    navAria: 'Основна навігація',
    footerNavAria: 'Навігація в підвалі',
    lang: { label: 'Мова', aria: 'Обрати мову' },
    footer: {
      name: 'Еребор — гора, під якою зберігається скарб.',
      note: 'Античні сюжети, розказані як історії, а не як пам’ятники.',
      legal:
        'Ілюстрації та відео згенеровано нейромережами. Берегові лінії на карті схематичні.',
    },
    quoteCredit:
      'Цитати з «Одіссеї» подано в перекладі, зробленому для цього видання.',
    descent: {
      aria: 'Спуск у темряву — вступ',
      loader: 'Запалюємо смолоскип',
      titleLine1: 'Історії',
      titleLine2: 'античності',
      subtitle: 'Спускайтеся. Світло тут лише одне — і воно у ваших руках.',
      invocation: [
        'Музо, повідай мені про мужа бувалого, того,',
        'Хто, зруйнувавши священну твердиню Трої, блукав',
        'Довго й багато людських міст і звичаїв бачив…',
      ],
      invocationCite: 'Гомер, «Одіссея», пісня I. Переклад для цього видання',
      warYears: 'років війни.',
      roadYears: 'років дороги додому.',
      fleet: 'З дванадцяти кораблів до Ітаки не дійде жоден.',
      sagaFirst: 'Сага перша',
      cta: 'Почати спуск',
      cue: 'вниз',
      posterAlt:
        'Смолоскип освітлює давні кам’яні сходи, що зникають у темряві',
    },
    about: {
      eyebrow: 'Про проєкт',
      titleLines: ['Ці історії пережили', 'три тисячі років.', 'Переживуть і нас.'],
      p1: 'Античні сюжети дійшли до нас у двох виглядах: або академічним перекладом із коментарем на чверть сторінки, або дитячим переказом, з якого вилучено все, заради чого їх узагалі варто читати.',
      p2: '**EREBOR** — спроба третього шляху. Ми беремо сюжет цілком, розповідаємо його як історію, а не як пам’ятник, і показуємо — бо грекам ці сцени було видно, а нам дістався лише текст.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Ясність',
          text: 'Без виносок трьома мовами й без переказу зі шкільного підручника. Живий текст, що тримає з першого рядка.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Точність',
          text: 'Сюжети — за джерелами: Гомер, Аполлоній, трагіки. Цитати мають указане авторство й пісню.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Видовище',
          text: 'Кожна станція — окремий кадр. Античність тут виглядає так, як її бачили ті, хто в неї вірив.',
        },
      ],
    },
    catalogue: {
      traditions: 'Традиції',
      pilot: 'Традиції світу до нашої ери. Грецький міф відкрито, починаючи з «Одіссеї»; решта готуються.',
      eyebrow: 'Зібрання',
      title: 'Саги',
      note: 'Одна відкрита цілком. Решта готуються — по одній, без поспіху.',
      read: (n) => `${n} станцій · читати`,
      soon: 'Готується',
    },
    saga: {
      author: 'Автор',
      era: 'Час',
      stations: 'Станцій',
      route: 'Шлях',
      routeAria: 'Станції шляху',
      endText:
        'Двадцять років, дванадцять кораблів і жодного супутника, що повернувся. Додому дістався тільки той, хто всю дорогу відмовлявся залишитися.',
      endCta: 'Інші саги',
    },
    music: {
      label: 'Кіфара',
      turnOn: 'Увімкнути кіфару — музика в античному ладі',
      turnOff: 'Вимкнути кіфару',
    },
    map: {
      aria: 'Карта Середземномор’я з маршрутом Одіссея від Трої до Ітаки',
      note: 'Стоянки — за традиційними ототожненнями. Гомер майже жодної з них не прив’язує до реальної географії.',
    },
    meta: {
      homeTitle: 'EREBOR — історії античності',
      homeDescription:
        'Античні сюжети, розказані заново. Перша сага — «Одіссея» Гомера: десять станцій від попелу Трої до тятиви, натягнутої у власній залі.',
      sagaDescription: (s, n) => `${s} ${n} станцій шляху.`,
    },
  },

  /* ── Русский ─────────────────────────────────────────────────────────── */
  ru: {
    skip: 'К содержанию',
    nav: { sagas: 'Саги', odyssey: 'Одиссея', about: 'О проекте', home: 'Главная' },
    brandHome: 'EREBOR — на главную',
    navAria: 'Основная навигация',
    footerNavAria: 'Навигация в подвале',
    lang: { label: 'Язык', aria: 'Выбрать язык' },
    footer: {
      name: 'Эребор — гора, под которой хранится сокровище.',
      note: 'Античные сюжеты, рассказанные как истории, а не как памятники.',
      legal:
        'Иллюстрации и видео сгенерированы нейросетями. Береговые линии на карте схематичны.',
    },
    quoteCredit:
      'Цитаты из «Одиссеи» — в переводе В. А. Жуковского (общественное достояние).',
    descent: {
      aria: 'Спуск во тьму — вступление',
      loader: 'Зажигаем факел',
      titleLine1: 'Истории',
      titleLine2: 'античности',
      subtitle: 'Спускайтесь. Свет здесь только один — и он в ваших руках.',
      invocation: [
        'Муза, скажи мне о том многоопытном муже, который,',
        'Странствуя долго со дня, как святой Илион им разрушен,',
        'Многих людей города посетил и обычаи видел…',
      ],
      invocationCite: 'Гомер, «Одиссея», песнь I. Перевод В. А. Жуковского',
      warYears: 'лет войны.',
      roadYears: 'лет дороги домой.',
      fleet: 'Из двенадцати кораблей до Итаки не дойдёт ни один.',
      sagaFirst: 'Сага первая',
      cta: 'Начать спуск',
      cue: 'вниз',
      posterAlt:
        'Факел освещает древнюю каменную лестницу, уходящую во тьму',
    },
    about: {
      eyebrow: 'О проекте',
      titleLines: ['Эти истории пережили', 'три тысячи лет.', 'Они переживут и нас.'],
      p1: 'Античные сюжеты дошли до нас в двух видах: либо академическим переводом с комментарием на четверть страницы, либо детским пересказом, из которого вынуто всё, ради чего их вообще стоит читать.',
      p2: '**EREBOR** — попытка третьего пути. Мы берём сюжет целиком, рассказываем его как историю, а не как памятник, и показываем — потому что грекам эти сцены были видны, а нам достался только текст.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'Ясность',
          text: 'Без сносок на трёх языках и без пересказа школьного учебника. Живой текст, который держит с первой строки.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'Точность',
          text: 'Сюжеты — по источникам: Гомер, Аполлоний, трагики. Цитаты даются с указанием переводчика и песни.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'Зрелище',
          text: 'Каждая станция — отдельный кадр. Античность здесь выглядит так, как её видели те, кто в неё верил.',
        },
      ],
    },
    catalogue: {
      traditions: 'Традиции',
      pilot: 'Традиции мира до нашей эры. Греческий миф открыт, начиная с «Одиссеи»; остальные готовятся.',
      eyebrow: 'Собрание',
      title: 'Саги',
      note: 'Одна открыта целиком. Остальные готовятся — по одной за раз, без спешки.',
      read: (n) => `${n} станций · читать`,
      soon: 'Готовится',
    },
    saga: {
      author: 'Автор',
      era: 'Время',
      stations: 'Станций',
      route: 'Путь',
      routeAria: 'Станции пути',
      endText:
        'Двадцать лет, двенадцать кораблей и ни одного вернувшегося спутника. Домой добрался только тот, кто всю дорогу отказывался остаться.',
      endCta: 'Другие саги',
    },
    music: {
      label: 'Кифара',
      turnOn: 'Включить кифару — музыка в античном ладе',
      turnOff: 'Выключить кифару',
    },
    map: {
      aria: 'Карта Средиземноморья с маршрутом Одиссея от Трои до Итаки',
      note: 'Стоянки — по традиционным отождествлениям. Гомер почти ни одну из них не привязывает к реальной географии.',
    },
    meta: {
      homeTitle: 'EREBOR — истории античности',
      homeDescription:
        'Античные сюжеты, рассказанные заново. Первая сага — «Одиссея» Гомера: десять станций пути от пепла Трои до тетивы, натянутой в собственном зале.',
      sagaDescription: (s, n) => `${s} ${n} станций пути.`,
    },
  },

  /* ── العربية ─────────────────────────────────────────────────────────── */
  ar: {
    skip: 'انتقل إلى المحتوى',
    nav: { sagas: 'الملاحم', odyssey: 'الأوديسة', about: 'عن المشروع', home: 'الصفحة الرئيسية' },
    brandHome: 'EREBOR — الصفحة الرئيسية',
    navAria: 'التنقل الرئيسي',
    footerNavAria: 'روابط التذييل',
    lang: { label: 'اللغة', aria: 'اختر اللغة' },
    footer: {
      name: 'إريبور — الجبل الذي يُحفظ تحته الكنز.',
      note: 'حكايات العصور القديمة تُروى بوصفها حكايات، لا بوصفها آثارًا.',
      legal:
        'الصور ومقاطع الفيديو مولَّدة بالذكاء الاصطناعي. خطوط السواحل على الخريطة تخطيطية.',
    },
    quoteCredit: 'اقتباسات الأوديسة بترجمة أُعدَّت خصيصًا لهذا الموقع.',
    descent: {
      aria: 'النزول إلى الظلام — المقدمة',
      loader: 'نُشعل المشعل',
      titleLine1: 'حكايات',
      titleLine2: 'العصور القديمة',
      subtitle: 'انزل. لا ضوء هنا سوى واحد — وهو في يدك.',
      invocation: [
        'أنشديني، أيتها الربّة، ذاك الرجل الحيلة، الكثير التقلّب،',
        'الذي طال تيهانه بعدما دمَّر حصن طروادة المقدّس،',
        'ورأى مدائن أقوامٍ كثيرين وعرف طبائعهم…',
      ],
      invocationCite: 'هوميروس، الأوديسة، النشيد الأول. ترجمة خاصة بهذا الموقع',
      warYears: 'سنوات من الحرب.',
      roadYears: 'سنوات من طريق العودة.',
      fleet: 'من السفن الاثنتي عشرة لن تبلغ إيثاكا واحدة.',
      sagaFirst: 'الملحمة الأولى',
      cta: 'ابدأ النزول',
      cue: 'إلى الأسفل',
      posterAlt: 'مشعل يضيء درجًا حجريًا قديمًا يغوص في الظلام',
    },
    about: {
      eyebrow: 'عن المشروع',
      titleLines: ['هذه الحكايات عاشت', 'ثلاثة آلاف عام.', 'وستبقى بعدنا.'],
      p1: 'تصلنا الحكايات القديمة في صورتين: إمّا ترجمة أكاديمية مدفونة تحت ربع صفحة من الحواشي، وإمّا تلخيص للأطفال نُزع منه كل ما يستحق القراءة أصلًا.',
      p2: '**EREBOR** محاولة لطريق ثالث. نأخذ الحكاية كاملة، ونرويها بوصفها حكاية لا نصبًا تذكاريًا، ونعرضها — لأن اليونانيين كانوا يرون هذه المشاهد، ولم يصلنا نحن سوى النص.',
      principles: [
        {
          greek: 'ΣΑΦΗΝΕΙΑ',
          title: 'الوضوح',
          text: 'بلا حواشٍ بثلاث لغات وبلا تلخيص مدرسي. نصّ حيّ يمسك بالقارئ من السطر الأول.',
        },
        {
          greek: 'ΑΛΗΘΕΙΑ',
          title: 'الدقّة',
          text: 'الأحداث تتبع المصادر: هوميروس وأبولونيوس وشعراء التراجيديا. والاقتباسات منسوبة ومحدَّدة بالنشيد.',
        },
        {
          greek: 'ΟΨΙΣ',
          title: 'المشهد',
          text: 'كل محطة لقطة قائمة بذاتها. العصور القديمة هنا تبدو كما رآها من آمنوا بها.',
        },
      ],
    },
    catalogue: {
      traditions: 'التقاليد',
      pilot: 'تقاليد العالم قبل الميلاد. الأسطورة الإغريقية مفتوحة، بدءًا بالأوديسة؛ وأما البقية فقيد الإعداد.',
      eyebrow: 'المجموعة',
      title: 'الملاحم',
      note: 'واحدة مفتوحة بالكامل، والبقية قيد الإعداد — واحدة تلو الأخرى، دون عجلة.',
      read: (n) => `${n} محطات · اقرأ`,
      soon: 'قيد الإعداد',
    },
    saga: {
      author: 'المؤلف',
      era: 'الحقبة',
      stations: 'المحطات',
      route: 'المسار',
      routeAria: 'محطات الرحلة',
      endText:
        'عشرون عامًا، واثنتا عشرة سفينة، ولا رفيق واحد عاد. لم يبلغ الديار إلا من رفض، طوال الطريق، أن يبقى.',
      endCta: 'ملاحم أخرى',
    },
    music: {
      label: 'القيثارة',
      turnOn: 'شغّل القيثارة — موسيقى بمقام قديم',
      turnOff: 'أوقف القيثارة',
    },
    map: {
      aria: 'خريطة البحر المتوسط ومسار أوديسيوس من طروادة إلى إيثاكا',
      note: 'المحطات موضوعة وفق المطابقات المتوارثة. وهوميروس لا يربط أيًّا منها تقريبًا بجغرافيا حقيقية.',
    },
    meta: {
      homeTitle: 'EREBOR — حكايات العصور القديمة',
      homeDescription:
        'حكايات قديمة تُروى من جديد. الملحمة الأولى هي أوديسة هوميروس: عشر محطات من رماد طروادة إلى وترٍ مشدود في قاعته هو.',
      sagaDescription: (s, n) => `${s} ${n} محطات في الرحلة.`,
    },
  },
};

export function t(locale: Locale): Strings {
  return UI[locale];
}
