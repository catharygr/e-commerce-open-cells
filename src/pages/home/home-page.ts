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
        padding: 1rem;

        & h1 {
          margin-top: 0;
          text-align: center;
        }
      }
      .carousel {
        overflow: hidden;
        position: relative;
        width: 100%;
      }

      .carousel-inner {
        display: flex;
        transition: transform 0.5s ease-in-out;

        & > * {
          flex-shrink: 0;
          flex-basis: 100%;
        }
      }

      .carousel-buttons {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        position: absolute;
        top: 50vw;
        padding-inline: 1rem;
        width: 100%;
      }
      md-icon-button {
        background: rgba(0, 0, 0, 0.5);
        border-radius: 0.5rem;
      }
    `,
  ];

  @state()
  randomProducts = null;
  carouselIndex = 0;

  @query('.carousel-inner') carousel;

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    this.randomProducts = new Array(5)
      .fill(null)
      .map(
        () => html`<home-card .product=${this.getRandomProducts()}></home-card>`
      );
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
  onPageEnter() {
    this.requestUpdate();
  }

  getRandomProducts() {
    if (!this.allProducts) return;
    const randomNum = Math.floor(Math.random() * this.allProducts.length);
    return this.allProducts[randomNum];
  }
  carouselMinus() {
    if (this.carouselIndex === 0) {
      this.carouselIndex = 5;
    }
    this.carouselIndex--;
    this.carousel.style.transform = `translateX(-${this.carouselIndex * 100}%)`;
  }
  carouselPlus() {
    this.carouselIndex++;
    if (this.carouselIndex === 5) {
      this.carouselIndex = 0;
    }
    this.carousel.style.transform = `translateX(-${this.carouselIndex * 100}%)`;
  }
}
