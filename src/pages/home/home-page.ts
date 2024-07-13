// @ts-nocheck
import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  static inbounds = {
    allProducts: {
      channel: 'all-products',
      action: (data) => {
        const randomNum = Math.floor(Math.random() * data.length);
        return data[randomNum];
      },
    },
  };

  render() {
    console.log(this.allProducts);
    return html` <h1>Home Page</h1> `;
  }
}

// protected createRenderRoot(): HTMLElement | DocumentFragment {
//   return this;
// }
