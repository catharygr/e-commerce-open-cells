// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import CssReset from '../../css/reset.css.js';
import '../../components/Others/spinner.js';
import '../../components/cards/product-card-small.js';

@customElement('ofertas-page')
export class OfertasPage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      :host {
        max-width: 100rem;
        margin-inline: auto;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        gap: 0.5rem;

        & > * {
          flex: 1 1 15rem;
        }
      }
    `,
  ];

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html` <div class="container">${this.oferCards()}</div> `;
  }

  oferCards() {
    return this.allProducts
      .filter((product) => product.offer === true)
      .map(
        (product) =>
          html`<product-card-small .product=${product}></product-card-small>`
      );
  }
}
