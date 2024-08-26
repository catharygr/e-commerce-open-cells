// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import '../../components/Others/spinner.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/iconbutton/icon-button.js';
import svgMinus from '@material-design-icons/svg/filled/remove.svg';
import svgPlus from '@material-design-icons/svg/filled/add.svg';
import svgDeleteForever from '@material-design-icons/svg/outlined/delete_forever.svg';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('shopping-cart')
export class ShoppingCart extends LitElement {
  elementController = new ElementController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

  static styles = [
    CssReset,
    css`
      .cart-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.8rem;
      }
      .cart-product {
        display: flex;
        flex-direction: column;
        background-color: #f5f5f5;
        padding: 0.4rem;
        border-radius: 0.5rem;
      }

      .cart-title,
      .cart-price,
      .cart-msg {
        color: var(--color-;
      }

      .cart-product-header {
        display: flex;
        gap: 1rem;
        align-items: flex-start;

        & md-icon-button {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
          margin-left: auto;
        }

        & .cart-delete {
          width: 22px;
          height: 22px;
          filter: invert(14%) sepia(92%) saturate(3137%) hue-rotate(351deg)
            brightness(98%) contrast(86%);
        }
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
      .cart-total {
        text-align: right;
        padding: 1.5rem 0.4rem;
        font-size: 0.8rem;

        & :last-child {
          font-weight: bold;
          font-size: 1rem;
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
    const total = this.userState?.cart.reduce(
      (acc, item) => acc + item?.price * item?.quantity,
      0
    );
    // Calcular el tax el 21% del total
    const tax = total * 0.21;

    const productTemplate = html`
      ${(this.userState?.cart || []).map(
        (item) => html`<li class="cart-product">
          <div class="cart-product-header">
            <img src=${item?.image} alt=${item?.title} />
            <p class="cart-title">${item?.title}</p>
            <md-icon-button @click=${() => this.deleteProduct(item?.id)}>
              <img class="cart-delete" src=${svgDeleteForever} alt="delete" />
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
            class="cart-price"
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
      : this.userState?.cart === undefined || this.userState?.cart.length === 0
      ? html`<p class="cart-msg">${t('shopping-msg')}</p>`
      : html` <ul class="cart-item">
            ${productTemplate}
          </ul>
          <div class="cart-total">
            <p>
              ${t('shopping-tax')}:
              ${new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(tax)}
            </p>

            <p>
              Total
              ${new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(total)}
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
  deleteProduct(id) {
    this.userState = {
      ...this.userState,
      cart: this.userState?.cart.filter((item) => item?.id !== id),
    };
  }
}
