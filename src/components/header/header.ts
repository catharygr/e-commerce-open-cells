import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  static styles = css`
    header {
      background-color: #333;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`<header><h1>My App</h1></header>`;
  }
}
