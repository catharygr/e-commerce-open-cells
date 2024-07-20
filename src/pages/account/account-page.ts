// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/button/filled-button.js';
import { PageController } from '@open-cells/page-controller';
import { resetInterceptorContext } from '@open-cells/core/src/bridge.js';

@customElement('account-page')
export class AccountPage extends LitElement {
  pageController = new PageController(this);
  static styles = [
    CssReset,
    css`
      :host {
        max-width: 50rem;
        margin: 1rem auto;
      }
      .container {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      .acc-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ];

  handleLogOff() {
    sessionStorage.removeItem('user');
    resetInterceptorContext();
    this.pageController.navigate('home');
  }

  render() {
    return html`
      <div class="container">
        <div class="acc-header">
          <h1>My account</h1>
          <md-filled-button @click=${this.handleLogOff} class=""
            >Logout</md-filled-button
          >
        </div>
      </div>
    `;
  }
}
