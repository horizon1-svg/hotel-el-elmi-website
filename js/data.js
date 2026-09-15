/**
 * data.js — Hotel El Elmi (فندق العلمي)
 * -------------------------------------------------------------
 * Every value below is either:
 *   (a) verified information provided by the hotel, or
 *   (b) an explicit placeholder clearly marked as such.
 *
 * Nothing here is invented (no fake prices, room types, menu items,
 * reviews, or statistics). When real information arrives, edit the
 * values in this file only — index.html and main.js never need to
 * change.
 *
 * FUTURE SUPABASE MIGRATION
 * Each block below is written to map directly onto a table:
 *   hotelInfo   -> table "hotel_info"     (single row)
 *   amenities   -> table "amenities"
 *   rooms       -> table "rooms"
 *   gallery     -> table "gallery_items"
 *   restaurant  -> table "restaurant_info" (single row)
 * Swap the `const X = [...]` for a `fetch()`/Supabase `select()` call
 * that returns the same shape, and the render functions in main.js
 * keep working unchanged.
 */

/* ------------------------------------------------------------- */
/* Core hotel information (verified)                              */
/* ------------------------------------------------------------- */
const hotelInfo = {
  nameAr: "فندق العلمي",
  nameEn: "Hotel El Elmi",
  publicNameAr: "فندق العلمي وادي سوف",

  taglineAr: "إقامتكم المريحة في قلب وادي سوف",
  taglineEn: "Your stay in the heart of El Oued",

  addressAr: "حي سيدي عبدالله، الوادي، الجزائر",
  addressEn: "Cité Sidi Abdallah, El Oued, Algeria",
  cityAr: "الوادي، الجزائر",
  plusCode: "9VF4+F6C",

  // tel: links must stay in international format for mobile dialing
  phones: [
    { labelAr: "الهاتف الرئيسي", display: "+213 698 83 84 86", tel: "tel:+213698838486" },
    { labelAr: "الهاتف الثانوي", display: "+213 32 11 79 04", tel: "tel:+213321179004" }
  ],

  // Verified as a mobile line, but WhatsApp registration is NOT confirmed.
  // Do not surface a WhatsApp button until this is set to true by someone
  // who has confirmed it with the hotel.
  whatsappConfirmed: false,

  // No verified Facebook URL was supplied — only the page name. Do not
  // guess a URL. Fill this in once the real link is confirmed.
  facebookLabel: "Hotel El Elmi / فندق العلمي وادي سوف",
  facebookUrl: null, // TODO: أضيفوا رابط صفحة الفيسبوك الرسمي هنا بعد التأكد منه

  mapsQuery: "9VF4+F6C El Oued Algeria",

  rating: {
    value: 3.8,
    outOf: 5,
    count: 218,
    source: "خرائط جوجل (Google)"
  }
};

hotelInfo.mapsEmbedUrl =
  "https://www.google.com/maps?q=" + encodeURIComponent(hotelInfo.mapsQuery) + "&output=embed";
hotelInfo.mapsDirectionsUrl =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(hotelInfo.mapsQuery);

/* ------------------------------------------------------------- */
/* Navigation                                                     */
/* ------------------------------------------------------------- */
const navLinks = [
  { labelAr: "الرئيسية", href: "#home" },
  { labelAr: "من نحن", href: "#about" },
  { labelAr: "الغرف", href: "#rooms" },
  { labelAr: "الخدمات", href: "#amenities" },
  { labelAr: "المطعم", href: "#restaurant" },
  { labelAr: "معرض الصور", href: "#gallery" },
  { labelAr: "الموقع", href: "#location" },
  { labelAr: "تواصل معنا", href: "#contact" }
];

/* ------------------------------------------------------------- */
/* Amenities — verified only                                      */
/* ------------------------------------------------------------- */
const amenities = [
  {
    id: "wifi",
    icon: "wifi",
    titleAr: "واي فاي مجاني",
    descAr: "اتصال إنترنت مجاني في جميع أنحاء الفندق."
  },
  {
    id: "parking",
    icon: "parking",
    titleAr: "موقف سيارات مجاني",
    descAr: "موقف سيارات مخصص لضيوف الفندق."
  },
  {
    id: "restaurant",
    icon: "restaurant",
    titleAr: "مطعم داخلي",
    descAr: "خدمة مطعم متوفرة داخل الفندق."
  },
  {
    id: "reception",
    icon: "clock",
    titleAr: "استقبال على مدار الساعة",
    descAr: "فريق الاستقبال متواجد ٢٤ ساعة لخدمتكم."
  }
];

/* ------------------------------------------------------------- */
/* Rooms — NO verified room types, counts or prices exist yet.    */
/* These are intentionally identical placeholder slots so the     */
/* card system can be reviewed without implying real categories.  */
/* Replace each object's placeholder fields with real data when   */
/* the hotel provides it — the shape below is the target schema.  */
/* ------------------------------------------------------------- */
const rooms = [
  { id: 1, comingSoon: true },
  { id: 2, comingSoon: true },
  { id: 3, comingSoon: true }

  /* Real-room schema to switch to once verified, e.g.:
  {
    id: 1,
    comingSoon: false,
    nameAr: "",              // e.g. "غرفة مزدوجة"
    images: [],              // ["assets/rooms/room-1-a.jpg", ...]
    capacityAr: "",          // e.g. "شخصان"
    amenities: [],           // ["تكييف", "تلفاز", ...]
    price: null,             // number, DZD
    available: null,         // boolean
  }
  */
];

/* ------------------------------------------------------------- */
/* Restaurant — verified category only, no menu items             */
/* ------------------------------------------------------------- */
const restaurantInfo = {
  titleAr: "مطعم فندق العلمي",
  descAr: "يوفر الفندق خدمة مطعم داخلي لضيوفه وزواره.",
  hoursAr: "سيتم نشر أوقات العمل قريبًا",
  menuStatusAr: "القائمة قيد الإعداد"
};

/* ------------------------------------------------------------- */
/* Gallery — categories are real-world hotel areas; every item is */
/* a placeholder slot, never a stock photo mislabeled as real.    */
/* ------------------------------------------------------------- */
const galleryCategories = [
  { id: "all", labelAr: "الكل" },
  { id: "hotel", labelAr: "الفندق" },
  { id: "rooms", labelAr: "الغرف" },
  { id: "interior", labelAr: "الداخلية" },
  { id: "restaurant", labelAr: "المطعم" },
  { id: "exterior", labelAr: "الخارجية" },
  { id: "location", labelAr: "الموقع" }
];

const galleryItems = [
  { id: 1, category: "hotel" },
  { id: 2, category: "rooms" },
  { id: 3, category: "rooms" },
  { id: 4, category: "interior" },
  { id: 5, category: "restaurant" },
  { id: 6, category: "exterior" },
  { id: 7, category: "location" },
  { id: 8, category: "interior" }
];

/* ------------------------------------------------------------- */
/* Booking form options — structural only, not pricing/inventory  */
/* ------------------------------------------------------------- */
const bookingRoomTypeOptions = [
  { value: "", labelAr: "سيُحدَّد لاحقًا مع الفندق" }
];
