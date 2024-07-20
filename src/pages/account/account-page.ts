// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';

@customElement('account-page')
export class AccountPage extends LitElement {
  static styles = [
    CssReset,
    css`
      h1 {
        text-align: center;
      }
    `,
  ];

  render() {
    return html`<h1>My account</h1>`;
  }
}
