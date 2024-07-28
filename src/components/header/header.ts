// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
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
import svgMenu from '@material-design-icons/svg/outlined/menu.svg';
import svgClose from '@material-design-icons/svg/outlined/close.svg';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  pageController = new PageController(this);
  static styles = [CssReset, styles];

  @query('.navegation') navegation;

  static outbounds = {
    searchQuery: { channel: 'search-query' },
  };

  handleSearch(e) {
    this.searchQuery = e.target.value;
  }

  openNavegation() {
    this.navegation.classList.add('open-nav');
  }

  closeNavegation() {
    this.navegation.classList.remove('open-nav');
  }

  render() {
    return html`
      <header>
        <a
          href="/"
          @click=${(e) => {
            e.preventDefault();
            this.pageController.navigate('home');
          }}
        >
          <img class="tienda-logo" src="${svgStorefront}" alt="storefront" />
        </a>
        <button @click=${this.openNavegation} class="open-menu-btn">
          <img src="${svgMenu}" alt="menu" />
        </button>
        <nav class="navegation">
          <ul class="list-nav">
            <li>
              <button @click=${this.closeNavegation} class="close-menu-btn">
                <img class="close-menu-icon" src="${svgClose}" alt="close" />
              </button>
            </li>
            <li>
              <a
                href="/"
                @click=${(e) => {
                  e.preventDefault();
                  this.closeNavegation();
                  this.pageController.navigate('home');
                }}
                >Inicio</a
              >
            </li>
            <li>
              <a
                href="/productos"
                @click=${(e) => {
                  e.preventDefault();
                  this.closeNavegation();
                  this.pageController.navigate('productos');
                }}
                >Productos</a
              >
            </li>
            <li>
              <a
                href="/ofertas"
                @click=${(e) => {
                  e.preventDefault();
                  this.closeNavegation();
                  this.pageController.navigate('ofertas');
                }}
                >Ofertas</a
              >
            </li>
          </ul>
        </nav>
        <md-filled-text-field
          class="search-field"
          placeholder="Buscar productos"
          icon="search"
          @input="${this.handleSearch}"
        >
          <img slot="trailing-icon" src="${svgSearch}" alt="search" />
        </md-filled-text-field>
        <div class="action-header">
          <button @click=${() => this.pageController.navigate('account')}>
            <img src="${svgAccountCircle}" alt="account" />
          </button>
          <button>
            <img src="${svgFavorite}" alt="favorite" />
          </button>
          <button>
            <img src="${svgDarkMode}" alt="dark mode" />
          </button>
          <button>
            <img src="${svgShoppingCart}" alt="shopping cart" />
          </button>
        </div>
      </header>
    `;
  }
}
