// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';
import '../../components/carousel/carouselElement.js';

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
  allProducts = [];

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
    return !this.allProducts.length
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Bienvenido a mi tienda</h1>
            <carousel-element .products=${this.allProducts}></carousel-element>
          </div>
        `;
  }

  onPageEnter() {
    this.requestUpdate();
  }
}
