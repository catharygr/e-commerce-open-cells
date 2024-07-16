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
        min-width: 10rem;
      }
        .card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          box-shadow: 0 0 0.5rem #ccc;
          }
      @container(min-width: 10rem) {;
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
