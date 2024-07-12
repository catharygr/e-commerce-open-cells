import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './header.css.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/outlined-text-field';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  static styles = [CssReset, styles];

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
      <md-outlined-text-field label="Buscar" icon="search">
        <md-icon slot="trailing-icon">search</md-icon>
      </md-outlined-text-field>
    </header>`;
  }
}
