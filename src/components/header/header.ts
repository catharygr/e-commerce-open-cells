// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
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
import svgLightMode from '@material-design-icons/svg/outlined/light_mode.svg';
import svgShoppingCart from '@material-design-icons/svg/outlined/shopping_cart.svg';
import svgStorefront from '@material-design-icons/svg/outlined/storefront.svg';
import svgSearch from '@material-design-icons/svg/outlined/search.svg';
import svgMenu from '@material-design-icons/svg/outlined/menu.svg';
import svgClose from '@material-design-icons/svg/outlined/close.svg';
import svgLanguage from '@material-design-icons/svg/outlined/g_translate.svg';
import '../shopping-cart/shopping-cart.js';
import '../../components/cards/search-modal-card.js';
import {
  t,
  updateWhenLocaleResourcesChange,
  setLang,
} from '@open-cells/localize';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  pageController = new PageController(this);
  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }
  static styles = [CssReset, styles];

  @query('.navegation') navegation;
  @query('.cart') cart;
  @query('.search-modal') searchModal;
  @query('.search-field') searchField;

  static inbounds = {
    userState: { channel: 'user-state' },
    allProducts: { channel: 'all-products' },
    searchQuery: { channel: 'search-query' },
  };

  static outbounds = {
    searchQuery: { channel: 'search-query' },
  };

  @state()
  isDarkMode = false;

  firstUpdated() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.isDarkMode = true;
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      this.isDarkMode = false;
    }
  }

  render() {
    // HTMl template para la navegación
    const navTemplate = html` <nav class="navegation">
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
            >${t('header-home')}</a
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
            >${t('header-products')}</a
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
            >${t('header-offers')}</a
          >
        </li>
      </ul>
    </nav>`;
    const cartTemplate = html` <div class="cart">
      <h3 class="cart-title">${t('header-cart')}</h3>
      <shopping-cart></shopping-cart>
      <md-filled-button
        ?disabled=${!this.userState?.cart || this.userState?.cart.length === 0}
        @click=${() => {
          this.closeCart();
          this.pageController.navigate('cart');
        }}
        class="checkout-btn"
        >${t('header-payment')}</md-filled-button
      >
      <md-filled-button @click=${this.closeCart} class="close-cart-btn"
        >${t('header-close')}</md-filled-button
      >
    </div>`;

    const searchModalTemplate = html`
      <div class="search-modal">
        <md-icon-button
          @click=${this.handleCloseModal}
          class="search-modal-close-btn"
        >
          <img src="${svgClose}" alt="close" />
        </md-icon-button>
        <p>${t('header-search')} ${this.searchQuery}</p>
        <div class="search-modal-results">
          ${this.allProducts && this.searchQuery && this.renderCards()}
        </div>
        <md-filled-button @click=${this.handleSubmit} class="search-modal-btn"
          >${t('search-all-results')}</md-filled-button
        >
      </div>
    `;

    return html`
      ${searchModalTemplate}
      <header>
        <a
          href="/#!/"
          @click=${(e) => {
            e.preventDefault();
            this.pageController.navigate('home');
          }}
        >
          <img
            style=${this.userState?.isLogged
              ? 'filter: var(--filter-red)'
              : 'filter: var(--filter-svg)'}
            class="tienda-logo"
            src=${svgStorefront}
            alt="storefront"
          />
        </a>
        <md-icon-button @click=${this.openNavegation} class="open-menu-btn">
          <img class="menu-icon-svg" src="${svgMenu}" alt="menu" />
        </md-icon-button>
        ${navTemplate}
        <form @submit=${this.handleSubmit} class="search-form">
          <md-filled-text-field
            class="search-field"
            placeholder=${t('header-search-placeholder')}
            icon="search"
            @input="${this.handleSearch}"
          >
            <md-icon-button slot="trailing-icon"
              ><img src="${svgSearch}" alt="search"
            /></md-icon-button>
          </md-filled-text-field>
        </form>
        <div class="action-header">
          <md-icon-button
            @click=${() => this.pageController.navigate('account')}
          >
            <img
              style=${this.userState?.isLogged
                ? 'filter: var(--filter-green)'
                : 'filter: var(--filter-svg)'}
              src=${svgAccountCircle}
              alt="account"
            />
          </md-icon-button>
          <md-icon-button
            @click=${() => this.pageController.navigate('favorites')}
          >
            <img
              class="action-header-svg"
              src="${svgFavorite}"
              alt="favorite"
            />
          </md-icon-button>
          <md-icon-button @click=${this.handleDarkMode}>
            ${!this.isDarkMode
              ? html`<img
                  class="action-header-svg"
                  src="${svgDarkMode}"
                  alt="dark mode"
                />`
              : html`<img
                  class="action-header-svg"
                  src="${svgLightMode}"
                  alt="light mode"
                />`}
          </md-icon-button>
          <md-icon-button class="cart-btn" @click=${this.openCart}>
            <img
              class="action-header-svg"
              src="${svgShoppingCart}"
              alt="shopping cart"
            />
            ${this.userState?.cart.length
              ? html`<span class="cart-count"
                  >${this.userState?.cart.length}</span
                >`
              : ''}
          </md-icon-button>
          <md-icon-button @click=${this.toggleLanguage} class="icon-language"
            ><img class="action-header-svg" src="${svgLanguage}" alt="Language"
          /></md-icon-button>
        </div>
        ${cartTemplate}
      </header>
    `;
  }

  handleDarkMode() {
    const darkMode = !this.isDarkMode;
    const root = document.querySelector(':root');
    if (darkMode) {
      root.style.setProperty('--color-primary', ' white');
      root.style.setProperty('--color-secondary', '#231f20');
      root.style.setProperty('--color-tertiary', 'black');
      root.style.setProperty('--filter-svg', 'var(--filter-white)');
      root.style.setProperty('--btn-color-save', 'green');
      root.style.setProperty('--btn-color-delete', 'red');
      root.style.setProperty('--btn-color-save-disabled', '#e4e4e4');
      root.style.setProperty('--btn-color-delete-disabled', '#e4e4e4');
      root.style.setProperty('--btn-text-color-disabled', 'grey');
    } else {
      root.style.setProperty('--color-primary', ' #231f20');
      root.style.setProperty('--color-secondary', 'white');
      root.style.setProperty('--color-tertiary', '#e4e4e4');
      root.style.setProperty('--filter-svg', 'var(--filter-black)');
      root.style.setProperty('--btn-color-save', 'green');
      root.style.setProperty('--btn-color-delete', 'red');
      root.style.setProperty('--btn-color-save-disabled', '#e4e4e4');
      root.style.setProperty('--btn-color-delete-disabled', '#e4e4e4');
      root.style.setProperty('--btn-text-color-disabled', 'grey');
    }
    this.isDarkMode = darkMode;
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
  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.searchModal.style.display = 'flex';
    if (!this.searchQuery) this.searchModal.style.display = 'none';
  }

  handleCloseModal() {
    this.searchModal.style.display = 'none';
    this.searchQuery = '';
    this.searchField.value = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    this.pageController.navigate('search');
    this.searchModal.style.display = 'none';
  }
  renderCards() {
    return this.allProducts
      .filter((product) => {
        if (!this.searchQuery) return product;
        return product?.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      })
      .map((product) => {
        return html`
          <a
            href="/#!/productos/${product.id}"
            @click=${(e) => {
              e.preventDefault();
              this.pageController.navigate('producto', {
                productId: product.id,
              });
              this.searchModal.style.display = 'none';
              this.searchField.value = '';
            }}
          >
            <search-modal-card .product=${product}></search-modal-card>
          </a>
        `;
      })
      .slice(0, 5);
  }
  toggleLanguage() {
    setLang(document.documentElement.lang === 'en' ? 'es' : 'en');
  }
}
