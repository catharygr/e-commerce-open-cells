// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import '../../components/Others/spinner.js';

@customElement('shopping-cart')
export class ShoppingCart extends LitElement {
  elementController = new ElementController(this);

  static inbounds = {
    allProducts: { channel: 'all-products' },
    userState: { channel: 'user-state' },
  };

  findProductsInCart() {
    // const products = this.userState?.cart;
    const productsID = [3, 6, 9];
    return productsID?.map((id) => {
      return this.allProducts?.find(
        (product) => product.id.toString() === id.toString()
      );
    });
  }

  render() {
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html`
          <section>
            ${(this.findProductsInCart() || []).map(
              (item) => html`<p>${item?.title}</p>`
            )}
          </section>
        `;
  }
}
