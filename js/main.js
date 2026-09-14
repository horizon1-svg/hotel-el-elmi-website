/**
 * main.js — Hotel El Elmi (فندق العلمي)
 * All content comes from data.js. This file only renders it and
 * wires up interaction — it never hardcodes hotel information.
 */

document.addEventListener("DOMContentLoaded", () => {
  fillContactPlaceholders();
  renderNav();
  renderAmenities();
  renderRooms();
  renderGalleryFilters();
  renderGallery("all");
  renderReviews();
  wireHeader();
  wireMobileMenu();
  wireStickyActionBar();
  wirePreviewBanner();
  wireBookingForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- small helpers ---------- */
function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

const ICONS = {
  wifi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 18.5a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Zm-4.2-4.9a6 6 0 0 1 8.4 0l-1.5 1.6a3.9 3.9 0 0 0-5.4 0l-1.5-1.6Zm-3-3.4a10.4 10.4 0 0 1 14.4 0l-1.5 1.6a8.3 8.3 0 0 0-11.4 0L4.8 10.2Z"/></svg>',
  parking: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h6.2a4.4 4.4 0 0 1 0 8.8H9.6V20H6V4Zm3.6 3.2v2.4h2.6a1.2 1.2 0 0 0 0-2.4H9.6Z"/></svg>',
  restaurant: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v6.2a2.6 2.6 0 0 1-2 2.5V21H3.6v-9.3A2.6 2.6 0 0 1 6 9.2V3h1Zm3.2 0v6.6c0 .9.5 1.6 1.3 2v9.4h1.4v-9.4c.8-.4 1.3-1.1 1.3-2V3h-4Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 7.4v5l3.4 2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  camera: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3.2l1-1.6h7.6l1 1.6H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm8 2.4a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-8a2 2 0 0 1 2-2h5.2v3.4H9a1 1 0 0 0-1 1V13h13v-1a3 3 0 0 0-3-3h-2.4V6a1 1 0 0 0-1-1H6a3 3 0 0 0-3 3v10h1Zm-.2 2h18.4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

/* ---------- contact info: single source of truth ---------- */
function fillContactPlaceholders() {
  document.querySelectorAll("[data-fill]").forEach((node) => {
    const key = node.getAttribute("data-fill");
    if (key === "phonePrimaryDisplay") node.textContent = hotelInfo.phones[0].display;
    if (key === "phonePrimaryHref") node.setAttribute("href", hotelInfo.phones[0].tel);
    if (key === "phoneSecondaryDisplay") node.textContent = hotelInfo.phones[1].display;
    if (key === "phoneSecondaryHref") node.setAttribute("href", hotelInfo.phones[1].tel);
    if (key === "addressAr") node.textContent = hotelInfo.addressAr;
    if (key === "plusCode") node.textContent = hotelInfo.plusCode;
    if (key === "mapsEmbed") node.setAttribute("src", hotelInfo.mapsEmbedUrl);
    if (key === "mapsDirections") node.setAttribute("href", hotelInfo.mapsDirectionsUrl);
    if (key === "reviewsLink") node.setAttribute("href", hotelInfo.mapsDirectionsUrl);
  });

  const fbNode = document.getElementById("facebookLink");
  if (fbNode) {
    if (hotelInfo.facebookUrl) {
      fbNode.setAttribute("href", hotelInfo.facebookUrl);
      fbNode.classList.remove("is-disabled");
    } else {
      fbNode.setAttribute("href", "#contact");
      fbNode.classList.add("is-disabled");
      fbNode.title = "الرابط الرسمي لصفحة الفيسبوك سيُضاف بعد التأكد منه";
    }
  }
}

/* ---------- nav ---------- */
function renderNav() {
  const desktopNav = document.getElementById("desktopNav");
  const mobileNav = document.getElementById("mobileNav");
  [desktopNav, mobileNav].forEach((container) => {
    if (!container) return;
    navLinks.forEach((link) => {
      const a = el("a", "nav-link", link.labelAr);
      a.href = link.href;
      container.appendChild(a);
    });
  });
}

/* ---------- amenities ---------- */
function renderAmenities() {
  const grid = document.getElementById("amenitiesGrid");
  if (!grid) return;
  amenities.forEach((item) => {
    const card = el("div", "amenity");
    card.appendChild(el("span", "amenity__icon", ICONS[item.icon] || ""));
    const body = el("div", "amenity__body");
    body.appendChild(el("h3", "amenity__title", item.titleAr));
    body.appendChild(el("p", "amenity__desc", item.descAr));
    card.appendChild(body);
    grid.appendChild(card);
  });
}

/* ---------- rooms ---------- */
function renderRooms() {
  const grid = document.getElementById("roomsGrid");
  if (!grid) return;
  rooms.forEach((room) => {
    const card = el("article", "room-card");
    const media = el("div", "room-card__media placeholder-media", ICONS.bed);
    card.appendChild(media);

    const body = el("div", "room-card__body");
    if (room.comingSoon) {
      body.appendChild(el("h3", "room-card__title", "الغرفة"));
      body.appendChild(el("p", "room-card__desc", "سيتم تزويد التفاصيل من إدارة الفندق."));
      body.appendChild(el("p", "room-card__note", "تواصلوا معنا للاستفسار عن الأسعار والتوفر الحالي."));
      const cta = el("a", "btn btn--ghost btn--small", "اتصلوا للاستفسار");
      cta.href = hotelInfo.phones[0].tel;
      body.appendChild(cta);
    } else {
      body.appendChild(el("h3", "room-card__title", room.nameAr || "غرفة"));
      if (room.capacityAr) body.appendChild(el("p", "room-card__meta", room.capacityAr));
      if (room.price) body.appendChild(el("p", "room-card__price", room.price + " دج / الليلة"));
      const cta = el("a", "btn btn--primary btn--small", "طلب الحجز");
      cta.href = "#contact";
      body.appendChild(cta);
    }
    card.appendChild(body);
    grid.appendChild(card);
  });
}

/* ---------- gallery ---------- */
function renderGalleryFilters() {
  const bar = document.getElementById("galleryFilters");
  if (!bar) return;
  galleryCategories.forEach((cat, i) => {
    const btn = el("button", "chip" + (i === 0 ? " is-active" : ""), cat.labelAr);
    btn.type = "button";
    btn.dataset.category = cat.id;
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGallery(cat.id);
    });
    bar.appendChild(btn);
  });
}

function renderGallery(categoryId) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const items = galleryItems.filter((it) => categoryId === "all" || it.category === categoryId);
  const catLabel = (id) => (galleryCategories.find((c) => c.id === id) || {}).labelAr || "";

  items.forEach((item) => {
    const tile = el("div", "gallery-tile placeholder-media");
    tile.appendChild(el("span", "gallery-tile__icon", ICONS.camera));
    tile.appendChild(el("span", "gallery-tile__label", "صورة " + catLabel(item.category) + " — قريبًا"));
    grid.appendChild(tile);
  });
}

/* ---------- reviews ---------- */
function renderReviews() {
  const starsNode = document.getElementById("reviewStars");
  const valueNode = document.getElementById("reviewValue");
  const countNode = document.getElementById("reviewCount");
  if (starsNode) starsNode.style.setProperty("--fill", (hotelInfo.rating.value / hotelInfo.rating.outOf) * 100 + "%");
  if (valueNode) valueNode.textContent = hotelInfo.rating.value.toFixed(1);
  if (countNode) countNode.textContent = "بناءً على " + hotelInfo.rating.count + " تقييم على " + hotelInfo.rating.source;
}

/* ---------- header + scroll behavior ---------- */
function wireHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      document.body.classList.remove("menu-open");
    });
  });
}

/* ---------- mobile menu ---------- */
function wireMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}

/* ---------- mobile sticky action bar ---------- */
function wireStickyActionBar() {
  const bar = document.getElementById("stickyActionBar");
  const hero = document.getElementById("home");
  if (!bar || !hero) return;
  const observer = new IntersectionObserver(
    ([entry]) => bar.classList.toggle("is-visible", !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(hero);
}

/* ---------- preview banner ---------- */
function wirePreviewBanner() {
  const banner = document.getElementById("previewBanner");
  if (!banner) return;
  if (localStorage.getItem("elElmiPreviewDismissed") === "1") {
    banner.remove();
    return;
  }
  const closeBtn = banner.querySelector(".preview-banner__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      banner.remove();
      localStorage.setItem("elElmiPreviewDismissed", "1");
    });
  }
}

/* ---------- booking / contact form ---------- */
function wireBookingForm() {
  const form = document.getElementById("bookingForm");
  const confirmation = document.getElementById("bookingConfirmation");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());

    /* -----------------------------------------------------------
     * No backend is connected yet. This only simulates a submit.
     * When ready, replace this block with a real call, e.g.:
     *
     *   await supabase.from("booking_requests").insert(payload);
     *
     * or a POST to an email/notification service. Until then, the
     * form does not claim the booking is confirmed — only received.
     * --------------------------------------------------------- */
    console.log("Booking request (not yet sent anywhere):", payload);

    form.hidden = true;
    if (confirmation) confirmation.hidden = false;
  });
}
