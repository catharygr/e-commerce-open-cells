// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state, changedProperties } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/Others/spinner.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      :host {
        max-width: 100rem;
        margin-inline: auto;
      }
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
        position: relative;
      }
      .carousel-inner {
        display: flex;
        transition: transform 0.5s ease;
      }
      .carousel-item {
        min-width: 100%;
        aspect-ratio: 1/1;
        object-fit: contain;
      }
      .carousel-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        position: absolute;
        top: 10%;
        padding-inline: 1rem;
        width: 100%;
      }
      .carousel-button {
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
      }

      @media (min-width: 43rem) {
        .carousel-buttons {
          justify-content: space-between;
          top: 23vw;
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

  updated(changedProperties) {
    if (changedProperties.has('currentIndex')) {
      this.transformValue = `translateX(-${this.currentIndex * 100}%)`;
    }
  }

  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Bienvenido a mi tienda</h1>
            <div class="carousel">
              <div
                class="carousel-inner"
                style="transform: ${this.transformValue}"
              >
                ${this.allProducts.map(
                  (product) => html`
                    <div class="carousel-item">
                      <home-card .product=${product}></home-card>
                    </div>
                  `
                )}
              </div>
              <div class="carousel-buttons">
                <button class="carousel-button" @click=${this.prev}>
                  Prev
                </button>
                <button class="carousel-button" @click=${this.next}>
                  Next
                </button>
              </div>
            </div>
          </div>
        `;
  }

  onPageEnter() {
    this.requestUpdate();
  }
}
