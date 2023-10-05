export default class Upload extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
          <section class="upload">
            <h3>Load file</h3>

            <div class="upload__file">
              <label class="upload__file__label" for="file-uploader">
                <div class="upload__file__label__images">
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
        `;
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

    this.querySelector("#file-uploader").addEventListener("change", (event$) =>
      this.onFileUpload(event$.target.files),
    );

    this.querySelector(".upload__file__label").addEventListener(
      "dragover",
      (event$) => {
        event$.preventDefault();
      },
    );

    this.querySelector(".upload__file__label").addEventListener(
      "drop",
      (event$) => {
        event$.preventDefault();

        this.onFileUpload(event$.dataTransfer.files);
      },
    );
  }

  /**
   * This method is used to handle the file upload event
   *
   * @param {Event} event the event object
   */
  onFileUpload(files) {
    document.body.dispatchEvent(
      new CustomEvent("uploadFile", {
        detail: files,
      }),
    );
  }
}
