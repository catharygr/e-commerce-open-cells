import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ofertas-page')
export class OfertasPage extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-wrap: wrap;
      padding: 1rem;
      gap: 0.5rem;

      & > * {
        flex: 1 1 15rem;
      }
    }
  `;

  render() {
    return html`<div class="container">Ofertas</div>`;
  }
}
