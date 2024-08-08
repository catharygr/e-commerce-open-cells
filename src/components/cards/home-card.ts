// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import grade from '@material-design-icons/svg/filled/grade.svg';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import { ElementController } from '@open-cells/element-controller';
import { addToCart, addToFav } from '../../utilidades/utils.js';
import svgFavFilled from '@material-design-icons/svg/filled/favorite.svg';
import svgFavOutline from '@material-design-icons/svg/filled/favorite_border.svg';

@customElement('home-card')
export class HomeCard extends LitElement {
  elementController = new ElementController(this);
  static styles = [
    CssReset,
    css`
      section {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        background-color: #f5f5f5;
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;

        & h2 {
        max-width: 90%;
      }

      .fav-btn {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        z-index: 100;
      }
      .content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .detalles {
        font-size: 1.3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .img-product {
        aspect-ratio: 1/1;
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
      .opiniones {
        display: flex;
        font-size: 1rem;
        margin-top: auto;
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
      }

      @media (min-width: 43rem) {
        .content {
          grid-template-columns: 40% 1fr;
        }
     
      }
    `,
  ];

  @property()
  product = {};

  static inbounds = {
    userState: { channel: 'user-state' },
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
    return html` <section>
      <md-icon-button @click=${addToFav} class="fav-btn">
        <img
          src="${!this.isProductInFavorites() ? svgFavOutline : svgFavFilled}"
          alt="favorite"
        />
      </md-icon-button>
      <h2>${title}</h2>
      <div class="content">
        <img class="img-product" src="${image}" alt="${title}" />
        <div class="detalles">
          <p>
            <b>Description: </b><br />
            ${description}
          </p>
          <p>
            <b>Price: </b>${new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
            }).format(price)}
          </p>
          <md-filled-button
            ?disabled=${this.isProductInCart()}
            @click=${addToCart}
            class="cart-btn"
            >${this.isProductInCart()
              ? 'Already in cart'
              : 'Add to cart'}</md-filled-button
          >
          <div class="opiniones">
            <div class="opiniones-stars">
              <p>Rating:&nbsp;&nbsp</p>
              ${starArray}
            </div>
            <p>Reviews: ${count}</p>
          </div>
        </div>
      </div>
    </section>`;
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
