(function () {
  // Page interactions that depend on loaded shared components.
  const galleryItems = {
    "campus-green": {
      title: "Campus Green",
      category: "Outdoor Learning",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=82",
      alt: "University campus building with open green spaces",
      summary: "Modern academic spaces surrounded by open lawns for informal study, movement and student gatherings.",
      details: "The Campus Green connects academic blocks with shaded paths, landscaped lawns and open gathering areas. It is designed as a daily commons where students can pause between classes, meet peers, host small activities and experience the campus as a connected learning environment.",
      highlights: ["Open lawns for student interaction", "Direct access to academic buildings", "Comfortable outdoor study and waiting areas"]
    },
    "research-labs": {
      title: "Research Labs",
      category: "Research & Innovation",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=82",
      alt: "Students working in a laboratory",
      summary: "Hands-on learning spaces with contemporary equipment, collaborative benches and guided research support.",
      details: "The research laboratories support practical learning, faculty-led projects and student experimentation. These spaces help learners move from classroom concepts to applied methods through supervised lab work, demonstrations and collaborative research activities.",
      highlights: ["Practical sessions guided by faculty", "Shared project and experiment zones", "Support for interdisciplinary research work"]
    },
    "central-library": {
      title: "Central Library",
      category: "Academic Resources",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=82",
      alt: "Library reading room with bookshelves",
      summary: "Quiet study zones, journals, books and digital collections for focused academic work.",
      details: "The Central Library serves as a study and reference hub for the university community. It brings together print collections, reading spaces and digital academic resources so students and faculty can work deeply, prepare coursework and support research.",
      highlights: ["Quiet reading and reference spaces", "Print and digital learning resources", "Support for coursework and research preparation"]
    },
    "convocation": {
      title: "Convocation",
      category: "University Life",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=82",
      alt: "Students celebrating graduation",
      summary: "A milestone ceremony celebrating graduates, families, faculty and the university community.",
      details: "Convocation marks the completion of an academic journey and celebrates the achievements of graduating students. The event brings together families, teachers, administrators and alumni to recognize academic effort and welcome graduates into a wider community of service and leadership.",
      highlights: ["Formal recognition of graduating students", "A shared celebration with families and faculty", "Connection to alumni and university traditions"]
    }
  };

  function closeDropdowns(exceptItem) {
    document.querySelectorAll(".nav-item.is-open").forEach((item) => {
      if (item === exceptItem) return;
      item.classList.remove("is-open");
      item.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
    });
  }

  function initDropdowns() {
    document.querySelectorAll(".nav-trigger").forEach((trigger) => {
      trigger.setAttribute("aria-haspopup", "true");
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const item = trigger.closest(".nav-item");
        if (!item) return;
        const isOpen = !item.classList.contains("is-open");
        closeDropdowns(item);
        item.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".nav-item")) {
        closeDropdowns();
      }
    });
  }

  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#primary-navigation");
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close main navigation" : "Open main navigation");
      if (!isOpen) closeDropdowns();
    }

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      } else if (event.key === "Escape") {
        closeDropdowns();
      }
    });
  }

  function initStickyNav() {
    const nav = document.querySelector("#primary-navigation");
    if (!nav) return;

    const desktopQuery = window.matchMedia("(min-width: 1101px)");
    const spacer = document.createElement("div");
    spacer.className = "nav-spacer";
    spacer.setAttribute("aria-hidden", "true");
    nav.insertAdjacentElement("afterend", spacer);

    let navTop = 0;

    function measure() {
      nav.classList.remove("is-stuck");
      spacer.classList.remove("is-active");
      spacer.style.height = "0px";
      navTop = nav.getBoundingClientRect().top + window.scrollY;
      spacer.style.height = `${nav.offsetHeight}px`;
    }

    function sync() {
      if (!desktopQuery.matches) {
        nav.classList.remove("is-stuck");
        spacer.classList.remove("is-active");
        return;
      }

      const shouldStick = window.scrollY >= navTop;
      nav.classList.toggle("is-stuck", shouldStick);
      spacer.classList.toggle("is-active", shouldStick);
    }

    measure();
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      sync();
    });
    desktopQuery.addEventListener?.("change", () => {
      measure();
      sync();
    });
  }

  function initStickyMenuToggle() {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;

    const mobileQuery = window.matchMedia("(max-width: 1100px)");
    let toggleTop = 0;

    function measure() {
      toggle.classList.remove("is-stuck");
      toggleTop = toggle.getBoundingClientRect().top + window.scrollY;
    }

    function sync() {
      if (!mobileQuery.matches) {
        toggle.classList.remove("is-stuck");
        return;
      }

      toggle.classList.toggle("is-stuck", window.scrollY >= toggleTop);
    }

    measure();
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      sync();
    });
    mobileQuery.addEventListener?.("change", () => {
      measure();
      sync();
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

  function initBackToTop() {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;

    function syncVisibility() {
      button.classList.toggle("is-visible", window.scrollY > 320);
    }

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", syncVisibility, { passive: true });
    syncVisibility();
  }

  function initCampusDirections() {
    const buttons = document.querySelectorAll("[data-campus-directions]");
    if (!buttons.length) return;

    const destination = "Central University of South Bihar, Gaya, Bihar";
    const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;

    function directionsUrl(origin) {
      const originPart = origin ? `origin=${encodeURIComponent(origin)}&` : "";
      return `https://www.google.com/maps/dir/?api=1&${originPart}destination=${encodeURIComponent(destination)}&travelmode=driving`;
    }

    buttons.forEach((button) => {
      button.href = fallbackUrl;
      button.addEventListener("click", (event) => {
        if (!navigator.geolocation) {
          window.alert("Location is not available on this device. Google Maps will open so you can choose your starting location.");
          return;
        }

        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const origin = `${position.coords.latitude},${position.coords.longitude}`;
            window.open(directionsUrl(origin), "_blank", "noopener,noreferrer");
          },
          () => {
            window.alert("Please turn on location access, or choose your starting location manually in Google Maps.");
            window.open(fallbackUrl, "_blank", "noopener,noreferrer");
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });
    });
  }

  function initGallery() {
    const gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    const track = gallery.querySelector(".gallery-track");
    const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
    const dots = gallery.querySelector(".gallery-dots");
    const summary = document.querySelector("[data-gallery-summary]");
    const summaryCategory = summary?.querySelector("[data-gallery-summary-category]");
    const summaryTitle = summary?.querySelector("[data-gallery-summary-title]");
    const summaryText = summary?.querySelector("[data-gallery-summary-text]");
    const summaryLink = summary?.querySelector("[data-gallery-summary-link]");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

    function activate(index, shouldScroll = true) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.querySelectorAll("button").forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", String(dotIndex === activeIndex));
      });
      const activeItem = galleryItems[slides[activeIndex].dataset.galleryId];
      if (activeItem && summary) {
        summaryCategory.textContent = activeItem.category;
        summaryTitle.textContent = activeItem.title;
        summaryText.textContent = activeItem.summary;
        summaryLink.href = `pages/gallery-detail.html?id=${slides[activeIndex].dataset.galleryId}`;
      }
      if (shouldScroll) {
        slides[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
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
    activate(activeIndex, false);
  }

  function initGalleryDetailPage() {
    const page = document.querySelector("[data-gallery-detail-page]");
    if (!page) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "research-labs";
    const item = galleryItems[id] || galleryItems["research-labs"];
    const image = page.querySelector("[data-gallery-detail-image]");
    const title = page.querySelector("[data-gallery-detail-title]");
    const category = page.querySelector("[data-gallery-detail-category]");
    const summary = page.querySelector("[data-gallery-detail-summary]");
    const details = page.querySelector("[data-gallery-detail-text]");
    const highlights = page.querySelector("[data-gallery-detail-highlights]");

    document.title = `${item.title} | Gallery | Central University of South Bihar`;
    image.src = item.image;
    image.alt = item.alt;
    title.textContent = item.title;
    category.textContent = item.category;
    summary.textContent = item.summary;
    details.textContent = item.details;
    highlights.innerHTML = "";
    item.highlights.forEach((highlight) => {
      const li = document.createElement("li");
      li.textContent = highlight;
      highlights.appendChild(li);
    });
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
    initDropdowns();
    initStickyNav();
    initStickyMenuToggle();
    initScrollButtons();
    initBackToTop();
    initCampusDirections();
    initGallery();
    initGalleryDetailPage();
    initSearch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
