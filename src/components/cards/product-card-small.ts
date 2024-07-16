// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import grade from '@material-design-icons/svg/filled/grade.svg';

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
          <h3>${title}</h3>
          <p>${description}</p>
          <div>
            <span>${price}</span>
            <span>${starArray}</span>
          </div>
        </div>
      </div>
    `;
  }
}
