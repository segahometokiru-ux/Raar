/* Per-chapter atmospheres: preserve the 15 established palettes and add a restrained layer of thematic particles. */
(function () {
  "use strict";
  const themes = [
    { name: "sakura", symbols: ["✿", "❀", "✧", "🌸", "·", "❀", "✿", "✧"], particle: "❀" },
    { name: "spring", symbols: ["❋", "❀", "❧", "✦", "☼", "❧", "✿", "·"], particle: "✿" },
    { name: "japan", symbols: ["♧", "❀", "🏮", "扇", "✧", "❀", "🏮", "·"], particle: "✧" },
    { name: "china", symbols: ["🏮", "✦", "❀", "金", "✧", "🏮", "❋", "·"], particle: "✦" },
    { name: "winter", symbols: ["❄", "✧", "❅", "·", "❄", "✦", "❅", "❄"], particle: "❄" },
    { name: "stars", symbols: ["✦", "✧", "☾", "·", "✶", "✧", "✦", "⋆"], particle: "✦" },
    { name: "summer", symbols: ["🦋", "✿", "☼", "❋", "🦋", "❀", "✦", "·"], particle: "🦋" },
    { name: "rose", symbols: ["❀", "♡", "🌹", "✧", "❁", "🌹", "♡", "·"], particle: "❀" },
    { name: "sea", symbols: ["〜", "🐚", "·", "❧", "〜", "✦", "🐚", "〜"], particle: "·" },
    { name: "autumn", symbols: ["🍂", "🍁", "✧", "🍂", "❧", "🍁", "·", "🍂"], particle: "🍂" },
    { name: "glow", symbols: ["✦", "·", "✧", "☼", "✦", "·", "✧", "⋆"], particle: "✦" },
    { name: "clouds", symbols: ["☁", "✧", "☁", "⋆", "☁", "✦", "☁", "·"], particle: "☁" },
    { name: "city", symbols: ["▦", "✦", "☾", "▪", "▦", "✧", "▫", "·"], particle: "✦" },
    { name: "dreams", symbols: ["☆", "✧", "✦", "⋆", "☆", "·", "✧", "✶"], particle: "☆" },
    { name: "final", symbols: ["🌸", "✧", "♡", "✦", "❀", "⋆", "🌸", "✧"], particle: "🌸" }
  ];
  const ordinals = ["ПЕРВАЯ", "ВТОРАЯ", "ТРЕТЬЯ", "ЧЕТВЁРТАЯ", "ПЯТАЯ", "ШЕСТАЯ", "СЕДЬМАЯ", "ВОСЬМАЯ", "ДЕВЯТАЯ", "ДЕСЯТАЯ", "ОДИННАДЦАТАЯ", "ДВЕНАДЦАТАЯ", "ТРИНАДЦАТАЯ", "ЧЕТЫРНАДЦАТАЯ", "ПЯТНАДЦАТАЯ"];

  function decoratePage() {
    const page = document.querySelector("#pagePaper .chapter-content");
    if (!page) return;
    const label = page.querySelector(".chapter-topline span")?.textContent || "";
    const match = label.match(/ГЛАВА\s+([^\s]+)/i);
    const index = match ? ordinals.indexOf(match[1].toUpperCase()) : -1;
    if (index < 0) return;
    const theme = themes[index];
    page.classList.add(`theme-${theme.name}`);
    if (page.querySelector(".atmosphere-decor")) return;
    const layer = document.createElement("div");
    layer.className = "atmosphere-decor";
    layer.setAttribute("aria-hidden", "true");
    theme.symbols.forEach((symbol, i) => {
      const item = document.createElement("span");
      item.className = `decor-piece decor-piece-${i + 1}`;
      item.textContent = symbol;
      item.style.setProperty("--piece-delay", `${-0.7 * i}s`);
      layer.append(item);
    });
    if (index === 0 || index === 4 || index === 6 || index === 9 || index === 10 || index === 11 || index === 13) {
      const particleCount = window.matchMedia("(max-width: 600px)").matches ? 7 : 11;
      for (let i = 0; i < particleCount; i += 1) {
        const particle = document.createElement("span");
        particle.className = `scene-particle scene-particle-${i + 1}`;
        particle.textContent = theme.particle;
        particle.style.setProperty("--particle-delay", `${(i * 0.63).toFixed(2)}s`);
        particle.style.setProperty("--particle-x", `${8 + ((i * 37) % 84)}%`);
        particle.style.setProperty("--particle-duration", `${5.5 + (i % 4) * 1.25}s`);
        layer.append(particle);
      }
    }
    page.prepend(layer);
  }

  function initAtmospheres() {
    const paper = document.getElementById("pagePaper");
    if (!paper || !("MutationObserver" in window)) return;
    decoratePage();
    new MutationObserver(decoratePage).observe(paper, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAtmospheres, { once: true });
  else initAtmospheres();
})();
