// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import grade from '@material-design-icons/svg/filled/grade.svg';
import '@material/web/button/filled-button.js';
import CssReset from '../../css/reset.css.js';

@customElement('product-card-small')
export class ProductCardSmall extends LitElement {
  @property()
  product;

  static styles = [
    CssReset,
    css`
      .container {
        container-type: inline-size;
        height: 100%;
        min-width: 10rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem #ccc;
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

      .cart-btn {
        --md-sys-color-primary: green;
      }

      .card-details {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
      }

      .card-rating {
        display: flex;
        align-items: center;
      }

      .opiniones-stars-svg {
        width: 1em;
        height: 1em;
        font-size: 0.8em;
      }
      @container (min-width: 29rem) {
        .card {
          flex-direction: row;
          gap: 1rem;
        }
        .card-img {
          align-self: top;
          max-width: 40%;
        }
        @container (min-width: 40rem) {
          .card-content {
            font-size: 2rem;
          }

          .card-img {
            max-width: 30%;
          }

          .card-title {
            margin-top: 2rem;
            padding: 0.5rem;
            font-size: 2rem;
          }
          .card-description {
            font-size: 1rem;
          }
          .card-details {
            margin-top: auto;
            padding: 0.5rem;
          }
        }
      }
    `,
  ];

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
          <img class="card-img" src=${image} />
          <div class="card-content">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">
              ${description.slice(0, 300)}${description.length > 300
                ? '... Read more.'
                : ''}
            </p>
            <div class="card-action">
              <a href="/productos/${this.product.id}">Ver producto</a>
              <md-filled-button class="cart-btn">Add to cart</md-filled-button>
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
}
