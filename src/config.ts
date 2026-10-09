// ============================================================================
// config.ts — SINGLE SOURCE OF TRUTH for all text/content in the invitation.
// Every scene component reads from this file. Nothing is hard-coded elsewhere.
// Scripture quotations are taken from Bible Society of India (BSI) editions:
//   - Telugu:  TELUBSI (Bible Society of India, O.V.)
//   - Hindi:   HINOVBSI (पवित्र बाइबिल OV Re-edited, Bible Society of India)
//   - Odia:    ODIAOV-BSI (ପବିତ୍ର ବାଇବଲ OV Re-edited, Bible Society of India)
//   - English: King James Version (the traditional English text used
//     alongside BSI vernacular editions in Indian churches)
// ============================================================================

export type LangCode = "en" | "te" | "hi" | "or";

export const LANGUAGES: { code: LangCode; nativeLabel: string; englishLabel: string; fontClass: string }[] = [
  { code: "en", nativeLabel: "English", englishLabel: "English", fontClass: "font-noto-en" },
  { code: "te", nativeLabel: "తెలుగు", englishLabel: "Telugu", fontClass: "font-noto-te" },
  { code: "hi", nativeLabel: "हिंदी", englishLabel: "Hindi", fontClass: "font-noto-hi" },
  { code: "or", nativeLabel: "ଓଡ଼ିଆ", englishLabel: "Odia", fontClass: "font-noto-or" },
];

// Couple + event facts (dummy data) — language-independent
export const WEDDING = {
  brideName: "Anna",
  groomName: "David",
  dateISO: "2026-12-12T10:30:00+05:30",
  mapsLink: "https://maps.google.com/?q=St+Marys+Church+Hyderabad",
  receptionMapsLink: "https://maps.google.com/?q=Grand+Hall+Hyderabad",
  heroInitials: "A & D",
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
      heading: "Anna & David",
      subtext:
        "Together with their families, request the honour of your presence as they begin their new life in Christ.",
      brideLabel: "The Bride",
      groomLabel: "The Groom",
    },
    story: {
      eyebrow: "Our Journey",
      heading: "Our Story",
      cards: [
        {
          year: "2021",
          title: "First Meeting",
          desc: "We first met at a church youth fellowship, placeholder text about how Anna and David's paths crossed.",
        },
        {
          year: "2024",
          title: "The Proposal",
          desc: "Placeholder story of the proposal — David asked Anna to marry him with family and friends nearby.",
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
      signature: "With love, Anna & David",
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
      heading: "అన్నా & డేవిడ్",
      subtext:
        "క్రీస్తులో తమ నూతన జీవితాన్ని ప్రారంభించబోతున్న ఈ సందర్భంగా, తమ కుటుంబాలతో కలిసి మీ సమక్షాన్ని కోరుకుంటున్నారు.",
      brideLabel: "వధువు",
      groomLabel: "వరుడు",
    },
    story: {
      eyebrow: "మా ప్రయాణం",
      heading: "మా కథ",
      cards: [
        {
          year: "2021",
          title: "మొదటి పరిచయం",
          desc: "అన్నా మరియు డేవిడ్ ఒక చర్చి యువజన సమాజంలో మొదటిసారి కలుసుకున్నారు — ఇది నమూనా వచనం.",
        },
        {
          year: "2024",
          title: "ప్రతిపాదన",
          desc: "కుటుంబం మరియు స్నేహితుల సమక్షంలో డేవిడ్ అన్నాను వివాహం చేసుకొమ్మని అడిగిన నమూనా కథనం.",
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
      signature: "ప్రేమతో, అన్నా & డేవిడ్",
      musicOn: "సంగీతం ఆన్",
      musicOff: "సంగీతం ఆఫ్",
      rsvp: "మా కథలో భాగమైనందుకు ధన్యవాదాలు.",
    },
  },

  hi: {
    meta: { fontClass: "font-noto-hi", headingFontClass: "font-noto-hi" },
    common: {
      next: "आगे",
      begin: "आरंभ करें",
      swipeHint: "ऊपर स्वाइप करें या आगे टैप करें",
      tapHint: "जारी रखने के लिए टैप करें",
      dearPrefix: "प्रिय",
      defaultGuest: "प्रिय अतिथि",
      loading: "लोड हो रहा है…",
    },
    languagePicker: {
      title: "आप आमंत्रित हैं",
      subtitle: "कृपया अपनी भाषा चुनें",
    },
    stainedGlass: {
      eyebrow: "एक पवित्र बंधन",
      heading: "स्वागत है",
      message:
        "परमेश्वर की कृपा से, दोनों परिवार आपको इस विवाह समारोह का साक्षी बनने के लिए हार्दिक आमंत्रण देते हैं",
    },
    cord: {
      eyebrow: "परमेश्वर का वचन",
      verseRef: "सभोपदेशक 4:12",
      verseText:
        "यदि कोई अकेले पर प्रबल हो तो हो, परन्तु दो उसका सामना कर सकेंगे। जो डोरी तीन तागे से बटी हो वह जल्दी नहीं टूटती।",
      caption: "परमेश्वर, वधू और वर — एक साथ गुंथे हुए।",
    },
    couple: {
      eyebrow: "दो हृदय, एक विश्वास",
      heading: "अन्ना और डेविड",
      subtext:
        "अपने परिवारों के साथ मिलकर, मसीह में अपने नए जीवन की शुरुआत के इस शुभ अवसर पर आपकी उपस्थिति की विनम्र प्रार्थना करते हैं।",
      brideLabel: "वधू",
      groomLabel: "वर",
    },
    story: {
      eyebrow: "हमारी यात्रा",
      heading: "हमारी कहानी",
      cards: [
        {
          year: "2021",
          title: "पहली मुलाक़ात",
          desc: "अन्ना और डेविड पहली बार एक चर्च युवा सभा में मिले थे — यह एक नमूना पाठ है।",
        },
        {
          year: "2024",
          title: "प्रस्ताव",
          desc: "परिवार और मित्रों के बीच डेविड ने अन्ना से विवाह का प्रस्ताव रखा — यह एक नमूना कहानी है।",
        },
        {
          year: "2026",
          title: "विवाह",
          desc: "इस आशीषित बंधन का उत्सव मनाने के लिए दोनों परिवार तैयारी कर रहे हैं — नमूना पाठ।",
        },
      ],
    },
    details: {
      eyebrow: "तारीख़ याद रखें",
      heading: "विवाह का विवरण",
      churchLabel: "पवित्र विवाह",
      churchName: "सेंट मैरी चर्च, हैदराबाद",
      churchAddress: "12 चर्च रोड, हैदराबाद, तेलंगाना",
      dateLabel: "तारीख़ और समय",
      dateDisplay: "शनिवार, 12 दिसंबर 2026",
      timeDisplay: "सुबह 10:30",
      receptionLabel: "स्वागत समारोह",
      receptionName: "ग्रांड हॉल, हैदराबाद",
      receptionAddress: "45 सेलिब्रेशन एवेन्यू, हैदराबाद, तेलंगाना",
      directionsBtn: "चर्च के लिए दिशा-निर्देश",
      receptionDirectionsBtn: "स्वागत समारोह के लिए दिशा-निर्देश",
    },
    blessing: {
      eyebrow: "अंतिम आशीर्वाद",
      heading: "कृतज्ञ हृदय से",
      verseRef2: "1 कुरिन्थियों 13:4-7",
      verseText2:
        "प्रेम धीरजवन्त है, और कृपालु है; प्रेम डाह नहीं करता; प्रेम अपनी बड़ाई नहीं करता, और फूलता नहीं, वह अनरीति नहीं चलता, वह अपनी भलाई नहीं चाहता, झुँझलाता नहीं, बुरा नहीं मानता। कुकर्म से आनन्दित नहीं होता, परन्तु सत्य से आनन्दित होता है। वह सब बातें सह लेता है, सब बातों की प्रतीति करता है, सब बातों की आशा रखता है, सब बातों में धीरज धरता है।",
      verseRef3: "रूत 1:16",
      verseText3:
        "रूत बोली, तू मुझ से यह विनती न कर, कि मुझे त्याग या छोड़कर लौट जा; क्योंकि जिधर तू जाए उधर मैं भी जाऊँगी; जहाँ तू टिके वहाँ मैं भी टिकूँगी; तेरे लोग मेरे लोग होंगे, और तेरा परमेश्‍वर मेरा परमेश्‍वर होगा।",
      closing:
        "हम आपके प्रेम और प्रार्थनाओं के लिए परमेश्वर का धन्यवाद करते हैं, और इस आनंदमय दिन को आपके साथ मनाने की प्रतीक्षा कर रहे हैं।",
      signature: "प्रेम सहित, अन्ना और डेविड",
      musicOn: "संगीत चालू",
      musicOff: "संगीत बंद",
      rsvp: "हमारी कहानी का हिस्सा बनने के लिए धन्यवाद।",
    },
  },

  or: {
    meta: { fontClass: "font-noto-or", headingFontClass: "font-noto-or" },
    common: {
      next: "ପରବର୍ତ୍ତୀ",
      begin: "ଆରମ୍ଭ କରନ୍ତୁ",
      swipeHint: "ଉପରକୁ ସ୍ୱାଇପ୍ କରନ୍ତୁ କିମ୍ବା ପରବର୍ତ୍ତୀ ଦବାନ୍ତୁ",
      tapHint: "ଜାରି ରଖିବାକୁ ଦବାନ୍ତୁ",
      dearPrefix: "ପ୍ରିୟ",
      defaultGuest: "ପ୍ରିୟ ଅତିଥି",
      loading: "ଲୋଡ୍ ହେଉଛି…",
    },
    languagePicker: {
      title: "ଆପଣ ନିମନ୍ତ୍ରିତ",
      subtitle: "ଦୟାକରି ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
    },
    stainedGlass: {
      eyebrow: "ଏକ ପବିତ୍ର ବନ୍ଧନ",
      heading: "ସ୍ୱାଗତମ୍",
      message:
        "ପରମେଶ୍ଵରଙ୍କ କୃପାରୁ, ଦୁଇ ପରିବାର ଏହି ବିବାହ ଉତ୍ସବର ସାକ୍ଷୀ ହେବାକୁ ଆପଣଙ୍କୁ ଆନନ୍ଦର ସହ ନିମନ୍ତ୍ରଣ କରନ୍ତି",
    },
    cord: {
      eyebrow: "ପରମେଶ୍ଵରଙ୍କ ବାକ୍ୟ",
      verseRef: "ଉପଦେଶକ 4:12",
      verseText:
        "ଯେବେ କେହି ଏକାକୀ ଥିବା ଲୋକକୁ ପରାସ୍ତ କରେ, ତେବେ ଦୁଇ ଜଣ ତାହାର ପ୍ରତିବାଧା କରିବେ; ପୁଣି, ତ୍ରିଗୁଣ ରଜ୍ଜୁ ଶୀଘ୍ର ଛିଣ୍ଡି ଯାଏ ନାହିଁ।",
      caption: "ପରମେଶ୍ଵର, କନ୍ୟା ଓ ବର — ଏକାଠି ବୁଣା ହୋଇ ଏକ ହୋଇଛନ୍ତି।",
    },
    couple: {
      eyebrow: "ଦୁଇ ହୃଦୟ, ଏକ ବିଶ୍ୱାସ",
      heading: "ଆନ୍ନା ଓ ଡେଭିଡ୍",
      subtext:
        "ଖ୍ରୀଷ୍ଟଙ୍କଠାରେ ନିଜ ନୂତନ ଜୀବନ ଆରମ୍ଭ କରୁଥିବା ଏହି ଶୁଭ ଅବସରରେ, ସେମାନେ ନିଜ ପରିବାର ସହିତ ମିଶି ଆପଣଙ୍କ ଉପସ୍ଥିତିର ସମ୍ମାନ ପ୍ରାର୍ଥନା କରନ୍ତି।",
      brideLabel: "କନ୍ୟା",
      groomLabel: "ବର",
    },
    story: {
      eyebrow: "ଆମର ଯାତ୍ରା",
      heading: "ଆମର କାହାଣୀ",
      cards: [
        {
          year: "2021",
          title: "ପ୍ରଥମ ସାକ୍ଷାତ",
          desc: "ଆନ୍ନା ଓ ଡେଭିଡ୍ ପ୍ରଥମେ ଏକ ଚର୍ଚ୍ଚ ଯୁବ ସମାଜରେ ସାକ୍ଷାତ ହୋଇଥିଲେ — ଏହା ଏକ ନମୁନା ପାଠ୍ୟ।",
        },
        {
          year: "2024",
          title: "ପ୍ରସ୍ତାବ",
          desc: "ପରିବାର ଓ ବନ୍ଧୁମାନଙ୍କ ମଧ୍ୟରେ ଡେଭିଡ୍ ଆନ୍ନାଙ୍କୁ ବିବାହ ପାଇଁ ପ୍ରସ୍ତାବ ଦେଇଥିଲେ — ଏହା ଏକ ନମୁନା କାହାଣୀ।",
        },
        {
          year: "2026",
          title: "ବିବାହ",
          desc: "ଏହି ଆଶୀର୍ବାଦିତ ବନ୍ଧନକୁ ପାଳନ କରିବାକୁ ଦୁଇ ପରିବାର ପ୍ରସ୍ତୁତ ହେଉଛନ୍ତି — ନମୁନା ପାଠ୍ୟ।",
        },
      ],
    },
    details: {
      eyebrow: "ତାରିଖ ମନେ ରଖନ୍ତୁ",
      heading: "ବିବାହ ବିବରଣୀ",
      churchLabel: "ପବିତ୍ର ବିବାହ",
      churchName: "ସେଣ୍ଟ ମେରୀ ଚର୍ଚ୍ଚ, ହାଇଦ୍ରାବାଦ",
      churchAddress: "12 ଚର୍ଚ୍ଚ ରୋଡ୍, ହାଇଦ୍ରାବାଦ, ତେଲଙ୍ଗାନା",
      dateLabel: "ତାରିଖ ଓ ସମୟ",
      dateDisplay: "ଶନିବାର, 12 ଡିସେମ୍ବର 2026",
      timeDisplay: "ସକାଳ 10:30",
      receptionLabel: "ଅଭ୍ୟର୍ଥନା",
      receptionName: "ଗ୍ରାଣ୍ଡ ହଲ୍, ହାଇଦ୍ରାବାଦ",
      receptionAddress: "45 ସେଲିବ୍ରେସନ୍ ଆଭେନ୍ୟୁ, ହାଇଦ୍ରାବାଦ, ତେଲଙ୍ଗାନା",
      directionsBtn: "ଚର୍ଚ୍ଚ ପାଇଁ ଦିଗ ନିର୍ଦ୍ଦେଶ",
      receptionDirectionsBtn: "ଅଭ୍ୟର୍ଥନା ପାଇଁ ଦିଗ ନିର୍ଦ୍ଦେଶ",
    },
    blessing: {
      eyebrow: "ଶେଷ ଆଶୀର୍ବାଦ",
      heading: "କୃତଜ୍ଞ ହୃଦୟରେ",
      verseRef2: "1 କରିନ୍ଥୀୟ 13:4-7",
      verseText2:
        "ପ୍ରେମ ଦୀର୍ଘସହିଷ୍ଣୁ, ପ୍ରେମ ହିତଜନକ, ଈର୍ଷା କରେ ନାହିଁ, ଆତ୍ମବଡ଼ିମା କରେ ନାହିଁ, ଅହଙ୍କାର କରେ ନାହିଁ, ଅନୁଚିତ ବ୍ୟବହାର କରେ ନାହିଁ, ସ୍ଵାର୍ଥ ଚେଷ୍ଟା କରେ ନାହିଁ, ବିରକ୍ତ ହୁଏ ନାହିଁ, ଅପକାର ସ୍ମରଣରେ ରଖେ ନାହିଁ, ଅଧର୍ମରେ ଆନନ୍ଦ କରେ ନାହିଁ, କିନ୍ତୁ ସତ୍ୟରେ ଆନନ୍ଦ କରେ; ସମସ୍ତ ସହ୍ୟ କରେ, ସମସ୍ତ ବିଶ୍ଵାସ କରେ, ସମସ୍ତ ଭରସା କରେ, ସମସ୍ତ ବିଷୟରେ ଧୈର୍ଯ୍ୟ ଧରି ରହେ।",
      verseRef3: "ରୂତ 1:16",
      verseText3:
        "ରୂତ କହିଲା, ତୁମ୍ଭକୁ ତ୍ୟାଗ କରି ତୁମ୍ଭର ପଶ୍ଚାଦ୍ଗମନ କରିବାରୁ ଫେରି ଯିବାକୁ ମୋତେ ବିନୟ ନ କର, ଯେହେତୁ ତୁମ୍ଭେ ଯେଉଁଠାକୁ ଯିବ, ମୁଁ ମଧ୍ୟ ସେହିଠାକୁ ଯିବି; ତୁମ୍ଭେ ଯେଉଁଠାରେ ରହିବ, ମୁଁ ମଧ୍ୟ ସେହିଠାରେ ରହିବି; ତୁମ୍ଭର ଲୋକ ହିଁ ମୋହର ଲୋକ ଓ ତୁମ୍ଭର ପରମେଶ୍ଵର ହିଁ ମୋହର ପରମେଶ୍ଵର ହେବେ।",
      closing:
        "ଆପଣଙ୍କ ପ୍ରେମ ଓ ପ୍ରାର୍ଥନା ପାଇଁ ଆମେ ପରମେଶ୍ଵରଙ୍କୁ ଧନ୍ୟବାଦ ଦେଉଛୁ, ଏବଂ ଏହି ଆନନ୍ଦର ଦିନକୁ ଆପଣଙ୍କ ସହିତ ପାଳନ କରିବାକୁ ଅପେକ୍ଷା କରିଛୁ।",
      signature: "ସ୍ନେହରେ, ଆନ୍ନା ଓ ଡେଭିଡ୍",
      musicOn: "ସଙ୍ଗୀତ ଅନ୍",
      musicOff: "ସଙ୍ଗୀତ ଅଫ୍",
      rsvp: "ଆମ କାହାଣୀର ଅଂଶ ହେବା ପାଇଁ ଧନ୍ୟବାଦ।",
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
  const validLangs: LangCode[] = ["en", "te", "hi", "or"];
  const lang = validLangs.includes(langParam as LangCode) ? (langParam as LangCode) : null;
  return { name, lang };
}
