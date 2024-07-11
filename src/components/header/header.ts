import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@material/web/icon/icon.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
  static styles = css`
    header {
      color: black;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`<header>
      <md-icon>storefront</md-icon>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/categorias">Categorias</a></li>
          <li><a href="/ofertas">Ofertas</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>
    </header>`;
  }
}
