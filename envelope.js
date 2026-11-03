(() => {
  "use strict";

  function installEnvelopeFallback() {
    const button = document.getElementById("openEnvelope");
    const cover = document.getElementById("cover");
    const bookStage = document.getElementById("bookStage");
    if (!button || !cover || !bookStage) return;

    let opening = false;
    let revealTimer;

    function openEnvelope(event) {
      if (opening || event?.type === "pointercancel") return;
      opening = true;
      button.classList.add("opened");
      button.setAttribute("aria-expanded", "true");

      // Render the first page in case another startup error stopped the main init().
      const page = document.getElementById("pagePaper");
      if (page && !page.firstElementChild && typeof window.renderPage === "function") {
        try {
          window.renderPage(0);
        } catch (error) {
          console.error("Could not render the first story page.", error);
        }
      }

      revealTimer = window.setTimeout(() => {
        bookStage.hidden = false;
        cover.classList.add("dismissed");
        window.setTimeout(() => { cover.hidden = true; }, 850);
      }, 750);
    }

    // pointerup covers mouse, pen, and modern touch devices. touchend and click
    // remain as fallbacks; the opening guard prevents duplicate activation.
    if ("PointerEvent" in window) button.addEventListener("pointerup", openEnvelope);
    button.addEventListener("touchend", openEnvelope, { passive: true });
    button.addEventListener("click", openEnvelope);

    // Keep references reachable for debugging without exposing app internals.
    button.addEventListener("pointercancel", () => window.clearTimeout(revealTimer), { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installEnvelopeFallback, { once: true });
  } else {
    installEnvelopeFallback();
  }
})();
