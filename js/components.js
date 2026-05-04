(function () {
  // Loads shared header and footer so global changes propagate to every page.
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

  async function loadComponent(name) {
    const mount = document.querySelector(`[data-component="${name}"]`);
    if (!mount) return;

    const response = await fetch(`${basePath}components/${name}.html`);
    if (!response.ok) {
      throw new Error(`Unable to load ${name} component`);
    }

    mount.innerHTML = await response.text();
    rewriteComponentLinks(mount);
  }

  window.loadSharedComponents = async function loadSharedComponents() {
    await Promise.all([loadComponent("header"), loadComponent("footer")]);
    document.dispatchEvent(new CustomEvent("components:loaded"));
  };
})();
