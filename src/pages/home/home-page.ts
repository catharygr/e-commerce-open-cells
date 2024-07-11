import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
  pageController = new PageController(this);

  render() {
    return html` <h1>Home Page</h1> `;
  }
}
// Este código es de open cells
// protected createRenderRoot(): HTMLElement | DocumentFragment {
//   return this;
// }
