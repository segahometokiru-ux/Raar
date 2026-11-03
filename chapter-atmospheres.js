/* Per-chapter atmospheres: decorative-only layers stay behind text and never intercept taps. */
(function () {
  const themes = [
    { name: "sakura", symbols: ["✿", "❀", "✧", "🌸", "·", "❀", "✿", "✧"] },
    { name: "spring", symbols: ["❋", "❀", "❧", "✦", "☼", "❧", "✿", "·"] },
    { name: "japan", symbols: ["♧", "❀", "🏮", "扇", "✧", "❀", "🏮", "·"] },
    { name: "china", symbols: ["🏮", "✦", "❀", "金", "✧", "🏮", "❋", "·"] },
    { name: "winter", symbols: ["❄", "✧", "❅", "·", "❄", "✦", "❅", "❄"] },
    { name: "stars", symbols: ["✦", "✧", "☾", "·", "✶", "✧", "✦", "⋆"] },
    { name: "summer", symbols: ["🦋", "✿", "☼", "❋", "🦋", "❀", "✦", "·"] },
    { name: "rose", symbols: ["❀", "♡", "🌹", "✧", "❁", "🌹", "♡", "·"] },
    { name: "sea", symbols: ["〜", "🐚", "·", "❧", "〜", "✦", "🐚", "〜"] },
    { name: "autumn", symbols: ["🍂", "🍁", "✧", "🍂", "❧", "🍁", "·", "🍂"] },
    { name: "glow", symbols: ["✦", "·", "✧", "☼", "✦", "·", "✧", "⋆"] },
    { name: "clouds", symbols: ["☁", "✧", "☁", "⋆", "☁", "✦", "☁", "·"] },
    { name: "city", symbols: ["▦", "✦", "☾", "▪", "▦", "✧", "▫", "·"] },
    { name: "dreams", symbols: ["☆", "✧", "✦", "⋆", "☆", "·", "✧", "✶"] },
    { name: "final", symbols: ["🌸", "✧", "♡", "✦", "❀", "⋆", "🌸", "✧"] }
  ];

  function decoratePage() {
    const page = document.querySelector("#pagePaper .chapter-content");
    if (!page) return;
    const label = page.querySelector(".chapter-topline span")?.textContent || "";
    const match = label.match(/ГЛАВА\s+(ПЕРВАЯ|ВТОРАЯ|ТРЕТЬЯ|ЧЕТВЁРТАЯ|ПЯТАЯ|ШЕСТАЯ|СЕДЬМАЯ|ВОСЬМАЯ|ДЕВЯТАЯ|ДЕСЯТАЯ|ОДИННАДЦАТАЯ|ДВЕНАДЦАТАЯ|ТРИНАДЦАТАЯ|ЧЕТЫРНАДЦАТАЯ|ПЯТНАДЦАТАЯ)/i);
    const ordinal = match && match[1].toUpperCase();
    const index = ["ПЕРВАЯ", "ВТОРАЯ", "ТРЕТЬЯ", "ЧЕТВЁРТАЯ", "ПЯТАЯ", "ШЕСТАЯ", "СЕДЬМАЯ", "ВОСЬМАЯ", "ДЕВЯТАЯ", "ДЕСЯТАЯ", "ОДИННАДЦАТАЯ", "ДВЕНАДЦАТАЯ", "ТРИНАДЦАТАЯ", "ЧЕТЫРНАДЦАТАЯ", "ПЯТНАДЦАТАЯ"].indexOf(ordinal);
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
    page.prepend(layer);
  }

  function initAtmospheres() {
    const paper = document.getElementById("pagePaper");
    if (!paper) return;
    decoratePage();
    new MutationObserver(decoratePage).observe(paper, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAtmospheres, { once: true });
  else initAtmospheres();
})();
