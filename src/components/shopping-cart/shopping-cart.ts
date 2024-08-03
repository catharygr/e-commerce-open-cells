// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import '../../components/Others/spinner.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/iconbutton/icon-button.js';
import svgMinus from '@material-design-icons/svg/filled/remove.svg';
import svgPlus from '@material-design-icons/svg/filled/add.svg';

@customElement('shopping-cart')
export class ShoppingCart extends LitElement {
  elementController = new ElementController(this);

  static styles = [
    CssReset,
    css`
      .cart-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .cart-product {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background-color: #f5f5f5;
        padding: 0.1rem;
        border-radius: 0.5rem;
      }
      .cart-product-header {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        & img {
          width: 3rem;
          height: 3rem;
          object-fit: contain;
        }
      }
      .cart-product-detail {
        display: flex;
        align-items: center;

        & :last-child {
          margin-left: auto;
        }
      }
    `,
  ];

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
    const productTemplate = html`
      ${(this.findProductsInCart() || []).map(
        (item) => html`<li class="cart-product">
          <div class="cart-product-header">
            <img src=${item?.image} alt=${item?.title} />
            <p>${item?.title}</p>
          </div>
          <div class="cart-product-detail">
            <md-icon-button>
              <img src=${svgMinus} alt="minus" />
            </md-icon-button>
            <span>1</span>
            <md-icon-button>
              <img src=${svgPlus} alt="plus" />
            </md-icon-button>
            <span>124,35</span>
          </div>
        </li>`
      )}
    `;
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html` <ul class="cart-item">
          ${productTemplate}
        </ul>`;
  }
}
