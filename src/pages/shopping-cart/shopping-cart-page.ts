// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/shopping-cart/shopping-cart.js';
import '@material/web/button/filled-button.js';

@customElement('shopping-cart-page')
export class ShoppingCartPage extends LitElement {
  static styles = [
    CssReset,
    css`
      :host {
        max-width: 50rem;
        margin: 1rem auto;
        padding-inline: 0.5rem;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .action-btn {
        display: flex;
        gap: 1rem;
        justify-content: space-between;

        & md-filled-button:last-child {
          --md-sys-color-primary: darkgreen;
        }
        & md-filled-button:first-child {
          --md-sys-color-primary: orange;
        }
      }
    `,
  ];

  @query('payment-msg') paymentMsg;
  render() {
    return html` <div class="container">
      <h1>Your Shopping Cart</h1>
      <shopping-cart></shopping-cart>
      <div class="action-btn">
        <md-filled-button>Continue shopping</md-filled-button>
        <md-filled-button @click=${this.handlePaymet()}
          >To payment</md-filled-button
        >
      </div>
      <p class="payment-msg">Thank you for your good p</p>
    </div>`;
  }

  handlePaymet() {
    console.log('Payment');
  }
}
