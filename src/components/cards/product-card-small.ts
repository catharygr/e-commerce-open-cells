// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import grade from '@material-design-icons/svg/filled/grade.svg';
import '@material/web/button/filled-button.js';
import CssReset from '../../css/reset.css.js';
import { ElementController } from '@open-cells/element-controller';
import { addToCart, addToFav } from '../../utilidades/utils.js';
import svgFavFilled from '@material-design-icons/svg/filled/favorite.svg';
import svgFavOutline from '@material-design-icons/svg/filled/favorite_border.svg';
import '@material/web/iconbutton/icon-button.js';

@customElement('product-card-small')
export class ProductCardSmall extends LitElement {
  elementController = new ElementController(this);
  @property()
  product;

  static styles = [
    CssReset,
    css`
      .container {
        container-type: inline-size;
        position: relative;
        height: 100%;
        min-width: 10rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem #ccc;
      }
      .fav-btn {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        z-index: 100;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;
      }

      .card-img {
        object-fit: contain;
        aspect-ratio: 1/1;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 100%;
      }

      .card-title {
        font-size: 1rem;
      }
      .card-description {
        font-size: 0.8rem;
      }

      .card-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
      }

      .cart-btn {
        --md-sys-color-primary: darkgreen;
        --md-filled-button-container-height: 2rem;
        --md-filled-button-leading-space: 1rem;
        --md-filled-button-trailing-space: 1rem;
      }

      .card-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-rating {
        display: flex;
      }

      .opiniones-stars-svg {
        width: 1em;
        height: 1em;
        font-size: 0.8em;
      }
      @container (min-width: 30rem) {
        .card {
          flex-direction: row;
          gap: 1rem;
          padding: 2rem;
        }
        .card-img {
          align-self: top;
          max-width: 30%;
        }

        .card-content {
          gap: 1rem;
          padding: 2rem;
        }

        .card-title {
          font-size: 1.8rem;
        }

        .card-description {
          font-size: 1.2rem;
        }
      }
    `,
  ];

  static inbounds = {
    userState: { channel: 'user-state' },
  };

  static outbounds = {
    userState: { channel: 'user-state' },
  };

  render() {
    const {
      title = '',
      image = '',
      description = '',
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
      <div class="container">
        <div class="card">
          <md-icon-button @click=${addToFav} class="fav-btn">
            <img
              src="${!this.isProductInFavorites()
                ? svgFavOutline
                : svgFavFilled}"
              alt="favorite"
            />
          </md-icon-button>
          <img class="card-img" src=${image} />
          <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">
              ${description.slice(0, 300)}${description.length > 300
                ? '... Read more.'
                : ''}
            </p>
            <div class="card-action">
              <a
                href="/#!/producto/${this.product.id}"
                @click=${(e) => {
                  e.preventDefault();
                  this.elementController.navigate('producto', {
                    productId: this.product.id,
                  });
                }}
                >Ver producto</a
              >
              <md-filled-button
                ?disabled=${this.isProductInCart()}
                @click=${addToCart}
                class="cart-btn"
                >${this.isProductInCart()
                  ? 'Already in cart'
                  : 'Add to cart'}</md-filled-button
              >
            </div>
            <div class="card-details">
              <span class="card-rating">${starArray}</span>
              <span class="card-price">
                ${new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(price)}</span
              >
            </div>
          </div>
        </div>
      </div>
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
}
