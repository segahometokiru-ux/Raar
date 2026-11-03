document.addEventListener("DOMContentLoaded", () => {
  const starsField = document.querySelector(".stars");
  const envelopeButton = document.getElementById("openEnvelope");
  const loveLetter = document.getElementById("loveLetter");
  const floatingBack = document.getElementById("floatingBack");

  if (starsField) {
    const starCount = 44;

    for (let i = 0; i < starCount; i += 1) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      star.style.opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
      starsField.appendChild(star);
    }
  }

  if (envelopeButton) {
    envelopeButton.addEventListener("click", () => {
      envelopeButton.classList.toggle("opened");
      loveLetter.classList.toggle("visible");
      envelopeButton.setAttribute(
        "aria-label",
        envelopeButton.classList.contains("opened") ? "Закрыть письмо" : "Открыть письмо"
      );
    });
  }

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (floatingBack) {
    floatingBack.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const telegramApp = window.Telegram?.WebApp;

  if (telegramApp) {
    telegramApp.ready();
    telegramApp.expand();

    if (telegramApp.setHeaderColor) {
      telegramApp.setHeaderColor("#090611");
    }

    if (telegramApp.setBackgroundColor) {
      telegramApp.setBackgroundColor("#090611");
    }

    if (telegramApp.BackButton) {
      telegramApp.BackButton.show();
      telegramApp.BackButton.onClick(() => {
        const currentSection = document.querySelector("section:target") || document.getElementById("top");
        if (currentSection && currentSection !== document.getElementById("top")) {
          window.history.back();
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    if (telegramApp.MainButton) {
      telegramApp.MainButton.setText("Читать дальше");
      telegramApp.MainButton.show();
      telegramApp.MainButton.onClick(() => {
        const letterSection = document.getElementById("letter");
        if (letterSection) {
          letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }
});
