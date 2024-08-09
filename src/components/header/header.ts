// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { styles } from './header.css.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/filled-text-field';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import { PageController } from '@open-cells/page-controller';
import svgAccountCircle from '@material-design-icons/svg/outlined/account_circle.svg';
import svgFavorite from '@material-design-icons/svg/outlined/favorite_border.svg';
import svgDarkMode from '@material-design-icons/svg/outlined/dark_mode.svg';
import svgShoppingCart from '@material-design-icons/svg/outlined/shopping_cart.svg';
import svgStorefront from '@material-design-icons/svg/outlined/storefront.svg';
import svgSearch from '@material-design-icons/svg/outlined/search.svg';
import svgMenu from '@material-design-icons/svg/outlined/menu.svg';
import svgClose from '@material-design-icons/svg/outlined/close.svg';
import '../shopping-cart/shopping-cart.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  pageController = new PageController(this);
  static styles = [CssReset, styles];

  @query('.navegation') navegation;
  @query('.cart') cart;
  @query('.search-modal') searchModal;

  static inbounds = {
    userState: { channel: 'user-state' },
    allProducts: { channel: 'all-products' },
  };

  static outbounds = {
    searchQuery: { channel: 'search-query' },
  };

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.searchModal.style.display = 'block';
  }

  openNavegation() {
    this.navegation.classList.add('open-nav');
  }

  closeNavegation() {
    this.navegation.classList.remove('open-nav');
  }

  openCart() {
    this.cart.classList.add('open-cart');
  }
  closeCart() {
    this.cart.classList.remove('open-cart');
  }

  // HTMl template para la navegación
  navTemplate = html` <nav class="navegation">
    <ul class="list-nav">
      <li>
        <button @click=${this.closeNavegation} class="close-menu-btn">
          <img class="close-menu-icon" src="${svgClose}" alt="close" />
        </button>
      </li>
      <li>
        <a
          href="/#!/"
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
          href="/#!/productos"
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
          href="/#!/ofertas"
          @click=${(e) => {
            e.preventDefault();
            this.closeNavegation();
            this.pageController.navigate('ofertas');
          }}
          >Ofertas</a
        >
      </li>
    </ul>
  </nav>`;

  render() {
    const cartTemplate = html` <div class="cart">
      <h3 class="cart-title">Shopping Cart</h3>
      <shopping-cart></shopping-cart>
      <md-filled-button
        ?disabled=${!this.userState?.cart || this.userState?.cart.length === 0}
        @click=${() => {
          this.closeCart();
          this.pageController.navigate('cart');
        }}
        class="checkout-btn"
        >Pagar</md-filled-button
      >
      <md-filled-button @click=${this.closeCart} class="close-cart-btn"
        >Cerrar</md-filled-button
      >
    </div>`;
    return html`
      <div class="search-modal">
        Soy un modal que viene a dar por culo, pero no me importa, soy un modal
        y hago lo que quiero, soy un modal y no me importa lo que pienses de mi,
        soy un modal y no me importa lo que pienses de mi,
      </div>
      <header>
        <a
          href="/#!/"
          @click=${(e) => {
            e.preventDefault();
            this.pageController.navigate('home');
          }}
        >
          <img
            style=${this.userState?.isLogged === true &&
            'filter: invert(15%) sepia(82%) saturate(3350%) hue-rotate(355deg) brightness(101%) contrast(79%)'}
            class="tienda-logo"
            src=${svgStorefront}
            alt="storefront"
          />
        </a>
        <button @click=${this.openNavegation} class="open-menu-btn">
          <img src="${svgMenu}" alt="menu" />
        </button>
        ${this.navTemplate}
        <form @submit=${this.handleSubmit} class="search-form">
          <md-filled-text-field
            class="search-field"
            placeholder="Buscar productos"
            icon="search"
            @input="${this.handleSearch}"
          >
            <md-icon-button slot="trailing-icon"
              ><img src="${svgSearch}" alt="search"
            /></md-icon-button>
          </md-filled-text-field>
        </form>
        <div class="action-header">
          <button @click=${() => this.pageController.navigate('account')}>
            <img
              style=${this.userState?.isLogged === true &&
              'filter: invert(80%) sepia(31%) saturate(6604%) hue-rotate(70deg) brightness(97%) contrast(82%)'}
              src=${svgAccountCircle}
              alt="account"
            />
          </button>
          <button @click=${() => this.pageController.navigate('favorites')}>
            <img src="${svgFavorite}" alt="favorite" />
          </button>
          <button>
            <img src="${svgDarkMode}" alt="dark mode" />
          </button>
          <button class="cart-btn" @click=${this.openCart}>
            <img src="${svgShoppingCart}" alt="shopping cart" />
            ${this.userState?.cart.length
              ? html`<span class="cart-count"
                  >${this.userState?.cart.length}</span
                >`
              : ''}
          </button>
        </div>
        ${cartTemplate}
      </header>
    `;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.pageController.navigate('productos');
    this.searchModal.style.display = 'none';
  }
}
