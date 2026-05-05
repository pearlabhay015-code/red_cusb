(function () {
  // Accessibility controls: font scaling, speech, dyslexia mode and help dialog.
  const fontStorageKey = "cusb-font-scale";
  const dyslexiaStorageKey = "cusb-dyslexia";
  let speechUtterance = null;
  let speechStartButtons = [];
  let speechStopButtons = [];

  function setFontScale(scale) {
    const nextScale = Math.min(1.2, Math.max(.9, scale));
    document.documentElement.style.setProperty("--font-scale", String(nextScale));
    localStorage.setItem(fontStorageKey, String(nextScale));
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
    if (!widget || !toggle || !panel) return;

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      widget.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    toggle.addEventListener("click", () => {
      setOpen(panel.hidden);
    });

    document.addEventListener("click", (event) => {
      if (!widget.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  window.initAccessibility = function initAccessibility() {
    setFontScale(Number(localStorage.getItem(fontStorageKey)) || 1);
    document.body.classList.toggle("dyslexia-mode", localStorage.getItem(dyslexiaStorageKey) === "true");

    document.querySelectorAll("[data-font]").forEach((button) => {
      button.addEventListener("click", () => {
        const current = Number(getComputedStyle(document.documentElement).getPropertyValue("--font-scale")) || 1;
        const action = button.dataset.font;
        if (action === "increase") setFontScale(current + .05);
        if (action === "decrease") setFontScale(current - .05);
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

    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.addEventListener("change", () => {
        document.documentElement.lang = select.value;
      });
    });

    initDialog();
    initAccessibilityPanel();
  };
})();
