export default class Home extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * This method is used to check if the component should be loaded or not
   *
   * @returns {boolean} true if the component should be loaded, false otherwise
   */
  shouldLoadComponent() {
    return !this.innerHTML;
  }

  connectedCallback() {
    this.loadChildComponents();
    if (this.shouldLoadComponent()) this.render();
  }

  /**
   * This method is used to render the component
   */
  render() {
    this.innerHTML = `
        <main class="home">
          <o-upload-file></o-upload-file>
          <o-list-files></o-list-files>
        </main>
      `;
  }

  /**
   * This method is used to load the child components
   */
  loadChildComponents() {
    Promise.all([
      import("../components/Upload.js").then((module) => [
        "o-upload-file",
        module.default,
      ]),
      import("../organismis/ListFiles.js").then((module) => [
        "o-list-files",
        module.default,
      ]),
    ]).then((components) => {
      components.forEach(([selector, component]) => {
        customElements.define(selector, component);
      });
    });
  }
}
