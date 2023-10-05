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
    if (this.shouldLoadComponent()) this.render();

    this.querySelector("#file-uploader").addEventListener(
      "change",
      this.onFileUpload,
    );
  }

  /**
   * This method is used to handle the file upload event
   *
   * @param {Event} event the event object
   */
  onFileUpload(event$) {
    document.body.dispatchEvent(
      new CustomEvent("uploadFile", {
        detail: event$.target.files,
      }),
    );
  }

  /**
   * This method is used to render the component
   */
  render() {
    this.innerHTML = `
        <main class="home">
          <section>
            <h3>Load file</h3>

            <div class="home__file">
              <label class="home__file__label" for="file-uploader">
                <div class="home__file__label__images">
                  <img src="https://img.icons8.com/ios/50/000000/upload.png" />
                  <img src="https://img.icons8.com/ios/50/000000/upload.png" />
                  <img src="https://img.icons8.com/ios/50/000000/upload.png" />
                  <img src="https://img.icons8.com/ios/50/000000/upload.png" />
                </div>
                <span> Drag and drop or click to select files to upload.</span>
              </label>
              <input type="file" id="file-uploader" name="file" />
            </div>
          </section>
        </main>
      `;
  }
}
