// @ts-nocheck
import { css, html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, property } from 'lit/decorators.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';
import CSSreset from '../../css/reset.css.js';

@customElement('single-product-page')
export class SingleProductPage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CSSreset,
    css`
      :host {
        max-width: 100rem;
        margin-inline: auto;
      }
      .container {
        padding: 1rem;
      }
      h1 {
        text-align: center;
        margin-top: 0;
      }
    `,
  ];

  @property()
  params = {};

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    console.log(this.params);
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Welcome to Our Store</h1>
            <home-card .product=${this.productFiltrado()}></home-card>
          </div>
        `;
  }

  productFiltrado() {
    return this.allProducts.find(
      (product) => product.id === this.params.productId
    );
  }
}
