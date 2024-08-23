// @ts-nocheck

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/Others/spinner.js';
import '../../components/cards/product-card-small.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('favorites-page')
export class FavoritesPage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

  static styles = [
    CssReset,
    css`
      :host {
        max-width: 100rem;
        margin-inline: auto;
      }
      .not-logged-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5rem;
        gap: 1rem;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        gap: 0.5rem;

        & > * {
          flex: 1 1 15rem;
        }
      }
      .empty-fav {
        text-align: center;
        margin: 2rem auto;
        width: 20rem;
      }
    `,
  ];

  static inbounds = {
    allProducts: { channel: 'all-products' },
    userState: { channel: 'user-state' },
  };
  render() {
    if (!this.userState?.isLogged) {
      return html` <div class="not-logged-container">
        <h1>${t('favorite-title')}</h1>
        <p>${t('favorite-msg')}</p>
        <md-filled-button @click=${() => this.pageController.navigate('login')}
          >${t('favorite-log-in')}</md-filled-button
        >
      </div>`;
    }
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            ${this.userState.favorites.length
              ? this.renderCards()
              : html`<h2 class="empty-fav">No tienes nada en favoritos.</h2>`}
          </div>
        `;
  }

  renderCards() {
    return this.userState.favorites.map(
      (product) =>
        html`<product-card-small .product=${product}></product-card-small>`
    );
  }
}
