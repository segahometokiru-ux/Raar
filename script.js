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
    title: "Тогда <em>и сейчас</em>",
    paragraphs: [
      "Ты была для меня особенной с самого начала.",
      "Тогда я замечал в тебе что-то невероятное — и с тех пор это чувство никуда не исчезло.",
      "Если честно, в те времена ты казалась мне особенно прекрасной. Но и сейчас для меня в тебе есть что-то совершенно неповторимое."
    ],
    photo: { title: "Место для вашего снимка", path: "images/then-and-now.jpg" },
    ornament: "06"
  },
  {
    label: "ГЛАВА СЕДЬМАЯ",
    title: "Продолжение нашей <em>истории</em>",
    paragraphs: [
      "Спасибо, что однажды появилась в моей жизни.",
      "Спасибо за разговоры, поддержку, воспоминания и за то, что ты просто есть.",
      "Я надеюсь, впереди у нас ещё много моментов, над которыми мы будем смеяться, которые будем вспоминать и бережно хранить.",
      "Пусть эта история продолжается. Ведь самые важные главы, возможно, ещё впереди."
    ],
    photo: { title: "Место для ещё одного воспоминания", path: "images/our-story.jpg" },
    ornament: "07"
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
  const photo = chapter.photo
    ? `<figure class="photo-frame"><div class="photo-placeholder" role="img" aria-label="Пустая рамка для фотографии"><span class="photo-mark" aria-hidden="true">✳</span><span>${escapeHTML(chapter.photo.title)}</span><small>${escapeHTML(chapter.photo.path)}</small></div><figcaption>ОДИН КАДР — ЦЕЛАЯ ГЛАВА</figcaption></figure>`
    : "";
  return `<article class="chapter-content"><div class="chapter-topline"><span>${chapter.label}</span><span>OUR STORY</span></div><div class="chapter-copy"><p class="chapter-kicker">ИЗ НАШИХ ВОСПОМИНАНИЙ</p><h1>${chapter.title}</h1>${paragraphs}${compliments}${photo}</div><span class="chapter-ornament" aria-hidden="true">${chapter.ornament}</span><span class="page-corner" aria-hidden="true">♡</span></article>`;
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderPage(index, direction = 0) {
  currentPage = index;
  const paper = $("#pagePaper");
  paper.innerHTML = chapterMarkup(CHAPTERS[index]);
  paper.classList.remove("turn-forward", "turn-back", "page-enter");
  void paper.offsetWidth;
  paper.classList.add(direction > 0 ? "turn-forward" : direction < 0 ? "turn-back" : "page-enter");
  $("#pageNumber").textContent = `${String(index + 1).padStart(2, "0")} / ${String(CHAPTERS.length).padStart(2, "0")}`;
  $("#progressFill").style.width = `${((index + 1) / CHAPTERS.length) * 100}%`;
  $(".progress-track").setAttribute("aria-valuenow", String(index + 1));
  $("#previousPage").disabled = index === 0;
  $("#nextPage").innerHTML = index === CHAPTERS.length - 1 ? '<span>Завершить</span> <span aria-hidden="true">♡</span>' : '<span>Далее</span> <span aria-hidden="true">→</span>';
  $("#nextPage").setAttribute("aria-label", index === CHAPTERS.length - 1 ? "Завершить историю" : "Следующая страница");
  if (index === 4) {
    $$(".compliments li", paper).forEach((item, itemIndex) => {
      item.style.animationDelay = `${itemIndex * 420 + 180}ms`;
    });
  }
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
  openButton.addEventListener("click", () => {
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
  $("#previousPage").addEventListener("click", () => turnPage(-1));
  $("#nextPage").addEventListener("click", () => turnPage(1));
  $("#rereadButton").addEventListener("click", reread);
  const book = $("#book");
  book.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });
  book.addEventListener("touchend", (event) => {
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) turnPage(dx < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener("keydown", (event) => {
    if ($("#bookStage").hidden || event.target.matches("button, a")) return;
    if (event.key === "ArrowRight") turnPage(1);
    if (event.key === "ArrowLeft") turnPage(-1);
  });
}

document.addEventListener("DOMContentLoaded", init);
