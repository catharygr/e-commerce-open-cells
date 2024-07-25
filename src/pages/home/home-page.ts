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
      .carousel {
        width: 100%;
        overflow: hidden;
      }
      .carousel-inner {
        display: flex;
        transition: transform 0.5s ease;
      }
      .carousel-item {
        min-width: 100%;
        box-sizing: border-box;
      }
      .carousel-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        transform: translateY(-50%);
      }
      .carousel-button {
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        padding: 0.5rem;
        cursor: pointer;
      }

      @media (min-width: 48rem) {
        carousel-buttons {
          justify-content: space-between;
        }
      }
    `,
  ];

  @state()
  currentIndex = 0;

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  next() {
    if (this.currentIndex < this.allProducts.length - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.allProducts.length - 1;
    }
  }

  render() {
    if (!this.allProducts) {
      return html`<spinner-element></spinner-element>`;
    }

    const transformValue = `translateX(-${this.currentIndex * 100}%)`;

    return html`
      <div class="container">
        <h1>Bienvenido a mi tienda</h1>
        <div class="carousel">
          <div class="carousel-inner" style="transform: ${transformValue}">
            ${this.allProducts.map(
              (product) => html`
                <div class="carousel-item">
                  <home-card .product=${product}></home-card>
                </div>
              `
            )}
          </div>
          <div class="carousel-buttons">
            <button class="carousel-button" @click=${this.prev}>Prev</button>
            <button class="carousel-button" @click=${this.next}>Next</button>
          </div>
        </div>
      </div>
    `;
  }

  onPageEnter() {
    this.requestUpdate();
  }
}
