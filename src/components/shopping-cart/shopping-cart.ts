// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';

@customElement('shopping-cart')
export class ShoppingCart extends LitElement {
  elementController = new ElementController(this);

  productsInCart = [];

  static inbounds = {
    allProducts: { channel: 'all-products' },
    userState: { channel: 'user-state' },
  };

  updated() {
    this.findProductsInCart();
  }

  findProductsInCart() {
    // const products = this.userState?.cart;
    const productsID = [3, 6, 9, 9, 9];
    this.productsInCart = productsID?.map((id) => {
      return this.allProducts?.find((product) => product.id === id);
    });
    console.log(this.productsInCart);
  }

  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
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
