export default class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <header class="header">
                <div class="header__logo">
                    <a href="/" class="header__logo__link">
                        <img 
                            src="https://ouronova.com/wp-content/uploads/2023/04/ON-Ouronova-home_15-transparente_pt.gif"
                            alt="Ouronova" 
                            class="header__logo__img" />
                    </a>
                </div>

                <nav class="header__nav">
                    <ul class="header__nav__list">
                        <li class="header__nav__list__item">
                            <a href="/">Home</a>
                        </li>
                    </ul>
                </nav>

                <div class="header__hamburger">
                    <span class="header__hamburger__line"></span>
                    <span class="header__hamburger__line"></span>
                    <span class="header__hamburger__line"></span>
                </div>
            </header>
        `;
  }
}
