// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '../../components/shopping-cart/shopping-cart.js';
import '@material/web/button/filled-button.js';
import { PageController } from '@open-cells/page-controller';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('shopping-cart-page')
export class ShoppingCartPage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

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
      <h1>${t('shopping-title') ?? 'Tu carrito de compras.'}</h1>
      <shopping-cart></shopping-cart>
      <div class="action-btn">
        <md-filled-button
          @click=${() => this.pageController.navigate('productos')}
          >${t('shopping-continue-btn') ??
          'Continuar Comprando'}</md-filled-button
        >
        <md-filled-button @click=${this.handlePaymet}
          >${t('shopping-pay-btn') ?? 'Pagar'}</md-filled-button
        >
      </div>
      <p class="payment-msg">
        ${t('shopping-payment-msg') ??
        'Gracias por tu compra. Esta es una página de demostración, por lo que no se realizará ningún pago real. Construido para practicar usando el marco de trabajo BBVA OpenCells y LitElement. En unos segundos, serás redirigido a la página de productos...'}
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
