(function () {
  // Page interactions that depend on loaded shared components.
  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#primary-navigation");
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close main navigation" : "Open main navigation");
    }

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function initScrollButtons() {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.scrollTarget);
        if (!target) return;
        target.scrollBy({
          left: Number(button.dataset.scrollDir || 1) * Math.round(target.clientWidth * .75),
          behavior: "smooth"
        });
      });
    });
  }

  function initGallery() {
    const gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    const track = gallery.querySelector(".gallery-track");
    const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
    const dots = gallery.querySelector(".gallery-dots");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

    function activate(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.querySelectorAll("button").forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", String(dotIndex === activeIndex));
      });
      slides[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show gallery image ${index + 1}`);
      dot.addEventListener("click", () => activate(index));
      dots.appendChild(dot);
      slide.addEventListener("click", () => activate(index));
    });

    gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => activate(activeIndex - 1));
    gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => activate(activeIndex + 1));
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") activate(activeIndex - 1);
      if (event.key === "ArrowRight") activate(activeIndex + 1);
    });
    activate(activeIndex);
  }

  function initSearch() {
    const search = document.querySelector(".site-search");
    if (!search) return;
    search.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = search.querySelector("input");
      if (input?.value.trim()) {
        window.alert(`Search is ready for backend integration: ${input.value.trim()}`);
      }
    });
  }

  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  async function boot() {
    if (window.loadSharedComponents) {
      await window.loadSharedComponents();
    }
    initIcons();
    if (window.initTheme) window.initTheme();
    if (window.initAccessibility) window.initAccessibility();
    initMenu();
    initScrollButtons();
    initGallery();
    initSearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
