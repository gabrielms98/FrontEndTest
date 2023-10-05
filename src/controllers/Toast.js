export default class Toast extends HTMLElement {
  constructor() {
    super();
    this.WRAPPER_CLASS = "toastWrapper";
  }

  /**
   * Show toast handler
   *
   * @param {CustomEvent} event the event object
   */
  showToast(event) {
    const {
      detail: { message, type },
    } = event;

    const alertInstance = this.alert(message, type);

    if (!alertInstance) return;

    setTimeout(() => {
      alertInstance.close();
    }, 3000);
  }

  /**
   * Get alert message
   *
   * @param {string} message the message to be displayed
   * @param {string} type the type of the alert
   *
   * @returns {bootstrap.Alert} the alert instance
   */
  alert(message, type) {
    const ALERT = document.createElement("div");
    ALERT.innerHTML = `
        <div class="alert alert-${type} alert-dismissible show fade" role="alert">
          <div>${message}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

    this.appendChild(ALERT);

    return bootstrap.Alert.getOrCreateInstance(ALERT);
  }

  render() {
    this.innerHTML = `
      <div class="${this.WRAPPER_CLASS}"></div>
    `;
  }

  shouldLoadComponent() {
    return !this.innerHTML;
  }

  connectedCallback() {
    if (this.shouldLoadComponent()) this.render();

    document.body.addEventListener("showToast", this.showToast.bind(this));
  }

  disconnectedCallback() {
    document.body.removeEventListener("showToast", this.showToast.bind(this));
  }
}
