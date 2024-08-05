import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('shopping-cart-page')
export class ShoppingCartPage extends LitElement {
  render() {
    return html` <h1>Shopping Cart</h1>`;
  }
}
