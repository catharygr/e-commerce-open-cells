// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import '../../components/Others/spinner.js';

@customElement('productos-page')
export class ProductosPage extends LitElement {
  pageController = new PageController(this);
  static inbounds = {
    allProducts: {
      channel: 'all-products',
    },
  };
  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <div class="container">
            <h1>Productos</h1>
          </div>
        `;
  }
}
