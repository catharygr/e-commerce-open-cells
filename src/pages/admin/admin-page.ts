import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('admin-page')
export class AdminPage extends LitElement {
  render() {
    return html`<h1>Admin Page</h1>`;
  }
}
