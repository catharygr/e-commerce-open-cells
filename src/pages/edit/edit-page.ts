// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/checkbox/checkbox.js';
import svgArrowBack from '@material-design-icons/svg/filled/arrow_back.svg';

@customElement('edit-page')
export class EditPage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      :host {
        width: min(96vw, 40rem);
        margin: 1rem auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      .edit-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .edit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .link-back {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: underline;
        text-underline-offset: 0.5rem;
      }

      .save-btn {
        --md-sys-color-primary: green;
      }

      .delete-btn {
        --md-sys-color-primary: red;
      }
    `,
  ];

  @property()
  params = {};

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  render() {
    const product = this.handleFindProduct();
    return html`
      <div class="edit-header">
        <h1>Edit product</h1>
        <a
          class="link-back"
          href="/account/admin"
          @click=${(e) => {
            e.preventDefault();
            this.pageController.backStep();
          }}
          ><img src=${svgArrowBack} />Go to list product</a
        >
      </div>
      <form class="edit-form">
        <md-outlined-text-field
          id="title"
          label="Title"
          type="text"
          value=${product?.title}
        ></md-outlined-text-field>
        <md-outlined-text-field
          id="description"
          label="Description"
          type="textarea"
          rows="5"
          value=${product?.description}
        ></md-outlined-text-field>
        <md-outlined-text-field
          id="price"
          label="Price"
          type="number"
          value=${product?.price}
        ></md-outlined-text-field>
        <md-checkbox touch-target="wrapper"></md-checkbox>

        <md-filled-button class="save-btn" type="submit">Save</md-filled-button>
      </form>
      <md-filled-button class="delete-btn">Eliminar</md-filled-button>
    `;
  }

  handleFindProduct() {
    return this.allProducts?.find(
      (product) => product.id === this.params?.productId
    );
  }
}
