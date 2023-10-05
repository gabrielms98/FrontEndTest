export default class Paginator extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
            <div class="paginator">
                <button class="paginator__button">Prev</button>
                <div class="paginator__pages">
                    <button class="paginator__pages__page paginator__pages__page--active">1</button>
                    <button class="paginator__pages__page">2</button>
                    <button class="paginator__pages__page">3</button>
                </div>
                <button class="paginator__button">Next</button>
            </div>
        `;
  }

  shouldLoadComponent() {
    return !this.innerHTML;
  }

  connectedCallback() {
    if (this.shouldLoadComponent()) this.render();
  }
}
