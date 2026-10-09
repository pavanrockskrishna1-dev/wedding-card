// ============================================================================
// config.ts — SINGLE SOURCE OF TRUTH for all text/content in the invitation.
// Every scene component reads from this file. Nothing is hard-coded elsewhere.
// Scripture quotations are taken from Bible Society of India (BSI) editions:
//   - Telugu:  TELUBSI (Bible Society of India, O.V.)
//   - English: King James Version (the traditional English text used
//     alongside BSI vernacular editions in Indian churches)
// ============================================================================

export type LangCode = "en" | "te";

// Toggle: when true, the Jesus Blessing scene shows a respectful silhouette
// figure of Jesus. When false, only the light rays and two glowing blessing
// hands from above are shown, with the same verse.
export const SHOW_JESUS_FIGURE = true;

// Default state for voice narration (window.speechSynthesis). User can toggle
// from the small speaker button in the top-right of the app.
export const NARRATION_ON = true;

export const LANGUAGES: { code: LangCode; nativeLabel: string; englishLabel: string; fontClass: string }[] = [
  { code: "en", nativeLabel: "English", englishLabel: "English", fontClass: "font-noto-en" },
  { code: "te", nativeLabel: "తెలుగు", englishLabel: "Telugu", fontClass: "font-noto-te" },
];

// Couple + event facts (dummy data) — language-independent
export const WEDDING = {
  // ⭐ COUPLE NAMES — change them HERE ONLY. Every scene reads from this.
  names: {
    en: { groom: "Ashish Kamada", bride: "Easter Rani", groomShort: "Ashish", brideShort: "Easter" },
    te: { groom: "ఆశీష్ కమాడ", bride: "ఈస్టర్ రాణి", groomShort: "ఆశీష్", brideShort: "ఈస్టర్" },
  } as Record<"en" | "te", { groom: string; bride: string; groomShort: string; brideShort: string }>,
  dateISO: "2026-12-12T10:30:00+05:30",
  mapsLink: "https://maps.google.com/?q=St+Marys+Church+Hyderabad",
  receptionMapsLink: "https://maps.google.com/?q=Grand+Hall+Hyderabad",
  heroInitials: "A & E",
};

interface Translation {
  // fontClass: body text font (vernacular Noto Sans for the language)
  // headingFontClass: used for display headings — Cormorant Garamond for
  // English, falling back to the vernacular Noto Sans for languages whose
  // script Cormorant Garamond does not support.
  meta: { fontClass: string; headingFontClass: string };
  common: {
    next: string;
    begin: string;
    swipeHint: string;
    tapHint: string;
    dearPrefix: string;
    defaultGuest: string;
    loading: string;
  };
  languagePicker: {
    title: string;
    subtitle: string;
  };
  stainedGlass: {
    eyebrow: string;
    heading: string;
    message: string;
  };
  cord: {
    eyebrow: string;
    verseRef: string;
    verseText: string;
    caption: string;
  };
  couple: {
    eyebrow: string;
    heading: string;
    subtext: string;
    brideLabel: string;
    groomLabel: string;
  };
  jesusBlessing: {
    eyebrow: string;
    verseRef: string;
    verseText: string;
  };
  story: {
    eyebrow: string;
    heading: string;
    cards: { year: string; title: string; desc: string }[];
  };
  details: {
    eyebrow: string;
    heading: string;
    churchLabel: string;
    churchName: string;
    churchAddress: string;
    dateLabel: string;
    dateDisplay: string;
    timeDisplay: string;
    receptionLabel: string;
    receptionName: string;
    receptionAddress: string;
    directionsBtn: string;
    receptionDirectionsBtn: string;
  };
  blessing: {
    eyebrow: string;
    heading: string;
    verseRef2: string;
    verseText2: string;
    verseRef3: string;
    verseText3: string;
    closing: string;
    signature: string;
    musicOn: string;
    musicOff: string;
    rsvp: string;
  };
}

export const TRANSLATIONS: Record<LangCode, Translation> = {
  en: {
    meta: { fontClass: "font-noto-en", headingFontClass: "font-display" },
    common: {
      next: "Next",
      begin: "Begin",
      swipeHint: "Swipe up or tap Next",
      tapHint: "Tap to continue",
      dearPrefix: "Dear",
      defaultGuest: "Beloved Guest",
      loading: "Loading…",
    },
    languagePicker: {
      title: "You're Invited",
      subtitle: "Please choose your language",
    },
    stainedGlass: {
      eyebrow: "A Sacred Union",
      heading: "Welcome",
      message:
        "By God's grace, two families joyfully invite you to witness the union of",
    },
    cord: {
      eyebrow: "The Word of God",
      verseRef: "Ecclesiastes 4:12",
      verseText:
        "And if one prevail against him, two shall withstand him; and a threefold cord is not quickly broken.",
      caption: "God, the Bride and the Groom — woven together as one.",
    },
    couple: {
      eyebrow: "Two Hearts, One Faith",
      heading: `${WEDDING.names.en.groomShort} & ${WEDDING.names.en.brideShort}`,
      subtext:
        "Together with their families, request the honour of your presence as they begin their new life in Christ.",
      brideLabel: "The Bride",
      groomLabel: "The Groom",
    },
    jesusBlessing: {
      eyebrow: "The Blessing of the Lord",
      verseRef: "Numbers 6:24-26",
      verseText:
        "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace.",
    },
    story: {
      eyebrow: "Our Journey",
      heading: "Our Story",
      cards: [
        {
          year: "2021",
          title: "First Meeting",
          desc: `We first met at a church youth fellowship, placeholder text about how ${WEDDING.names.en.groomShort} and ${WEDDING.names.en.brideShort}'s paths crossed.`,
        },
        {
          year: "2024",
          title: "The Proposal",
          desc: `Placeholder story of the proposal — ${WEDDING.names.en.groomShort} asked ${WEDDING.names.en.brideShort} to marry him with family and friends nearby.`,
        },
        {
          year: "2026",
          title: "The Wedding",
          desc: "Placeholder text leading up to the big day, as both families prepare to celebrate this blessed union.",
        },
      ],
    },
    details: {
      eyebrow: "Save the Date",
      heading: "Wedding Details",
      churchLabel: "Holy Matrimony",
      churchName: "St. Mary's Church, Hyderabad",
      churchAddress: "12 Church Road, Hyderabad, Telangana",
      dateLabel: "Date & Time",
      dateDisplay: "Saturday, 12 December 2026",
      timeDisplay: "10:30 AM",
      receptionLabel: "Reception",
      receptionName: "Grand Hall, Hyderabad",
      receptionAddress: "45 Celebration Avenue, Hyderabad, Telangana",
      directionsBtn: "Get Directions to Church",
      receptionDirectionsBtn: "Get Directions to Reception",
    },
    blessing: {
      eyebrow: "A Final Blessing",
      heading: "With Grateful Hearts",
      verseRef2: "1 Corinthians 13:4-7",
      verseText2:
        "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; rejoiceth not in iniquity, but rejoiceth in the truth; beareth all things, believeth all things, hopeth all things, endureth all things.",
      verseRef3: "Ruth 1:16",
      verseText3:
        "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God.",
      closing:
        "We thank God for your love and prayers, and we look forward to celebrating this joyous day with you.",
      signature: `With love, ${WEDDING.names.en.groom} & ${WEDDING.names.en.bride}`,
      musicOn: "Music On",
      musicOff: "Music Off",
      rsvp: "Thank you for being part of our story.",
    },
  },

  te: {
    meta: { fontClass: "font-noto-te", headingFontClass: "font-noto-te" },
    common: {
      next: "తరువాత",
      begin: "ప్రారంభించండి",
      swipeHint: "పైకి స్వైప్ చేయండి లేదా తరువాత నొక్కండి",
      tapHint: "కొనసాగించడానికి నొక్కండి",
      dearPrefix: "ప్రియమైన",
      defaultGuest: "ప్రియమైన అతిథి",
      loading: "లోడ్ అవుతోంది…",
    },
    languagePicker: {
      title: "మీరు ఆహ్వానించబడ్డారు",
      subtitle: "దయచేసి మీ భాషను ఎంచుకోండి",
    },
    stainedGlass: {
      eyebrow: "ఒక పవిత్ర బంధం",
      heading: "స్వాగతం",
      message:
        "దేవుని కృపచేత, ఈ వివాహ కార్యక్రమాన్ని చూడటానికి రెండు కుటుంబాలు మిమ్మల్ని ఆనందంగా ఆహ్వానిస్తున్నాయి",
    },
    cord: {
      eyebrow: "దేవుని వాక్యం",
      verseRef: "ప్రసంగి 4:12",
      verseText:
        "ఒంటరియగు నొకనిమీద మరియొకడు పడినయెడల ఇద్దరు కూడి వాని నెదిరింప గలరు, మూడు పేటల త్రాడు త్వరగా తెగిపోదు గదా?",
      caption: "దేవుడు, వధువు మరియు వరుడు — ముడివేయబడి ఒక్కటిగా.",
    },
    couple: {
      eyebrow: "రెండు హృదయాలు, ఒకే విశ్వాసం",
      heading: `${WEDDING.names.te.groomShort} & ${WEDDING.names.te.brideShort}`,
      subtext:
        "క్రీస్తులో తమ నూతన జీవితాన్ని ప్రారంభించబోతున్న ఈ సందర్భంగా, తమ కుటుంబాలతో కలిసి మీ సమక్షాన్ని కోరుకుంటున్నారు.",
      brideLabel: "వధువు",
      groomLabel: "వరుడు",
    },
    jesusBlessing: {
      eyebrow: "ప్రభువు ఆశీర్వాదం",
      verseRef: "సంఖ్యాకాండము 6:24-26",
      verseText:
        "యెహోవా నిన్ను ఆశీర్వదించి నిన్ను కాపాడునుగాక; యెహోవా నీమీద తన సన్నిధిని ప్రకాశింపజేసి నిన్ను కరుణించునుగాక; యెహోవా నీమీద తన సన్నిధి కాంతి ఉదయింపజేసి నీకు సమాధానము కలుగజేయునుగాక.",
    },
    story: {
      eyebrow: "మా ప్రయాణం",
      heading: "మా కథ",
      cards: [
        {
          year: "2021",
          title: "మొదటి పరిచయం",
          desc: `${WEDDING.names.te.groomShort} మరియు ${WEDDING.names.te.brideShort} ఒక చర్చి యువజన సమాజంలో మొదటిసారి కలుసుకున్నారు — ఇది నమూనా వచనం.`,
        },
        {
          year: "2024",
          title: "ప్రతిపాదన",
          desc: `కుటుంబం మరియు స్నేహితుల సమక్షంలో ${WEDDING.names.te.groomShort} ${WEDDING.names.te.brideShort}‌ను వివాహం చేసుకొమ్మని అడిగిన నమూనా కథనం.`,
        },
        {
          year: "2026",
          title: "వివాహం",
          desc: "ఈ ఆశీర్వదిత బంధాన్ని జరుపుకోవడానికి రెండు కుటుంబాలు సిద్ధమవుతున్న నమూనా వచనం.",
        },
      ],
    },
    details: {
      eyebrow: "తేదీని గుర్తుంచుకోండి",
      heading: "వివాహ వివరాలు",
      churchLabel: "పవిత్ర వివాహం",
      churchName: "సెయింట్ మేరీస్ చర్చి, హైదరాబాద్",
      churchAddress: "12 చర్చి రోడ్, హైదరాబాద్, తెలంగాణ",
      dateLabel: "తేదీ & సమయం",
      dateDisplay: "శనివారం, 12 డిసెంబర్ 2026",
      timeDisplay: "ఉదయం 10:30",
      receptionLabel: "రిసెప్షన్",
      receptionName: "గ్రాండ్ హాల్, హైదరాబాద్",
      receptionAddress: "45 సెలబ్రేషన్ అవెన్యూ, హైదరాబాద్, తెలంగాణ",
      directionsBtn: "చర్చికి దారి చూపించు",
      receptionDirectionsBtn: "రిసెప్షన్‌కు దారి చూపించు",
    },
    blessing: {
      eyebrow: "చివరి దీవెన",
      heading: "కృతజ్ఞతా హృదయంతో",
      verseRef2: "1 కొరింథీయులకు 13:4-7",
      verseText2:
        "ప్రేమ దీర్ఘకాలము సహించును, దయ చూపించును. ప్రేమ మత్సరపడదు; ప్రేమ డంబముగా ప్రవర్తింపదు; అది ఉప్పొంగదు; అమర్యాదగా నడువదు; స్వప్రయోజనమును విచారించుకొనదు; త్వరగా కోపపడదు; అపకారమును మనస్సులో ఉంచుకొనదు. దుర్నీతివిషయమై సంతోషపడక సత్యమునందు సంతోషించును. అన్నిటికి తాళుకొనును, అన్నిటిని నమ్మును; అన్నిటిని నిరీక్షించును; అన్నిటిని ఓర్చును.",
      verseRef3: "రూతు 1:16",
      verseText3:
        "నీవు వెళ్లు చోటికే నేను వచ్చెదను, నీవు నివసించుచోటనే నేను నివసించెదను, నీ జనమే నా జనము నీ దేవుడే నా దేవుడు.",
      closing:
        "మీ ప్రేమకు మరియు ప్రార్థనలకు దేవునికి కృతజ్ఞతలు తెలుపుతున్నాము, ఈ ఆనంద దినాన్ని మీతో కలిసి జరుపుకోవాలని ఎదురుచూస్తున్నాము.",
      signature: `ప్రేమతో, ${WEDDING.names.te.groom} & ${WEDDING.names.te.bride}`,
      musicOn: "సంగీతం ఆన్",
      musicOff: "సంగీతం ఆఫ్",
      rsvp: "మా కథలో భాగమైనందుకు ధన్యవాదాలు.",
    },
  },
};

// Audio placeholder — replace with a real royalty-free track before publishing.
// Kept as a relative path so it resolves correctly under any GitHub Pages
// sub-path (e.g. https://username.github.io/wedding-card/).
export const MUSIC_SRC = "audio/background-music.mp3";

export function getUrlParams(): { name: string | null; lang: LangCode | null } {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const langParam = params.get("lang");
  const validLangs: LangCode[] = ["en", "te"];
  const lang = validLangs.includes(langParam as LangCode) ? (langParam as LangCode) : null;
  return { name, lang };
}

// ============================================================================
// Narration builder — assembles the voice narration for each scene ONLY from
// strings already present in TRANSLATIONS and WEDDING. No new translated
// sentences are introduced here.
// ============================================================================

export type NarrationSceneKey =
  | "glass"
  | "cord"
  | "couple"
  | "jesusBlessing"
  | "story"
  | "details"
  | "blessing";

export function buildNarration(
  scene: NarrationSceneKey,
  lang: LangCode,
  guestName: string | null
): string {
  const t = TRANSLATIONS[lang];
  // Speak "&" as a real word so voices don't say "ampersand".
  const AND: Record<LangCode, string> = { en: "and", te: "మరియు" };
  const say = (s: string) => s.replace(/&/g, AND[lang]);

  switch (scene) {
    case "glass": {
      const who = guestName && guestName.trim() ? guestName.trim() : t.common.defaultGuest;
      return `${t.common.dearPrefix} ${who}. ${t.stainedGlass.message} ${say(t.couple.heading)}`;
    }
    case "cord":
      return `${t.cord.verseText} ${t.cord.verseRef}`;
    case "couple":
      return `${say(t.couple.heading)}. ${t.couple.subtext}`;
    case "jesusBlessing": {
      return `${t.jesusBlessing.verseText} ${t.jesusBlessing.verseRef}`;
    }
    case "story":
      return "";
    case "details":
      return `${t.details.churchName}. ${t.details.dateDisplay}. ${t.details.timeDisplay}. ${t.details.receptionName}`;
    case "blessing":
      return `${t.blessing.closing} ${say(t.blessing.signature)}`;
    default:
      return "";
  }
}
