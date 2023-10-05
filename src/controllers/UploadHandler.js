export default class UploadHandler extends HTMLElement {
  ALLOWED_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg",
    "application/pdf",
  ];

  constructor() {
    super();
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
    }

    // mock upload file
    setTimeout(() => {
      document.body.dispatchEvent(
        new CustomEvent("fileUploaded", {
          detail: files,
        }),
      );
    }, 1000);
  }

  connectedCallback() {
    this.files = [];
    document.body.addEventListener("uploadFile", this.onUploadHandler);
  }

  disconnectedCallback() {
    this.removeEventListener("uploadFile", this.onUploadHandler);
  }
}
