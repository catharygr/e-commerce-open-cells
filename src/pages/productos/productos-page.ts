import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('productos-page')
export class ProductosPage extends LitElement {
  render() {
    return html`<h1>Productos</h1>`;
  }
}
