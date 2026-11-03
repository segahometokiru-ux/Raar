const CHAPTERS = [
  {
    label: "ГЛАВА ПЕРВАЯ",
    title: "Наше <em>знакомство</em>",
    paragraphs: [
      "Мы познакомились в школе, на уроке чувашского языка. Точную дату я уже не помню.",
      "Ты подошла ко мне, потому что услышала, как я говорю о «Магической битве». Так началась наша история."
    ],
    ornament: "01"
  },
  {
    label: "ГЛАВА ВТОРАЯ",
    title: "Первое <em>впечатление</em>",
    paragraphs: [
      "Ты сразу показалась мне очень красивой. И сейчас я думаю о тебе так же.",
      "Но больше всего меня впечатлило то, как ты умеешь поддерживать, помогать и быть рядом."
    ],
    ornament: "02"
  },
  {
    label: "ГЛАВА ТРЕТЬЯ",
    title: "Первые <em>разговоры</em>",
    paragraphs: [
      "Первой заговорила именно ты. Кажется, мы обсуждали «Магическую битву», запечатывание Годжо и события аниме.",
      "Кто бы мог подумать, что обычный разговор станет началом такой важной истории."
    ],
    ornament: "03"
  },
  {
    label: "ГЛАВА ЧЕТВЁРТАЯ",
    title: "Спасибо <em>тебе</em>",
    paragraphs: [
      "Спасибо за твою поддержку, терпение и заботу.",
      "Ты стала для меня очень родным человеком. Рядом с тобой я чувствую тепло и спокойствие. Я очень ценю всё, что ты для меня делаешь.",
      "Я не всегда умею правильно выразить благодарность, но хочу, чтобы ты знала: твоё присутствие в моей жизни очень много значит."
    ],
    ornament: "04"
  },
  {
    label: "ГЛАВА ПЯТАЯ",
    title: "Несколько слов <em>о тебе</em>",
    compliments: [
      "Ты невероятно добрая.",
      "Ты умеешь делать обычный день светлее.",
      "В тебе столько тепла и искренности.",
      "Ты сильная, заботливая и настоящая.",
      "Я очень рад, что знаю тебя."
    ],
    ornament: "05"
  },
  {
    label: "ГЛАВА ШЕСТАЯ",
    title: "Маленькие <em>детали</em>",
    variant: "details",
    detailCards: [
      { icon: "✳", title: "Твоя улыбка", text: "Она умеет сделать даже самый обычный день особенным." },
      { icon: "♡", title: "Твоя забота", text: "В простых мелочах рядом с тобой всегда столько тепла." },
      { icon: "✦", title: "Наши разговоры", text: "Я дорожу каждым моментом, когда мы просто говорим обо всём." },
      { icon: "∞", title: "То, какая ты есть", text: "Именно из таких маленьких деталей складывается моё большое чувство." }
    ],
    ornament: "06"
  },
  {
    label: "ГЛАВА СЕДЬМАЯ",
    title: "Если бы можно было <em>остановить время</em>",
    variant: "time",
    quote: "Если бы можно было остановить время, я бы оставил его в одном из тех тихих мгновений, когда мы просто рядом.",
    quoteCaption: "ПОТОМУ ЧТО ВРЕМЯ РЯДОМ С ТОБОЙ ВСЕГДА ПРОЛЕТАЕТ СЛИШКОМ БЫСТРО",
    ornament: "07"
  },
  {
    label: "ГЛАВА ВОСЬМАЯ",
    title: "То, что я не всегда <em>говорю</em>",
    variant: "confession",
    paragraphs: [
      "Иногда мне трудно подобрать правильные слова. Но даже когда я молчу, я очень многое чувствую.",
      "Ты важна для меня больше, чем я умею показать. Я замечаю твою заботу, храню наши разговоры и благодарен за каждый день, в котором ты есть.",
      "Мне хочется, чтобы ты всегда помнила: рядом со мной тебе не нужно быть кем-то другим. Я ценю тебя настоящую."
    ],
    ornament: "08"
  },
  {
    label: "ГЛАВА ДЕВЯТАЯ",
    title: "Впереди ещё <em>столько всего</em>",
    variant: "future",
    futureCards: [
      { number: "01", title: "Новые места", text: "Открывать незнакомые улицы и находить любимые уголки." },
      { number: "02", title: "Поводы смеяться", text: "Собирать истории, которые потом будем вспоминать снова и снова." },
      { number: "03", title: "Тихие вечера", text: "Ценить уютные минуты, когда для счастья достаточно быть рядом." }
    ],
    ornament: "09"
  },
  {
    label: "ГЛАВА ДЕСЯТАЯ",
    title: "И это ещё <em>не конец</em>",
    variant: "ending",
    paragraphs: [
      "Эта книга хранит лишь несколько глав — но за каждой стоит целый мир, который дорог мне.",
      "Спасибо за то, что наша история началась. Я хочу и дальше быть рядом: смеяться, поддерживать, мечтать и создавать воспоминания вместе.",
      "И если однажды мы снова откроем эти страницы, пусть впереди нас ждёт ещё больше причин улыбнуться."
    ],
    closingLine: "Продолжение обязательно будет.",
    ornament: "10"
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let currentPage = 0;
let isTurning = false;
let toastTimer;
let touchStartX = 0;
let touchStartY = 0;

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function chapterMarkup(chapter) {
  const paragraphs = (chapter.paragraphs || []).map((text) => `<p>${escapeHTML(text)}</p>`).join("");
  const compliments = chapter.compliments
    ? `<ul class="compliments">${chapter.compliments.map((text, index) => `<li style="--item:${index}">${escapeHTML(text)}</li>`).join("")}</ul>`
    : "";
  const details = chapter.detailCards
    ? `<div class="detail-grid">${chapter.detailCards.map((card, index) => `<article class="detail-card" style="--card-index:${index}"><span class="detail-icon" aria-hidden="true">${escapeHTML(card.icon)}</span><h2>${escapeHTML(card.title)}</h2><p>${escapeHTML(card.text)}</p></article>`).join("")}</div>`
    : "";
  const time = chapter.quote
    ? `<div class="time-piece"><div class="clock-face" aria-hidden="true"><span class="clock-tick tick-1"></span><span class="clock-tick tick-2"></span><span class="clock-tick tick-3"></span><span class="clock-tick tick-4"></span><span class="clock-hand clock-hour"></span><span class="clock-hand clock-minute"></span><span class="clock-center"></span></div><blockquote>${escapeHTML(chapter.quote)}</blockquote><p class="quote-caption">${escapeHTML(chapter.quoteCaption)}</p></div>`
    : "";
  const future = chapter.futureCards
    ? `<div class="future-grid">${chapter.futureCards.map((card, index) => `<article class="future-card" style="--card-index:${index}"><span>${escapeHTML(card.number)}</span><h2>${escapeHTML(card.title)}</h2><p>${escapeHTML(card.text)}</p><i aria-hidden="true">✧</i></article>`).join("")}</div>`
    : "";
  const closing = chapter.closingLine ? `<p class="closing-line">${escapeHTML(chapter.closingLine)}</p>` : "";
  const variant = chapter.variant ? ` chapter-${chapter.variant}` : "";
  return `<article class="chapter-content${variant}"><div class="chapter-topline"><span>${chapter.label}</span><span>OUR STORY</span></div><div class="chapter-copy"><p class="chapter-kicker">ИЗ НАШИХ ВОСПОМИНАНИЙ</p><h1>${chapter.title}</h1>${paragraphs}${compliments}${details}${time}${future}${closing}</div><span class="chapter-ornament" aria-hidden="true">${chapter.ornament}</span><span class="page-corner" aria-hidden="true">♡</span></article>`;
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderPage(index, direction = 0) {
  if (!CHAPTERS[index]) return;
  currentPage = index;
  const paper = $("#pagePaper");
  paper.innerHTML = chapterMarkup(CHAPTERS[index]);
  paper.classList.remove("turn-forward", "turn-back", "page-enter");
  void paper.offsetWidth;
  paper.classList.add(direction > 0 ? "turn-forward" : direction < 0 ? "turn-back" : "page-enter");
  $("#pageNumber").textContent = `${String(index + 1).padStart(2, "0")} / ${String(CHAPTERS.length).padStart(2, "0")}`;
  $("#progressFill").style.width = `${((index + 1) / CHAPTERS.length) * 100}%`;
  const progress = $(".progress-track");
  progress.setAttribute("aria-valuemax", String(CHAPTERS.length));
  progress.setAttribute("aria-valuenow", String(index + 1));
  $("#previousPage").disabled = index === 0;
  $("#nextPage").innerHTML = index === CHAPTERS.length - 1 ? '<span>Завершить</span> <span aria-hidden="true">♡</span>' : '<span>Далее</span> <span aria-hidden="true">→</span>';
  $("#nextPage").setAttribute("aria-label", index === CHAPTERS.length - 1 ? "Завершить историю" : "Следующая страница");
  $$(".compliments li", paper).forEach((item, itemIndex) => {
    item.style.animationDelay = `${itemIndex * 420 + 180}ms`;
  });
}

function turnPage(direction) {
  if (isTurning) return;
  const next = currentPage + direction;
  if (next < 0) return;
  if (next >= CHAPTERS.length) {
    showFinal();
    return;
  }
  isTurning = true;
  const paper = $("#pagePaper");
  paper.classList.remove("turn-forward", "turn-back", "page-enter");
  paper.classList.add(direction > 0 ? "turn-forward" : "turn-back");
  window.setTimeout(() => {
    renderPage(next, direction);
    window.setTimeout(() => { isTurning = false; }, 540);
  }, 250);
}

function showFinal() {
  const finalScreen = $("#finalScreen");
  finalScreen.hidden = false;
  requestAnimationFrame(() => finalScreen.classList.add("visible"));
  $("#bookStage").hidden = true;
  document.body.classList.add("final-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function reread() {
  const finalScreen = $("#finalScreen");
  finalScreen.classList.remove("visible");
  window.setTimeout(() => {
    finalScreen.hidden = true;
    document.body.classList.remove("final-active");
    $("#bookStage").hidden = false;
    renderPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 500);
}

function createHeartWords() {
  const container = $("#heartWords");
  const points = [];
  for (let y = -1.15; y <= 1.15; y += 0.145) {
    for (let x = -1.25; x <= 1.25; x += 0.13) {
      const heart = (x * x + y * y - 1) ** 3 - x * x * y * y * y;
      if (heart <= 0) points.push({ x, y });
    }
  }
  points.forEach((point, index) => {
    const word = document.createElement("span");
    word.className = "heart-word";
    word.textContent = "люблю";
    word.style.setProperty("--x", `${point.x * 47}%`);
    word.style.setProperty("--y", `${point.y * 44}%`);
    word.style.setProperty("--delay", `${(index % 17) * 45}ms`);
    container.append(word);
  });
}

function initStars() {
  const field = $("#stars");
  if (!field) return;
  const count = window.matchMedia("(max-width: 600px)").matches ? 28 : 52;
  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.setAttribute("aria-hidden", "true");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
    field.append(star);
  }
}

function initMusic() {
  const tracks = [$("#trackOne"), $("#trackTwo")];
  const button = $("#musicToggle");
  if (!button || tracks.some((track) => !track)) return () => {};
  let trackIndex = 0;
  let enabled = false;
  const syncButton = () => {
    button.setAttribute("aria-pressed", String(enabled));
    button.setAttribute("aria-label", enabled ? "Выключить музыку" : "Включить музыку");
    button.classList.toggle("is-playing", enabled);
  };
  const playCurrent = async () => {
    try {
      await tracks[trackIndex].play();
      enabled = true;
      syncButton();
    } catch (error) {
      enabled = false;
      syncButton();
      showToast(`Добавьте аудиофайл: ${trackIndex === 0 ? "audio/oslepitelnaya.mp3" : "audio/rayskie-cvety.mp3"}`);
    }
  };
  tracks.forEach((track, index) => track.addEventListener("ended", () => {
    trackIndex = (index + 1) % tracks.length;
    if (enabled) playCurrent();
  }));
  button.addEventListener("click", () => {
    if (enabled) {
      tracks.forEach((track) => track.pause());
      enabled = false;
      syncButton();
      return;
    }
    playCurrent();
  });
  return () => { trackIndex = 0; playCurrent(); };
}

function initTelegram() {
  const app = window.Telegram?.WebApp;
  if (!app) return;
  try {
    app.ready();
    app.expand();
    app.setHeaderColor?.("#10110f");
    app.setBackgroundColor?.("#10110f");
    app.setBottomBarColor?.("#10110f");
  } catch (error) {
    console.info("Telegram WebApp display setup was unavailable.", error);
  }
}

function init() {
  initStars();
  createHeartWords();
  initTelegram();
  renderPage(0);
  const startMusic = initMusic();
  const cover = $("#cover");
  const openButton = $("#openEnvelope");
  openButton?.addEventListener("click", () => {
    if (openButton.classList.contains("opened")) return;
    openButton.classList.add("opened");
    openButton.setAttribute("aria-expanded", "true");
    window.setTimeout(() => {
      $("#bookStage").hidden = false;
      cover.classList.add("dismissed");
      startMusic();
      window.setTimeout(() => { cover.hidden = true; }, 850);
    }, 750);
  });
  $("#previousPage")?.addEventListener("click", () => turnPage(-1));
  $("#nextPage")?.addEventListener("click", () => turnPage(1));
  $("#rereadButton")?.addEventListener("click", reread);
  const book = $("#book");
  book?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });
  book?.addEventListener("touchend", (event) => {
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) turnPage(dx < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener("keydown", (event) => {
    if (!$("#bookStage") || $("#bookStage").hidden || event.target.matches("button, a")) return;
    if (event.key === "ArrowRight") turnPage(1);
    if (event.key === "ArrowLeft") turnPage(-1);
  });
}

document.addEventListener("DOMContentLoaded", init);
