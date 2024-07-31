// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('shopping-cart')
export class ShoppingCart extends LitElement {
  @state()
  productsInCart = [3, 6, 9, 9, 9];

  static inbounds = {
    allProducts: { channel: 'all-products' },
    userState: { channel: 'user-state' },
  };

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
