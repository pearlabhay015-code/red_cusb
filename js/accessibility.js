(function () {
  // Accessibility controls: font scaling, speech, dyslexia mode and help dialog.
  const fontStorageKey = "cusb-font-scale";
  const dyslexiaStorageKey = "cusb-dyslexia";
  const languageStorageKey = "cusb-language";
  const translateReloadKey = "cusb-translate-reload";
  const translateLanguages = "en,hi,bn,gu,kn,ml,mr,pa,ta,te,ur";
  let speechUtterance = null;
  let speechStartButtons = [];
  let speechStopButtons = [];
  let translateLoaded = false;
  let pendingLanguage = null;
  let translateRetryTimer = 0;
  let previousBannerVisible = false;
  let wasTranslated = false;

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

  function clearCookie(name) {
    document.cookie = `${name}=;path=/;max-age=0`;
    if (window.location.hostname.includes(".")) {
      document.cookie = `${name}=;path=/;domain=${window.location.hostname};max-age=0`;
    }
  }

  function resetToEnglish() {
    // Reset language to English when translator is disabled
    window.clearTimeout(translateRetryTimer);
    sessionStorage.removeItem(translateReloadKey);
    clearCookie("googtrans");
    setCookie("googtrans", "/en/en");
    pendingLanguage = "en";
    localStorage.setItem(languageStorageKey, "en");
    document.documentElement.lang = "en";
    
    // Update language selector UI to show English without triggering applyLanguage
    document.querySelectorAll(".language-select").forEach((control) => {
      const select = control.querySelector("[data-language-select]");
      const current = control.querySelector("[data-language-current]");
      const button = control.querySelector("[data-language-button]");
      const menu = control.querySelector("[data-language-menu]");
      
      // Set the select value to English
      if (select) {
        select.value = "en";
      }
      
      // Update the display text
      if (current) {
        current.textContent = "English";
      }
      
      // Update aria-selected on all menu options  
      if (menu) {
        menu.querySelectorAll("[data-language-option]").forEach((optionButton) => {
          optionButton.setAttribute("aria-selected", String(optionButton.dataset.languageOption === "en"));
        });
      }
    });
    
    // Sync the banner after UI update
    window.setTimeout(syncTranslateBanner, 100);
  }

  function translateMount() {
    let mount = document.querySelector("#google_translate_element");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "google_translate_element";
      mount.setAttribute("aria-hidden", "true");
      document.body.appendChild(mount);
    }
    return mount;
  }

  function initTranslateElement() {
    const mount = translateMount();
    if (!mount.querySelector(".goog-te-gadget")) {
      new window.google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: translateLanguages,
        autoDisplay: false
      }, "google_translate_element");
    }
    if (pendingLanguage && pendingLanguage !== "en") {
      window.setTimeout(() => applyTranslateCombo(pendingLanguage), 250);
    }
  }

  function loadTranslate() {
    if (window.google?.translate?.TranslateElement) {
      initTranslateElement();
      return;
    }

    translateMount();
    if (translateLoaded) return;
    translateLoaded = true;
    window.googleTranslateElementInit = initTranslateElement;

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }

  function applyTranslateCombo(language, attempt = 0) {
    window.clearTimeout(translateRetryTimer);

    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      sessionStorage.removeItem(translateReloadKey);
      combo.value = language;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
      window.setTimeout(syncTranslateBanner, 300);
      return;
    }

    if (attempt >= 24) {
      if (language !== "en" && sessionStorage.getItem(translateReloadKey) !== language) {
        sessionStorage.setItem(translateReloadKey, language);
        window.location.reload();
      }
      return;
    }
    translateRetryTimer = window.setTimeout(() => {
      applyTranslateCombo(language, attempt + 1);
    }, 250);
  }

  function syncTranslateBanner() {
    if (document.activeElement?.matches("[data-language-select]")) return;

    const banner = document.querySelector(".goog-te-banner-frame, iframe.skiptranslate");
    const isVisible = Boolean(banner && banner.offsetParent !== null && banner.offsetHeight > 0);
    const bannerHeight = isVisible ? banner.offsetHeight : 0;
    const isTranslated = document.documentElement.classList.contains("translated-ltr") || document.documentElement.classList.contains("translated-rtl");
    document.body.classList.toggle("has-translate-banner", isVisible);
    document.documentElement.style.setProperty("--translate-banner-offset", `${bannerHeight + 8}px`);

    const combo = document.querySelector(".goog-te-combo");
    const savedLanguage = localStorage.getItem(languageStorageKey) || "en";
    if (combo && savedLanguage !== "en" && combo.value !== savedLanguage) combo.value = savedLanguage;

    // Detect when translator is disabled:
    // 1. Banner was visible but now hidden, OR
    // 2. Page was translated but is no longer translated
    const transitionedFromTranslated = wasTranslated && !isTranslated;
    const bannerDisappeared = previousBannerVisible && !isVisible;
    
    if ((bannerDisappeared || transitionedFromTranslated) && savedLanguage !== "en") {
      // Translator has been disabled, reset to English
      resetToEnglish();
    }
    
    previousBannerVisible = isVisible;
    wasTranslated = isTranslated;
  }

  function initTranslateBannerWatcher() {
    const banner = document.querySelector(".goog-te-banner-frame, iframe.skiptranslate");
    previousBannerVisible = Boolean(banner && banner.offsetParent !== null && banner.offsetHeight > 0);
    wasTranslated = document.documentElement.classList.contains("translated-ltr") || document.documentElement.classList.contains("translated-rtl");
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
    pendingLanguage = nextLanguage;
    document.documentElement.lang = nextLanguage;
    localStorage.setItem(languageStorageKey, nextLanguage);

    if (nextLanguage === "en") {
      window.clearTimeout(translateRetryTimer);
      sessionStorage.removeItem(translateReloadKey);
      clearCookie("googtrans");
      setCookie("googtrans", "/en/en");
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = "";
        combo.dispatchEvent(new Event("change", { bubbles: true }));
      }
      window.setTimeout(syncTranslateBanner, 300);
      if (document.documentElement.classList.contains("translated-ltr") || document.documentElement.classList.contains("translated-rtl")) {
        window.setTimeout(() => window.location.reload(), 350);
      }
      return;
    } else {
      setCookie("googtrans", `/en/${nextLanguage}`);
      loadTranslate();
    }

    applyTranslateCombo(nextLanguage);
  }

  function initLanguageControls() {
    document.querySelectorAll(".language-select").forEach((control) => {
      const select = control.querySelector("[data-language-select]");
      const button = control.querySelector("[data-language-button]");
      const current = control.querySelector("[data-language-current]");
      const menu = control.querySelector("[data-language-menu]");
      if (!select || !button || !menu) return;

      const options = Array.from(select.options);

      function closeMenu() {
        control.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      }

      function openMenu() {
        control.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        menu.querySelector(`[data-language-option="${select.value}"]`)?.focus();
      }

      function syncVisibleLanguage() {
        const active = options.find((option) => option.value === select.value) || options[0];
        if (current && active) current.textContent = active.textContent;
        menu.querySelectorAll("[data-language-option]").forEach((optionButton) => {
          optionButton.setAttribute("aria-selected", String(optionButton.dataset.languageOption === select.value));
        });
      }

      if (!menu.children.length) {
        options.forEach((option) => {
          const optionButton = document.createElement("button");
          optionButton.type = "button";
          optionButton.dataset.languageOption = option.value;
          optionButton.setAttribute("role", "option");
          optionButton.textContent = option.textContent;
          optionButton.addEventListener("click", () => {
            select.value = option.value;
            syncVisibleLanguage();
            select.dispatchEvent(new Event("change", { bubbles: true }));
            closeMenu();
            button.focus({ preventScroll: true });
          });
          menu.appendChild(optionButton);
        });
      }

      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (control.classList.contains("is-open")) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      control.addEventListener("click", (event) => {
        if (button.contains(event.target) || menu.contains(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        if (control.classList.contains("is-open")) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      menu.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      control.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
          button.focus({ preventScroll: true });
        }
      });

      document.addEventListener("click", (event) => {
        if (!control.contains(event.target)) closeMenu();
      });

      select.addEventListener("change", syncVisibleLanguage);
      syncVisibleLanguage();
    });
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
    initLanguageControls();

    if (savedLanguage !== "en") applyLanguage(savedLanguage);

    initTranslateBannerWatcher();
    initDialog();
    initAccessibilityPanel();
  };
})();
