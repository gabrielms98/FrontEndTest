export default class Search extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
        <c-search>
            <fieldset class="search">
                <input type="text" placeholder="Search..." id="search-input"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"></path></svg>
            </fieldset>
        </c-search>
    `;
  }

  loadChildComponents() {
    Promise.all([
      import("../controllers/Search.js").then((module) => [
        "c-search",
        module.default,
      ]),
    ]).then((components) => {
      components.forEach(([name, component]) => {
        if (component && !customElements.get(name))
          customElements.define(name, component);
      });
    });
  }

  shouldLoadComponent() {
    return !this.innerHTML;
  }

  connectedCallback() {
    this.loadChildComponents();
    if (this.shouldLoadComponent()) this.render();

    const input = this.querySelector("#search-input");
    input.addEventListener("keyup", (event) => {
      document.body.dispatchEvent(
        new CustomEvent("onSearchInput", {
          detail: event.target.value,
        }),
      );
    });
  }
}
