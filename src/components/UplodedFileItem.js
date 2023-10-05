export default class UplodedFileItem extends HTMLElement {
  constructor(file = undefined) {
    super();
    this.file = file;
  }

  render(file = this.file) {
    if (!file) return;

    this.innerHTML = `
        <div class="uploadedFile"> 
          <img 
            src="https://img.icons8.com/?size=50&id=11651"
            alt="${file.name}" 
          />
          <div class="uploadedFile__content text-truncate">
            <span class="uploadedFile__content__name ">${file.name}</span>
            <span class="uploadedFile__content__type">${file.type}</span>
          </div>
        </div>
      `;
  }

  loadChildComponents() {}

  /**
   * This method is used to check if the component should be loaded or not
   *
   * @returns {boolean} true if the component should be loaded, false otherwise
   */
  shouldLoadComponent() {
    return !this.innerHTML;
  }

  connectedCallback() {
    if (this.shouldLoadComponent()) this.render();
  }
}
