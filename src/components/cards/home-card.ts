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
      .opiniones {
        display: flex;
        margin-top: auto;
        gap: 2rem;
      }

      .img-product {
        aspect-ratio: 1/1;
        object-fit: contain;
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
        background-color: #fff;
        padding: 0.5rem;
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
    return html` <section>
      <h2>${title}</h2>
      <div class="content">
        <img class="img-product" src="${image}" alt="${title}" />
        <div class="detalles">
          <p>${description}</p>
          <p>Price: ${price}</p>
          <div class="opiniones">
            <img src="${grade}" alt="rating" />
            <p>Rating: ${rate}</p>
            <p>Reviews: ${count}</p>
          </div>
        </div>
      </div>
    </section>`;
  }
}
