// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './header.css.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/filled-text-field';
import { PageController } from '@open-cells/page-controller';
import svgAccountCircle from '@material-design-icons/svg/outlined/account_circle.svg';
import svgFavorite from '@material-design-icons/svg/outlined/favorite_border.svg';
import svgDarkMode from '@material-design-icons/svg/outlined/dark_mode.svg';
import svgShoppingCart from '@material-design-icons/svg/outlined/shopping_cart.svg';
import svgStorefront from '@material-design-icons/svg/outlined/storefront.svg';
import svgSearch from '@material-design-icons/svg/outlined/search.svg';

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
    return html` <header>
      <img src="${svgStorefront}" alt="storefront" />
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
        <img slot="trailing-icon" src="${svgSearch}" alt="search" />
      </md-filled-text-field>
      <div class="action-header">
        <img src="${svgAccountCircle}" alt="account" />
        <img src="${svgFavorite}" alt="favorite" />
        <img src="${svgDarkMode}" alt="dark mode" />
        <img src="${svgShoppingCart}" alt="shopping cart" />
      </div>
    </header>`;
  }
}
