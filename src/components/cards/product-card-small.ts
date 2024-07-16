// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import grade from '@material-design-icons/svg/filled/grade.svg';
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

      .card-title {
        font-size: 1rem;
      }
      .card-description {
        font-size: 0.8rem;
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
      @container (min-width: 15rem) {
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
          <h3 class="card-title">${title}</h3>
          <p class="card-description">
            ${description.slice(0, 300)}${description.length > 300
              ? '... Read more.'
              : ''}
          </p>
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
    `;
  }
}