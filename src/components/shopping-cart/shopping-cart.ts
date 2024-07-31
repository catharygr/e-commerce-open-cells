// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('shopping-cart')
export class ShoppingCart extends LitElement {
  render() {
    return html`
      <div>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
        </ul>
      </div>
    `;
  }
}
