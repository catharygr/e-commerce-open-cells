// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './header.css.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/filled-text-field';
import { PageController } from '@open-cells/page-controller';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  pageController = new PageController(this);
  static styles = [CssReset, styles];

  static outbounds = {
    searcQuery: { channel: 'search-query' },
  };

  handleSearch(e) {
    this.searcQuery = e.target.value;
    console.log(this.searcQuery);
  }

  render() {
    console.log(this.searchValue);
    return html` <header>
      <md-icon>storefront</md-icon>
      <nav>
        <ul class="main-nav">
          <li>
            <a href="/" @click=${this.pageController.navigate('home')}
              >Inicio</a
            >
          </li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/ofertas">Ofertas</a></li>
        </ul>
      </nav>
      <md-filled-text-field
        placeholder="Buscar productos"
        icon="search"
        @input="${this.handleSearch}"
      >
        <md-icon slot="trailing-icon">search</md-icon>
      </md-filled-text-field>
      <div class="action-header">
        <md-icon>account_circle</md-icon>
        <md-icon>favorite</md-icon>
        <md-icon>dark_mode</md-icon>
        <md-icon>shopping_cart</md-icon>
      </div>
    </header>`;
  }
}
