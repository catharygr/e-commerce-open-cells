// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import '../../components/cards/home-card.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  static styles = css``;

  static inbounds = {
    randomProduct: {
      channel: 'all-products',
      action: (data) => {
        if (!data) return;
        const randomNum = Math.floor(Math.random() * data.length);
        return data[randomNum];
      },
    },
  };

  render() {
    return !this.randomProduct
      ? html`<div>Loading...</div>`
      : html`
          <h1>Bienvenido a mi tienda</h1>
          <home-card .product=${this.randomProduct}></home-card>
        `;
  }
}

// protected createRenderRoot(): HTMLElement | DocumentFragment {
//   return this;
// }
