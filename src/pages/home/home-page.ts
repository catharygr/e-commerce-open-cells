// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state, query } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/Others/spinner.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';
import '@material/web/iconbutton/filled-icon-button.js';
import svgMinus from '@material-design-icons/svg/filled/remove.svg';
import svgPlus from '@material-design-icons/svg/filled/add.svg';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

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
          margin-bottom: 1rem;
          text-align: center;
        }
      }
      .carousel {
        display: grid;
        grid-template-columns: 100%;
        overflow: hidden;
      }

      .carousel-inner {
        grid-row: 2 / 3;
        grid-column: 1 / -1;
        display: flex;
        transition: transform 0.5s ease-in-out;

        & > * {
          flex-shrink: 0;
          flex-basis: 100%;
        }
      }
      .carousel-buttons {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        gap: 1rem;
        align-self: center;
        justify-self: stretch;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.4rem;
        opacity: 0.8;
        --md-sys-color-primary: #999;
        --md-filled-icon-button-container-width: 3rem;
        --md-filled-icon-button-container-height: 3rem;
      }

      @media (min-width: 43rem) {
        .carousel-inner {
          grid-row: 1 / -1;
          grid-column: 1 / -1;
        }
        .carousel-buttons {
          grid-row: 1 / -1;
          grid-column: 1 / -1;
          justify-content: space-between;
          padding: 1rem;
        }
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
            <h1>${t('title-home')}</h1>
            <div class="carousel">
              <div class="carousel-inner">${this.randomProducts}</div>
              <div class="carousel-buttons">
                <md-filled-icon-button @click=${this.carouselMinus}>
                  <img src=${svgMinus} alt="minus" />
                </md-filled-icon-button>
                <md-filled-icon-button @click=${this.carouselPlus}>
                  <img src=${svgPlus} alt="plus" />
                </md-filled-icon-button>
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
