// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('carousel-element')
export class CarouselElement extends LitElement {
  @property() products = [];

  static styles = css`
    .carousel {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
    }
    .carousel-item {
      flex: 0 0 auto;
      scroll-snap-align: start;
      margin-right: 1rem;
    }
  `;

  render() {
    return html`
      <div class="carousel">
        ${this.products.map(
          (product) => html`
            <div class="carousel-item">
              <home-card .product=${product}></home-card>
            </div>
          `
        )}
      </div>
    `;
  }
}
