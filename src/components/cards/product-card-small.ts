// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('product-card-small')
export class ProductCardSmall extends LitElement {
  @property()
  product;

  render() {
    const {
      title = '',
      image = '',
      description = '',
      price = '',
      rating: { rate = 0, count = 0 } = {},
    } = this.product || {};
    return html`
      <div class="container">
        <div class="card">
          <img class="card-img" src=${this.image} />
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <div>
            <span>${this.price}</span>
            <span>${this.rating}</span>
          </div>
        </div>
      </div>
    `;
  }
}
