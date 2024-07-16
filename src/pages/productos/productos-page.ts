// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import '../../components/Others/spinner.js';
import '../../components/cards/product-card-small.js';

@customElement('productos-page')
export class ProductosPage extends LitElement {
  pageController = new PageController(this);
  static inbounds = {
    allProducts: {
      channel: 'all-products',
    },
  };
  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>
              ${this.allProducts.map((product) => {
                return html`<product-card-small
                  .product=${product}
                ></product-card-small>`;
              })}
            </h1>
          </div>
        `;
  }
}
