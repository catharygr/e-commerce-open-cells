// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import {
  customElement,
  state,
  changedProperties,
  query,
} from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/Others/spinner.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';
import '@material/web/iconbutton/icon-button.js';
import svgMinus from '@material-design-icons/svg/filled/remove.svg';
import svgPlus from '@material-design-icons/svg/filled/add.svg';

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

        & h1 {
          margin-bottom: 1rem;
          text-align: center;
        }
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
        justify-content: space-between;
        gap: 1rem;
        position: absolute;
        top: 60vw;
        padding-inline: 1rem;
        width: 100%;

        & md-icon-button {
          background: rgba(0, 0, 0, 0.5);

          border-radius: 0.5rem;
        }
      }
    `,
  ];

  @state()
  randomProducts = [];
  currentIndex = 0;

  @query('.carousel-inner') carouselInner;

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Bienvenido a mi tienda</h1>
            <div class="carousel">
              <div
                class="carousel-inner">
              ${this.randomProducts}
              </div>
              <div class="carousel-buttons">
                <md-icon-button  @click=${this.carouselMinus}>
                  <img src=${svgMinus} alt="minus" />
                </md-icon-button>
                <md-icon-button  @click=${this.carouselPlus}>
                  <img src=${svgPlus} alt="plus" />
              </div>
            </div>
          </div>
        `;
  }

  getRandomProducts() {
    if (this.allProducts) {
      const randomNum = Math.floor(Math.random() * this.allProducts.length);
      return this.allProducts[randomNum];
    }
  }

  carouselMinus() {
    if (this.currentIndex === 0) {
      this.currentIndex = 5;
    }
    this.currentIndex--;
    this.corouselInner.style.transform = `translateX(-${
      this.currentIndex * 100
    }%)`;
  }
  carouselPlus() {}

  onPageEnter() {
    this.requestUpdate();
  }
}
