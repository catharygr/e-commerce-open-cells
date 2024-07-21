import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('edit-page')
export class EditPage extends LitElement {
  render() {
    return html`
      <h1>Edit Page</h1>
      <p>This is the edit page</p>
    `;
  }
}
