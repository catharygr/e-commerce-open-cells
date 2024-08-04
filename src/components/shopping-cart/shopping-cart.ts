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
        padding: 0.3rem;
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
        gap: 0.5rem;

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

  static outbounds = {
    userState: { channel: 'user-state' },
  };

  render() {
    const productTemplate = html`
      ${(this.userState?.cart || []).map(
        (item) => html`<li class="cart-product">
          <div class="cart-product-header">
            <img src=${item?.image} alt=${item?.title} />
            <p>${item?.title}</p>
          </div>
          <div class="cart-product-detail">
            <md-icon-button
              ?disabled=${item?.quantity <= 1}
              @click=${() => this.quantityDown(item?.id, item?.quantity)}
            >
              <img src=${svgMinus} alt="minus" />
            </md-icon-button>
            <span>${item?.quantity}</span>
            <md-icon-button
              ?disabled=${item?.quantity >= 5}
              @click=${() => this.quantityUp(item?.id, item?.quantity)}
            >
              <img src=${svgPlus} alt="plus" />
            </md-icon-button>
            <span
              >${new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(item?.price * item?.quantity)}
            </span>
          </div>
        </li>`
      )}
    `;
    return !this.allProducts
      ? html`<spinner-element></spinner-element>`
      : html` <ul class="cart-item">
            ${productTemplate}
          </ul>
          <div class="cart-total">
            <p>
              Total:
              ${new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(
                this.userState?.cart.reduce(
                  (acc, item) => acc + item?.price * item?.quantity,
                  0
                )
              )}
            </p>
          </div>`;
  }

  quantityUp(id, quantity) {
    if (quantity >= 5) return;
    this.userState = {
      ...this.userState,
      cart: this.userState.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    };
  }
  quantityDown(id, quantity) {
    if (quantity <= 0) return;

    this.userState = {
      ...this.userState,
      cart: this.userState.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      }),
    };
  }
}
