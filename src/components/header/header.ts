import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './header.css.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/outlined-text-field';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  static styles = [
    CssReset,
    styles,
    css`
      md-outlined-text-field {
        margin-left: auto;
        width: 100%;
        height: 40%;
        --md-outlined-text-field-container-shape: 50px;
      }
    `,
  ];

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
      <md-outlined-text-field icon="search">
        <md-icon slot="trailing-icon">search</md-icon>
      </md-outlined-text-field>
    </header>`;
  }
}
