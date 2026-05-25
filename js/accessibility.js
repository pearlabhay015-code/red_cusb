(function () {
  // Accessibility controls: font scaling, speech, dyslexia mode and help dialog.
  const fontStorageKey = "cusb-font-scale";
  const dyslexiaStorageKey = "cusb-dyslexia";
  const languageStorageKey = "cusb-language";
  const translateLanguages = "en,hi,bn,gu,kn,ml,mr,pa,ta,te,ur";
  let speechUtterance = null;
  let speechStartButtons = [];
  let speechStopButtons = [];
  let translateLoaded = false;

  function setFontScale(scale) {
    // Font size range: 16px (scale 1.0) to 50px (scale 3.125)
    // 16px base = 100%, 50px = 312.5%
    const minScale = 1;
    const maxScale = 3.125;
    const nextScale = Math.min(maxScale, Math.max(minScale, scale));
    const percentage = Math.round((nextScale - 1) * 100 + 100);
    
    document.documentElement.style.setProperty("--font-scale", String(nextScale));
    localStorage.setItem(fontStorageKey, String(nextScale));
    
    // Update font size display
    const display = document.querySelector("[data-font-display]");
    if (display) {
      display.textContent = `${percentage}%`;
    }
  }

  function pageText() {
    const main = document.querySelector("main");
    return main ? main.innerText.replace(/\s+/g, " ").trim() : document.body.innerText;
  }

  function setSpeechActive(isActive) {
    speechStartButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(isActive));
      button.disabled = isActive;
    });
    speechStopButtons.forEach((button) => {
      button.disabled = !isActive;
    });
  }

  function startSpeech(button) {
    if (!("speechSynthesis" in window)) {
      const label = button.querySelector("span");
      if (label) label.textContent = "Speech unavailable";
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    speechUtterance = new SpeechSynthesisUtterance(pageText());
    speechUtterance.rate = .95;
    speechUtterance.onend = () => setSpeechActive(false);
    speechUtterance.onerror = () => setSpeechActive(false);
    setSpeechActive(true);
    window.speechSynthesis.speak(speechUtterance);
  }

  function stopSpeech() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeechActive(false);
  }

  function initDialog() {
    const dialog = document.querySelector("[data-keyboard-dialog]");
    const openButton = document.querySelector("[data-keyboard-help]");
    const closeButton = document.querySelector("[data-dialog-close]");
    if (!dialog || !openButton || !closeButton) return;

    openButton.addEventListener("click", () => dialog.showModal());
    closeButton.addEventListener("click", () => dialog.close());
  }

  function initAccessibilityPanel() {
    const widget = document.querySelector(".accessibility-widget");
    const toggle = document.querySelector("[data-accessibility-toggle]");
    const panel = document.querySelector("[data-accessibility-panel]");
    const closeButton = document.querySelector(".accessibility-panel-close");
    if (!widget || !toggle || !panel) return;

    function setOpen(isOpen) {
      if (isOpen) {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        closeButton?.focus();
      } else {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    }

    toggle.addEventListener("click", () => {
      setOpen(panel.hidden);
    });

    closeButton?.addEventListener("click", () => {
      setOpen(false);
    });

    // Close when clicking outside the widget
    document.addEventListener("click", (event) => {
      if (!widget.contains(event.target)) {
        setOpen(false);
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        setOpen(false);
      }
    });
  }

  function setCookie(name, value) {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge}`;
    if (window.location.hostname.includes(".")) {
      document.cookie = `${name}=${value};path=/;domain=${window.location.hostname};max-age=${maxAge}`;
    }
  }

  function loadTranslate() {
    if (translateLoaded || window.google?.translate?.TranslateElement) return;
    translateLoaded = true;
    window.googleTranslateElementInit = function googleTranslateElementInit() {
      new window.google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: translateLanguages,
        autoDisplay: false
      }, "google_translate_element");
    };

    const mount = document.createElement("div");
    mount.id = "google_translate_element";
    mount.setAttribute("aria-hidden", "true");
    document.body.appendChild(mount);

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }

  function syncTranslateBanner() {
    const banner = document.querySelector(".goog-te-banner-frame, iframe.skiptranslate");
    const isVisible = Boolean(banner && banner.offsetParent !== null && banner.offsetHeight > 0);
    const bannerHeight = isVisible ? banner.offsetHeight : 0;
    const isTranslated = document.documentElement.classList.contains("translated-ltr") || document.documentElement.classList.contains("translated-rtl");
    document.body.classList.toggle("has-translate-banner", isVisible);
    document.documentElement.style.setProperty("--translate-banner-offset", `${bannerHeight + 8}px`);

    const combo = document.querySelector(".goog-te-combo");
    if (combo && (!combo.value || !isTranslated) && localStorage.getItem(languageStorageKey) !== "en") {
      localStorage.setItem(languageStorageKey, "en");
      document.documentElement.lang = "en";
      document.querySelectorAll("[data-language-select]").forEach((select) => {
        select.value = "en";
      });
    }
  }

  function initTranslateBannerWatcher() {
    syncTranslateBanner();
    const observer = new MutationObserver(syncTranslateBanner);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });
    window.addEventListener("resize", syncTranslateBanner);
  }

  function applyLanguage(language) {
    const nextLanguage = language || "en";
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(languageStorageKey, nextLanguage);

    if (nextLanguage === "en") {
      setCookie("googtrans", "/en/en");
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = "";
        combo.dispatchEvent(new Event("change"));
      }
      window.setTimeout(syncTranslateBanner, 300);
      return;
    } else {
      setCookie("googtrans", `/en/${nextLanguage}`);
      loadTranslate();
    }

    const combo = document.querySelector(".goog-te-combo");
    if (combo && combo.value !== nextLanguage) {
      combo.value = nextLanguage;
      combo.dispatchEvent(new Event("change"));
      window.setTimeout(syncTranslateBanner, 300);
    } else if (!combo && nextLanguage !== "en") {
      window.setTimeout(() => applyLanguage(nextLanguage), 500);
    }
  }

  window.initAccessibility = function initAccessibility() {
    setFontScale(Number(localStorage.getItem(fontStorageKey)) || 1);
    document.body.classList.toggle("dyslexia-mode", localStorage.getItem(dyslexiaStorageKey) === "true");

    document.querySelectorAll("[data-font]").forEach((button) => {
      button.addEventListener("click", () => {
        const current = Number(getComputedStyle(document.documentElement).getPropertyValue("--font-scale")) || 1;
        const action = button.dataset.font;
        const increment = 0.125; // Step from 16px to 50px
        if (action === "increase") setFontScale(current + increment);
        if (action === "decrease") setFontScale(current - increment);
        if (action === "reset") setFontScale(1);
      });
    });

    speechStartButtons = Array.from(document.querySelectorAll("[data-speech-start], [data-speech-toggle]"));
    speechStopButtons = Array.from(document.querySelectorAll("[data-speech-stop]"));

    speechStartButtons.forEach((button) => {
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => startSpeech(button));
    });

    speechStopButtons.forEach((button) => {
      button.addEventListener("click", stopSpeech);
    });

    document.querySelectorAll("[data-dyslexia-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(document.body.classList.contains("dyslexia-mode")));
      button.addEventListener("click", () => {
        const enabled = !document.body.classList.contains("dyslexia-mode");
        document.body.classList.toggle("dyslexia-mode", enabled);
        localStorage.setItem(dyslexiaStorageKey, String(enabled));
        button.setAttribute("aria-pressed", String(enabled));
      });
    });

    const savedLanguage = localStorage.getItem(languageStorageKey) || "en";
    document.documentElement.lang = savedLanguage;

    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.value = savedLanguage;
      select.addEventListener("change", () => {
        applyLanguage(select.value);
      });
    });

    if (savedLanguage !== "en") applyLanguage(savedLanguage);

    initTranslateBannerWatcher();
    initDialog();
    initAccessibilityPanel();
  };
})();
