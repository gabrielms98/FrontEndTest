/**
 * Events list
 *
 * uploadFile: upload file
 * getUploadedFiles: get uploaded files
 * fileUploaded: file uploaded
 * uploadedFiles: uploaded files
 */

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
        document.body.dispatchEvent(
          new CustomEvent("showToast", {
            detail: {
              message: "File is empty",
              type: "danger",
            },
          }),
        );
        return;
      }

      if (file.size > 1_000_000) {
        document.body.dispatchEvent(
          new CustomEvent("showToast", {
            detail: {
              message: "File size is too big",
              type: "success",
            },
          }),
        );
        return;
      }

      if (file.type && !this.ALLOWED_FILE_TYPES.includes(file.type)) {
        document.body.dispatchEvent(
          new CustomEvent("showToast", {
            detail: {
              message: "File type is not allowed",
              type: "danger",
            },
          }),
        );
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

      document.body.dispatchEvent(new CustomEvent("getUploadedFiles"));
    }, 1000);
  }

  /**
   * Handle the get uploaded files request
   */
  async getUploadedFiles(evens$) {
    const { detail: filters } = evens$;

    const files = await this.fetchUploadedFiles(filters);

    document.body.dispatchEvent(
      new CustomEvent("uploadedFiles", {
        detail: files,
      }),
    );
  }

  /**
   * Fetch the uploaded files (idealy this should be a request to the server)
   *
   * @param {Object} filters the filters to be applied
   *
   * @returns {File[]} the uploaded files
   */
  async fetchUploadedFiles(filters) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(
          this.files.filter((file) => {
            return (
              !filters ||
              (file && file.name.toLowerCase().includes(filters.toLowerCase()))
            );
          }),
        );
      }, 1000);
    });
  }

  connectedCallback() {
    this.files = [];

    document.body.addEventListener(
      "uploadFile",
      this.onUploadHandler.bind(this),
    );

    document.body.addEventListener(
      "getUploadedFiles",
      this.getUploadedFiles.bind(this),
    );
  }

  disconnectedCallback() {
    this.removeEventListener("uploadFile", this.onUploadHandler.bind(this));
  }
}
