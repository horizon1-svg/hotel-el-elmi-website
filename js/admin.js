/**
 * admin.js — Hotel El Elmi admin dashboard CONCEPT
 * This only switches which panel is visible. There is no login, no
 * database, and no real data here — see admin.html's top notice and
 * the README for what's needed before this could go live.
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".admin-sidebar__nav button");
  const select = document.getElementById("adminPanelSelect");
  const panels = document.querySelectorAll(".admin-panel");

  function showPanel(id) {
    panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === id));
    buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.panel === id));
    if (select) select.value = id;
  }

  buttons.forEach((btn) => btn.addEventListener("click", () => showPanel(btn.dataset.panel)));
  if (select) select.addEventListener("change", () => showPanel(select.value));

  showPanel("overview");

  // Fill in hotel info preview from the same data.js used by the public site
  const infoBox = document.getElementById("hotelInfoPreview");
  if (infoBox && typeof hotelInfo !== "undefined") {
    infoBox.innerHTML =
      "<p><strong>الاسم:</strong> " + hotelInfo.nameAr + " / " + hotelInfo.nameEn + "</p>" +
      "<p><strong>العنوان:</strong> " + hotelInfo.addressAr + "</p>" +
      "<p><strong>الهاتف الرئيسي:</strong> " + hotelInfo.phones[0].display + "</p>" +
      "<p><strong>الهاتف الثانوي:</strong> " + hotelInfo.phones[1].display + "</p>" +
      "<p><strong>التقييم:</strong> " + hotelInfo.rating.value + " / " + hotelInfo.rating.outOf + " (" + hotelInfo.rating.count + " تقييم)</p>";
  }
});
