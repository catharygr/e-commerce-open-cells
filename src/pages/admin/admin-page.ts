// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';

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
      .admin-edit {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        & > :nth-child(odd) {
          background-color: #b9b9b9;
        }
      }
      .card-product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
      }
    `,
  ];

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    return html`<div class="container">
      <h1>Admin</h1>
      <p>Puedes editar en produtos que ya existen o cargar uno nuevo</p>
      <div class="admin-edit">
        ${this.allProducts?.map(
          (product) =>
            html`<div class="card-product">
              <h3>${product.title}</h3>
              <md-filled-button
                class="edit-button"
                @click=${() => this.pageController.navigate('edit', product.id)}
                >Editar</md-filled-button
              >
            </div>`
        )}
      </div>
    </div>`;
  }
}
