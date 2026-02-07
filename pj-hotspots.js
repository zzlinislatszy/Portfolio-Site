(() => {
  // ✅ 這裡填你的 hero_pj.jpg 原始像素尺寸（非常重要）
  // 例如你標的 1562 是寬，那高度請用圖片實際高度（Finder 看資訊 / 右鍵 Get Info）
  const IMG_W = 1562;
  const IMG_H = 0; // TODO: 改成 hero_pj.jpg 的原始高度，例如 900、1024、...（必填）

  const hero = document.getElementById("pjHero");
  const spots = Array.from(document.querySelectorAll(".page-pj .pj-hotspot"));

  function layout() {
    if (!hero || !spots.length) return;
    if (!IMG_W || !IMG_H) return; // 沒填高度就不算，避免亂跳

    const rect = hero.getBoundingClientRect();
    const vw = rect.width;
    const vh = rect.height;

    // ✅ 完全照 CSS background-size: cover 的規則
    const scale = Math.max(vw / IMG_W, vh / IMG_H);
    const drawnW = IMG_W * scale;
    const drawnH = IMG_H * scale;

    // ✅ background-position: center 的 offset
    const offsetX = (vw - drawnW) / 2;
    const offsetY = (vh - drawnH) / 2;

    // 把「圖片座標」映射到「螢幕座標」
    for (const a of spots) {
      const x = parseFloat(a.dataset.x || "0");
      const y = parseFloat(a.dataset.y || "0");
      const w = parseFloat(a.dataset.w || "0");
      const h = parseFloat(a.dataset.h || "0");

      a.style.left = `${offsetX + x * scale}px`;
      a.style.top = `${offsetY + y * scale}px`;
      a.style.width = `${w * scale}px`;
      a.style.height = `${h * scale}px`;
    }
  }

  window.addEventListener("resize", layout, { passive: true });
  window.addEventListener("load", layout);
  layout();
})();
