// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/button/filled-button.js';

@customElement('account-page')
export class AccountPage extends LitElement {
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
    `,
  ];

  render() {
    return html`
      <div class="container">
        <h1>My account</h1>
        <md-filled-button>Logout</md-filled-button>
      </div>
    `;
  }
}
