(function () {
  const storageKey = "cusb-theme";

  function applyTheme(theme) {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isDark = theme === "dark";
      button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      const label = button.querySelector("span");
      if (label) label.textContent = isDark ? "Dark Mode" : "Light Mode";
      const icon = button.querySelector("i");
      if (icon) icon.setAttribute("data-lucide", isDark ? "moon" : "sun");
    });
    if (window.lucide) window.lucide.createIcons();
  }

  window.initTheme = function initTheme() {
    const savedTheme = localStorage.getItem(storageKey) || "light";
    applyTheme(savedTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
        localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
      });
    });
  };
})();
