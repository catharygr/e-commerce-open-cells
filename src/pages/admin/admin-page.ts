// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';

@customElement('admin-page')
export class AdminPage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      :host {
        max-width: 50rem;
        margin: 1rem auto;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      }
    `,
  ];

  render() {
    return html`<div class="container">
      <h1>Admin</h1>
      <p>Puedes editar en produtos que ya existen o cargar uno nuevo</p>
    </div>`;
  }
}
