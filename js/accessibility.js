(function () {
  // Accessibility controls: font scaling, speech, dyslexia mode and help dialog.
  const fontStorageKey = "cusb-font-scale";
  const dyslexiaStorageKey = "cusb-dyslexia";
  let speechUtterance = null;

  function setFontScale(scale) {
    const nextScale = Math.min(1.2, Math.max(.9, scale));
    document.documentElement.style.setProperty("--font-scale", String(nextScale));
    localStorage.setItem(fontStorageKey, String(nextScale));
  }

  function pageText() {
    const main = document.querySelector("main");
    return main ? main.innerText.replace(/\s+/g, " ").trim() : document.body.innerText;
  }

  function toggleSpeech(button) {
    if (!("speechSynthesis" in window)) {
      button.textContent = "Speech unavailable";
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      button.setAttribute("aria-pressed", "false");
      return;
    }

    speechUtterance = new SpeechSynthesisUtterance(pageText());
    speechUtterance.rate = .95;
    speechUtterance.onend = () => button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-pressed", "true");
    window.speechSynthesis.speak(speechUtterance);
  }

  function initDialog() {
    const dialog = document.querySelector("[data-keyboard-dialog]");
    const openButton = document.querySelector("[data-keyboard-help]");
    const closeButton = document.querySelector("[data-dialog-close]");
    if (!dialog || !openButton || !closeButton) return;

    openButton.addEventListener("click", () => dialog.showModal());
    closeButton.addEventListener("click", () => dialog.close());
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

    document.querySelectorAll("[data-speech-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => toggleSpeech(button));
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
  };
})();
