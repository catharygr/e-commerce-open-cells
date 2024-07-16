// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import CssReset from '../../css/reset.css.js';
import '../../components/Others/spinner.js';
import '../../components/cards/product-card-small.js';

@customElement('productos-page')
export class ProductosPage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        padding: 1rem;
        gap: 0.5rem;
      }
    `,
  ];

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
            ${this.allProducts.map((product) => {
              return html`<product-card-small
                .product=${product}
              ></product-card-small>`;
            })}
          </div>
        `;
  }
}
