// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';

@customElement('search-modal-card')
export class SearchModalCard extends LitElement {
  static styles = [
    CssReset,
    css`
      :host {
        border: 1px solid black;
        border-radius: 0.5rem;
        background-color: white;
        padding: 0.5rem;
      }

      .search-modal-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        & h3 {
          font-size: 0.8rem;
        }

        & img {
          aspect-ratio: 1/1;
          object-fit: contain;
          border-radius: 0.5rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
          background-color: #fff;
          padding: 0.5rem;
        }
        & .price {
          font-size: 0.8rem;
          font-weight: bold;
          margin-top: auto;
        }
      }
    `,
  ];

  @property()
  product;

  render() {
    return html`
      <div class="search-modal-card">
        <img src="${this.product?.image}" alt="${this.product?.title}" />
        <h3>${this.product?.title.slice(0, 30)}</h3>
        <p class="price">
          ${new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
          }).format(this.product.price)}
        </p>
      </div>
    `;
  }
}
