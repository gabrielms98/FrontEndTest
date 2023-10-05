export default class ListFiles extends HTMLElement {
  constructor() {
    super();
    this.files = [];
  }

  listUploadedFiles(event) {
    const { detail: files } = event;

    this.files = files;

    this.appendFilesList();
  }

  render() {
    this.innerHTML = `
        <section class="list">
          <div class="list__header">
            <h3>Uploaded files</h3>
            <o-search-input></o-search-input> 
          </div>
          <div class="list__files"> </div>
        </section>
      `;

    this.appendFilesList();
  }

  appendFilesList() {
    const list = this.querySelector(".list__files");
    list.innerHTML = "";

    this.loadChildComponents().then((component) => {
      const [componentInstance] = component;

      if (!this.files.length)
        list.innerHTML = "There is no files uploaded yet...";
      else {
        const [, UploadedItem] = componentInstance;

        for (const file of this.files) {
          const item = new UploadedItem(file);
          list.appendChild(item);
        }
      }
    });
  }

  async loadChildComponents() {
    return Promise.all([
      import("../components/UplodedFileItem.js").then((module) => [
        "c-uploded-item",
        module.default,
      ]),
      import("../components/Search.js").then((module) => [
        "o-search-input",
        module.default,
      ]),
    ]).then((components) => {
      components.forEach(([name, component]) => {
        if (!customElements.get(name)) customElements.define(name, component);
      });

      return components;
    });
  }

  connectedCallback() {
    document.body.addEventListener(
      "uploadedFiles",
      this.listUploadedFiles.bind(this),
    );

    document.body.dispatchEvent(new CustomEvent("getUploadedFiles"));

    if (this.shouldLoadComponent()) {
      this.render();
      this.loadChildComponents();
    }
  }

  shouldLoadComponent() {
    return !this.innerHTML;
  }
}
