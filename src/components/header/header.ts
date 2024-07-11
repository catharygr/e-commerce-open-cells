import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@material/web/icon/icon.js';
// import { styles } from './header.css.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  // protected createRenderRoot(): HTMLElement | DocumentFragment {
  //   return this;
  // }
  static styles = css`
    .main-nav {
      display: flex;
      gap: 1rem;
      list-style: none;
    }
  `;

  render() {
    return html`<header>
      <md-icon>storefront</md-icon>
      <nav>
        <ul class="main-nav">
          <li><a href="/">Inicio</a></li>
          <li><a href="/categorias">Categorias</a></li>
          <li><a href="/ofertas">Ofertas</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>
    </header>`;
  }
}
