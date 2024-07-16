// @ts-nocheck
import { html, LitElement, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import '../../components/cards/home-card.js';
import '../../components/Others/spinner.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  static styles = css`
    .container {
      padding: 0.5rem 1rem;
    }
    h1 {
      margin-top: 0;
      text-align: center;
    }
  `;

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
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Bienvenido a mi tienda</h1>
            <home-card .product=${this.randomProduct}></home-card>
          </div>
        `;
  }
}
