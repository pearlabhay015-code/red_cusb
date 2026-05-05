(function () {
  // Loads shared components so global changes propagate to every page.
  const isNestedPage = window.location.pathname.includes("/pages/");
  const basePath = isNestedPage ? "../" : "";

  function rewriteComponentLinks(root) {
    root.querySelectorAll("[href], [src]").forEach((node) => {
      const attr = node.hasAttribute("href") ? "href" : "src";
      const value = node.getAttribute(attr);
      if (!value || value.startsWith("#") || value.startsWith("http") || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("data:")) {
        return;
      }

      if (isNestedPage && !value.startsWith("../")) {
        node.setAttribute(attr, `../${value}`);
      }
    });
  }

  async function fetchComponent(name) {
    const response = await fetch(`${basePath}components/${name}.html`);
    if (!response.ok) {
      throw new Error(`Unable to load ${name} component`);
    }

    return response.text();
  }

  async function loadComponent(name) {
    const mount = document.querySelector(`[data-component="${name}"]`);
    if (!mount) return;

    mount.innerHTML = await fetchComponent(name);
    rewriteComponentLinks(mount);
  }

  async function loadQuickLinks() {
    if (document.querySelector(".quick-strip")) return;

    const html = await fetchComponent("quick-links");
    const mount = document.querySelector('[data-component="quick-links"]');
    if (mount) {
      mount.innerHTML = html;
      rewriteComponentLinks(mount);
      return;
    }

    const main = document.querySelector("#main-content");
    const hero = main?.querySelector(".hero, .page-hero");
    if (!main || !hero) return;

    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const quickLinks = template.content.firstElementChild;
    if (!quickLinks) return;

    hero.insertAdjacentElement("afterend", quickLinks);
    rewriteComponentLinks(quickLinks);
  }

  window.loadSharedComponents = async function loadSharedComponents() {
    await Promise.all([loadComponent("header"), loadComponent("footer"), loadQuickLinks()]);
    document.dispatchEvent(new CustomEvent("components:loaded"));
  };
})();
