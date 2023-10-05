import debouncer from "../utils/debouncer.js";

export default class Search extends HTMLElement {
  constructor() {
    super();

    this.debounce = debouncer((value) => {
      document.body.dispatchEvent(
        new CustomEvent("getUploadedFiles", { detail: value }),
      );
    }, 300);
  }

  /**
   * Handle the search input event
   *
   * @param {CustomEvent} event$ the event
   */
  onSearchInput(event$) {
    const { detail: value } = event$;

    if (!value) {
      document.body.dispatchEvent(
        new CustomEvent("getUploadedFiles", { detail: "" }),
      );

      return;
    }

    this.debounce(value);
  }

  connectedCallback() {
    document.body.addEventListener(
      "onSearchInput",
      this.onSearchInput.bind(this),
    );
  }

  disconnectedCallback() {
    document.body.removeEventListener(
      "onSearchInput",
      this.onSearchInput.bind(this),
    );
  }
}
