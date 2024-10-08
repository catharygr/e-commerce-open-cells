// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { ElementController } from '@open-cells/element-controller';
import { addToCart, addToFav } from '../../utilidades/utils.js';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import grade from '@material-design-icons/svg/filled/grade.svg';
import svgFavFilled from '@material-design-icons/svg/filled/favorite.svg';
import svgFavOutline from '@material-design-icons/svg/filled/favorite_border.svg';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('home-card')
export class HomeCard extends LitElement {
  elementController = new ElementController(this);
  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

  static styles = [
    CssReset,
    css`
      section {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        background-color: var(--color-tertiary);
        border-radius: 0.5rem;
        border: 1px solid #ddd;

        & h2 {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 1.1rem;
        }
      }

      .fav-btn {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        z-index: 100;

        & img {
          filter: invert(14%) sepia(92%) saturate(3137%) hue-rotate(351deg)
            brightness(98%) contrast(86%);
        }
      }
      .content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .detalles {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .img-product {
        aspect-ratio: 2/1;
        object-fit: contain;
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        background-color: #fff;
        padding: 0.5rem;
      }
      .cart-btn {
        --md-sys-color-primary: darkgreen;
        --md-filled-button-container-height: 2rem;
        --md-filled-button-leading-space: 1rem;
        --md-filled-button-trailing-space: 1rem;
      }
      .cart-btn[disabled] {
        background-color: var(--btn-color-save-disabled);
        color: var(--btn-text-color-disabled);
      }
      .opiniones {
        margin-top: auto;
        display: flex;
        font-size: 1rem;
        gap: 2rem;
      }
      .opiniones-stars {
        display: flex;
        align-items: center;
      }
      .opiniones-stars-svg {
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
        filter: var(--filter-svg);
      }
      .offer-triangle {
        position: absolute;
        top: 0;
        left: 0;
        aspect-ratio: 1/1;
        background-color: red;
        padding: 0 1.5rem 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        rotate: -45deg;
        translate: -50% -50%;
        & p {
          font-size: 0.8rem;
          font-weight: bold;
          color: white;
        }
      }

      @media (min-width: 43rem) {
        section {
          padding: 2rem;
          gap: 2rem;

          & h2 {
            font-size: 1.8rem;
            max-width: 90%;
            text-align: left;
            margin-top: 0;
          }
        }
        .content {
          grid-template-columns: 40% 1fr;
          gap: 2rem;
        }
        .detalles {
          font-size: 1.3rem;
          gap: 1rem;
        }
        .img-product {
          aspect-ratio: 1 / 1;
        }
      }
    `,
  ];

  @property()
  product = {};

  static inbounds = {
    userState: { channel: 'user-state' },
    ocApp: { channel: '__oc_app' },
  };

  static outbounds = {
    userState: { channel: 'user-state' },
  };

  render() {
    const {
      id = '',
      title = '',
      image = '',
      description = '',
      offer = false,
      price = '',
      rating: { rate = 0, count = 0 } = {},
    } = this.product || {};

    const starArray = new Array(Math.round(rate)).fill(null).map((elem) => {
      return html`<img
        class="opiniones-stars-svg"
        src="${grade}"
        alt="rating"
      />`;
    });
    return html`
      <section>
        ${offer
          ? html`<div class="offer-triangle">
              <p>${t('card-offer') ?? 'Oferta'}</p>
            </div>`
          : ''}
        ${this.userState?.isLogged
          ? html` <md-icon-button
              @click=${this.isProductInFavorites()
                ? () => this.removeFromFav(this.product.id)
                : addToFav}
              class="fav-btn"
            >
              <img
                src="${!this.isProductInFavorites()
                  ? svgFavOutline
                  : svgFavFilled}"
                alt="favorite"
              />
            </md-icon-button>`
          : ''}
        <h2>${title}</h2>
        <div class="content">
          <img class="img-product" src="${image}" alt="${title}" />
          <div class="detalles">
            <p class="card-description">
              <b>Description: </b><br />
              ${this.ocApp.value.currentPage === 'home'
                ? html`
                    ${description.slice(0, 400)}${description.length > 400
                      ? html`...
                          <a
                            href="/#!/producto/${this.product.id}"
                            @click=${(e) => {
                              e.preventDefault();
                              this.elementController.navigate('producto', {
                                productId: this.product.id,
                              });
                            }}
                            >${t('read-more-description') ?? 'Leer más...'}</a
                          >`
                      : ''}
                  `
                : html`${description}`}
            </p>
            <p>
              <b>Price: </b>${new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(price)}
            </p>

            <div class="opiniones">
              <div class="opiniones-stars">
                <p>Rating:&nbsp;&nbsp</p>
                ${starArray}
              </div>
              <p>Reviews: ${count}</p>
            </div>
            <md-filled-button
              ?disabled=${this.isProductInCart()}
              @click=${addToCart}
              class="cart-btn"
              >${this.isProductInCart()
                ? t('card-in-cart-home') ?? 'En el carrito'
                : t('card-add-home') ?? 'Agregar...'}
            </md-filled-button>
          </div>
        </div>
      </section>
    `;
  }

  isProductInCart() {
    if (!this.userState) return false;
    return this.userState?.cart.find(
      (item) => item?.id.toString() === this.product?.id.toString()
    );
  }
  isProductInFavorites() {
    if (!this.userState) return false;
    return this.userState?.favorites.find(
      (item) => item?.id.toString() === this.product?.id.toString()
    );
  }
  removeFromFav(id) {
    this.userState = {
      ...this.userState,
      favorites: this.userState.favorites.filter(
        (item) => item?.id.toString() !== id.toString()
      ),
    };
  }
}
