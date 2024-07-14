// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import grade from '@material-design-icons/svg/filled/grade.svg';

@customElement('home-card')
export class HomeCard extends LitElement {
  @property()
  product = {};

  static styles = [
    CssReset,
    css`
      section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
        background-color: #f5f5f5;
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
      }
      .content {
        display: grid;
        grid-template-columns: 40% 1fr;
        gap: 2rem;
      }
      .detalles {
        font-size: 1.3rem;
        display: flex;
        flex-direction: column;
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

    return html` <section>
      <h2>${title}</h2>
      <div class="content">
        <img class="img-product" src="${image}" alt="${title}" />
        <div class="detalles">
          <p>${description}</p>
          <p>Price: ${price}</p>
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
}
