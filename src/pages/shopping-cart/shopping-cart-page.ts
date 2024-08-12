// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/shopping-cart/shopping-cart.js';
import '@material/web/button/filled-button.js';
import { PageController } from '@open-cells/page-controller';

@customElement('shopping-cart-page')
export class ShoppingCartPage extends LitElement {
  pageController = new PageController(this);
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
      .payment-msg {
        margin-inline: auto;
        font-size: 1rem;
        margin-block: 2rem;
        max-width: 18rem;
        text-align: center;
        display: none;
      }
    `,
  ];

  @query('.payment-msg') paymentMsg;

  static inbounds = {
    userState: { channel: 'user-state' },
  };

  static outbounds = {
    userState: { channel: 'user-state' },
  };

  render() {
    return html` <div class="container">
      <h1>Tu carrito de compra</h1>
      <shopping-cart></shopping-cart>
      <div class="action-btn">
        <md-filled-button
          @click=${() => this.pageController.navigate('productos')}
          >Continuar comprando</md-filled-button
        >
        <md-filled-button @click=${this.handlePaymet}>Pagar</md-filled-button>
      </div>
      <p class="payment-msg">
        Gracias por tu compra. Esta es una página de demostración, por lo que no
        se realizará ningún pago real. Construida para la práctica del marco
        BBVA OpenCells y LitElement. En unos segundos serás redirigido a la
        página de productos...
      </p>
    </div>`;
  }

  handlePaymet() {
    this.paymentMsg.style.display = 'block';
    setTimeout(() => {
      this.userState = {
        ...this.userState,
        cart: [],
      };
      this.paymentMsg.style.display = 'none';
      this.pageController.navigate('productos');
    }, 8000);
  }
}
