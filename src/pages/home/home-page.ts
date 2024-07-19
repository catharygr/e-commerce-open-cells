// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      .container {
        padding: 0.5rem 1rem;
      }
      h1 {
        margin-top: 0;
        text-align: center;
      }
    `,
  ];

  @state()
  randomProduct = null;

  getRandomProduct() {
    if (!this.allProducts) return;
    const randomNum = Math.floor(Math.random() * this.allProducts.length);
    this.randomProduct = this.allProducts[randomNum];
  }

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    this.getRandomProduct();
    return !this.randomProduct
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Bienvenido a mi tienda</h1>
            <home-card .product=${this.randomProduct}></home-card>
          </div>
        `;
  }

  onPageEnter() {
    this.requestUpdate();
  }
}
