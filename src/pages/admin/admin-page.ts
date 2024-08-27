// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('admin-page')
export class AdminPage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

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

      .admin-add {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .add-btn {
          --md-sys-color-primary: green;
        }
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
      <div class="admin-add">
        <h1>${t('admin-title') ?? 'Panel de Admin'}</h1>
        <md-filled-button
          @click=${() => this.pageController.navigate('add')}
          class="add-btn"
          >${t('admin-add-product') ?? 'Agregar Producto'}</md-filled-button
        >
      </div>
      <b>
        <p>
          ${t('admin-msg') ??
          'Puedes editar productos existentes o cargar uno nuevo.'}
        </p>
      </b>
      <div class="admin-edit">
        ${this.allProducts?.map(
          (product) =>
            html`<div class="card-product">
              <h3>${product.title}</h3>
              <md-filled-button
                class="edit-button"
                @click=${() =>
                  this.pageController.navigate('edit', {
                    productId: product.id,
                  })}
                >${t('admin-edit') ?? 'Editar'}</md-filled-button
              >
            </div>`
        )}
      </div>
    </div>`;
  }
}
