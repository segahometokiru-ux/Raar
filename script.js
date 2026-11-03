/* Personalize the letter, gallery captions and timeline here. No server or personal data collection is used. */
const LETTER_PARAGRAPHS = [
  "Я хочу сказать тебе самые важные слова — спасибо, что ты есть. Рядом с тобой в моём сердце становится больше тепла, нежности и света.",
  "Я дорожу каждым моментом, который мы разделяем, и всем тем, что ещё ждёт нас впереди. Пусть в нашей истории всегда будет место заботе, смеху и маленьким радостям.",
  "Я выбираю тебя — сегодня и каждый новый день. Пусть это письмо напоминает: ты очень любима."
];
const LETTER_SIGNATURE = "С любовью, всегда — твой человек";

// Замените подписи на ваши. Сами снимки: images/photo1.jpg … images/photo10.jpg.
const GALLERY_ITEMS = [
  { src: "images/photo1.jpg", caption: "Один из наших любимых моментов", alt: "Фотография 1 — замените на ваше фото" },
  { src: "images/photo2.jpg", caption: "Маленькое счастье быть рядом", alt: "Фотография 2 — замените на ваше фото" },
  { src: "images/photo3.jpg", caption: "Момент, который хочется сохранить", alt: "Фотография 3 — замените на ваше фото" },
  { src: "images/photo4.jpg", caption: "Тёплое воспоминание о нас", alt: "Фотография 4 — замените на ваше фото" },
  { src: "images/photo5.jpg", caption: "Ещё одна глава нашей истории", alt: "Фотография 5 — замените на ваше фото" },
  { src: "images/photo6.jpg", caption: "Счастье в простых мгновениях", alt: "Фотография 6 — замените на ваше фото" },
  { src: "images/photo7.jpg", caption: "Наш мир, такой особенный", alt: "Фотография 7 — замените на ваше фото" },
  { src: "images/photo8.jpg", caption: "Хочу помнить это всегда", alt: "Фотография 8 — замените на ваше фото" },
  { src: "images/photo9.jpg", caption: "Мгновение только для нас", alt: "Фотография 9 — замените на ваше фото" },
  { src: "images/photo10.jpg", caption: "И ещё одно любимое воспоминание", alt: "Фотография 10 — замените на ваше фото" }
];

// Заполните только вашими датами и воспоминаниями. Пустые поля не показываются.
const STORY_ITEMS = [
  { date: "", title: "", memory: "" },
  { date: "", title: "", memory: "" },
  { date: "", title: "", memory: "" }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let toastTimer;
let activePhotoIndex = 0;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function renderLetter() {
  const container = $("#letterCopy");
  LETTER_PARAGRAPHS.forEach((text, index) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    paragraph.style.animationDelay = `${index * 180}ms`;
    container.appendChild(paragraph);
  });
  $("#letterSignature").textContent = LETTER_SIGNATURE;
}

function renderGallery() {
  const grid = $("#galleryGrid");
  GALLERY_ITEMS.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-card";
    const button = document.createElement("button");
    button.className = "photo-button";
    button.type = "button";
    button.setAttribute("aria-label", `Открыть фото ${index + 1}: ${photo.caption}`);
    const placeholder = document.createElement("span");
    placeholder.className = "photo-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    const placeholderHeart = document.createElement("span");
    placeholderHeart.textContent = "♡";
    placeholder.append(placeholderHeart);
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = "lazy";
    image.addEventListener("load", () => image.classList.add("loaded"), { once: true });
    image.addEventListener("error", () => image.remove(), { once: true });
    button.append(image, placeholder);
    button.addEventListener("click", () => openLightbox(index));
    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;
    figure.append(button, caption);
    grid.append(figure);
  });
}

function renderTimeline() {
  const timeline = $("#timeline");
  const entries = STORY_ITEMS.filter((item) => item.date.trim() || item.title.trim() || item.memory.trim());
  if (!entries.length) {
    const note = document.createElement("article");
    note.className = "timeline-item";
    const title = document.createElement("h3");
    title.textContent = "Эта глава ждёт ваших слов";
    const memory = document.createElement("p");
    memory.textContent = "Добавьте даты, события и ваши воспоминания в массив STORY_ITEMS в файле script.js — здесь появится ваша личная временная линия.";
    note.append(title, memory);
    timeline.append(note);
    return;
  }
  entries.forEach((item) => {
    const card = document.createElement("article");
    card.className = "timeline-item";
    if (item.date.trim()) {
      const date = document.createElement("span");
      date.className = "timeline-date";
      date.textContent = item.date;
      card.append(date);
    }
    if (item.title.trim()) {
      const title = document.createElement("h3");
      title.textContent = item.title;
      card.append(title);
    }
    if (item.memory.trim()) {
      const memory = document.createElement("p");
      memory.textContent = item.memory;
      card.append(memory);
    }
    timeline.append(card);
  });
}

function openLightbox(index) {
  activePhotoIndex = index;
  updateLightbox();
  const dialog = $("#lightbox");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  document.body.classList.add("no-scroll");
}

function updateLightbox() {
  const photo = GALLERY_ITEMS[activePhotoIndex];
  const image = $("#lightboxImage");
  image.src = photo.src;
  image.alt = photo.alt;
  image.onerror = () => { image.removeAttribute("src"); };
  $("#lightboxCaption").textContent = photo.caption;
}

function closeLightbox() {
  const dialog = $("#lightbox");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  document.body.classList.remove("no-scroll");
}

function changePhoto(direction) {
  activePhotoIndex = (activePhotoIndex + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightbox();
}

function initStars() {
  const field = $("#stars");
  const count = window.matchMedia("(max-width: 600px)").matches ? 35 : 65;
  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.setAttribute("aria-hidden", "true");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
    star.style.opacity = `${(0.25 + Math.random() * 0.7).toFixed(2)}`;
    field.append(star);
  }
}

function initTelegram() {
  const app = window.Telegram?.WebApp;
  if (!app) return;
  try {
    app.ready();
    app.expand();
    app.setHeaderColor?.("#100b1b");
    app.setBackgroundColor?.("#100b1b");
    app.setBottomBarColor?.("#100b1b");
    // Пользовательские данные Telegram не запрашиваются и не отправляются.
  } catch (error) {
    console.info("Telegram WebApp display setup was unavailable.", error);
  }
}

function init() {
  initStars();
  renderLetter();
  renderGallery();
  renderTimeline();
  initTelegram();

  const cover = $("#cover");
  const site = $("#site");
  const envelopeButton = $("#openEnvelope");
  envelopeButton.addEventListener("click", () => {
    if (envelopeButton.classList.contains("opened")) return;
    envelopeButton.classList.add("opened");
    envelopeButton.setAttribute("aria-expanded", "true");
    window.setTimeout(() => {
      site.hidden = false;
      cover.classList.add("dismissed");
      document.body.classList.remove("no-scroll");
      window.setTimeout(() => {
        cover.hidden = true;
        $("#letter").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 850);
    }, 850);
  });
  document.body.classList.add("no-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((section) => observer.observe(section));

  const music = $("#backgroundMusic");
  const musicButton = $("#musicToggle");
  musicButton.addEventListener("click", async () => {
    if (!music.paused) {
      music.pause();
      musicButton.setAttribute("aria-pressed", "false");
      musicButton.setAttribute("aria-label", "Включить музыку");
      showToast("Музыка выключена");
      return;
    }
    try {
      await music.play();
      musicButton.setAttribute("aria-pressed", "true");
      musicButton.setAttribute("aria-label", "Выключить музыку");
      showToast("Музыка включена ♫");
    } catch (error) {
      showToast("Добавьте свою композицию: audio/our-song.mp3");
    }
  });

  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxPrev").addEventListener("click", () => changePhoto(-1));
  $("#lightboxNext").addEventListener("click", () => changePhoto(1));
  $("#lightbox").addEventListener("click", (event) => {
    if (event.target === $("#lightbox")) closeLightbox();
  });
  $("#lightbox").addEventListener("close", () => document.body.classList.remove("no-scroll"));
  document.addEventListener("keydown", (event) => {
    if (!$("#lightbox").open) return;
    if (event.key === "ArrowLeft") changePhoto(-1);
    if (event.key === "ArrowRight") changePhoto(1);
    if (event.key === "Escape") document.body.classList.remove("no-scroll");
  });
}

document.addEventListener("DOMContentLoaded", init);
