export default class UploadHandler extends HTMLElement {
  constructor() {
    super();

    this.ALLOWED_FILE_TYPES = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg",
      "application/pdf",
    ];
  }

  /**
   * Handle the upload files request
   *
   * @param {File[]} file the file to be uploaded
   */
  onUploadHandler(event) {
    const { detail: files } = event;
    for (const file of files) {
      if (!file.size) {
        console.log("file is empty");
        return;
      }

      if (file.size > 1000000) {
        console.log("file size is too big");
        return;
      }

      if (file.type && !this.ALLOWED_FILE_TYPES.includes(file.type)) {
        console.log("file type is not allowed");
        return;
      }

      this.files.push(file);
    }

    // mock upload file
    setTimeout(() => {
      document.body.dispatchEvent(
        new CustomEvent("showToast", {
          detail: {
            message: "File uploaded successfully",
            type: "success",
          },
        }),
      );

      document.body.dispatchEvent(
        new CustomEvent("fileUploaded", {
          detail: this.files,
        }),
      );
    }, 1000);
  }

  connectedCallback() {
    this.files = [];
    document.body.addEventListener(
      "uploadFile",
      this.onUploadHandler.bind(this),
    );
  }

  disconnectedCallback() {
    this.removeEventListener("uploadFile", this.onUploadHandler.bind(this));
  }
}
