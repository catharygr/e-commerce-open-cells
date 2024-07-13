// @ts-nocheck
import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

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
    return html` <h1>${this.randomProduct?.title}</h1> `;
  }
}

// protected createRenderRoot(): HTMLElement | DocumentFragment {
//   return this;
// }
