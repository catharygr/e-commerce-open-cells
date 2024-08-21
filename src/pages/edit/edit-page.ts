// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/checkbox/checkbox.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import svgArrowBack from '@material-design-icons/svg/filled/arrow_back.svg';
import {
  editProduct,
  fetchData,
  deleteProduct,
} from '../../utilidades/backend.js';

@customElement('edit-page')
export class EditPage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

  static styles = [
    CssReset,
    css`
      .container {
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

  @state()
  product = {};

  static inbounds = {
    allProducts: { channel: 'all-products' },
  };

  static outbounds = {
    allProducts: { channel: 'all-products' },
  };

  @query('#offer') checkbox;
  @query('#title') titleField;
  @query('#description') descriptionField;
  @query('#price') priceField;
  @query('.edit-form') form;
  @query('.save-btn') saveBtn;
  @query('.delete-btn') deleteBtn;

  render() {
    this.product = this.handleFindProduct();
    return html`
      <section class="container">
        <div class="edit-header">
          <h1>${t('edit-product')}</h1>
          <a
            class="link-back"
            href="/account/admin"
            @click=${(e) => {
              e.preventDefault();
              this.pageController.backStep();
            }}
            ><img src=${svgArrowBack} />${t('edit-go-list')}</a
          >
        </div>
        <form @submit=${this.handleSaveProduct} class="edit-form">
          <md-outlined-text-field
            id="title"
            label=${t('edit-title-product')}
            type="textarea"
            rows="2"
            value=${this.product?.title}
          ></md-outlined-text-field>
          <md-outlined-text-field
            id="description"
            label=${t('edit-description')}
            type="textarea"
            rows="5"
            value=${this.product?.description}
          ></md-outlined-text-field>
          <md-outlined-text-field
            id="price"
            label=${t('edit-price')}
            type="text"
            suffix-text="€"
            value=${this.product?.price.toFixed(2)}
          ></md-outlined-text-field>
          <label>
            <md-checkbox
              touch-target="wrapper"
              ?checked=${this.product?.offer}
              id="offer"
            ></md-checkbox>
            ${t('edit-offer')}
          </label>

          <md-filled-button class="save-btn" type="submit"
            >${t('edit-save')}</md-filled-button
          >
        </form>
        <md-filled-button @click=${this.handleDeleteProduct} class="delete-btn"
          >${t('edit-delete')}</md-filled-button
        >
      </section>
    `;
  }

  handleFindProduct() {
    return this.allProducts?.find(
      (product) => product.id === this.params?.productId
    );
  }

  async handleSaveProduct(e) {
    e.preventDefault();
    this.saveBtn.disabled = true;
    this.deleteBtn.disabled = true;
    try {
      const newEditProduct = {
        ...this.product,
        title: this.titleField.value,
        description: this.descriptionField.value,
        price: parseFloat(this.priceField.value),
        offer: this.checkbox.checked,
      };
      await editProduct(newEditProduct);
      this.allProducts = await fetchData();
      this.pageController.navigate('admin');
      this.form.reset();
    } catch (error) {
      console.error(error);
    }
  }
  async handleDeleteProduct(e) {
    e.preventDefault();
    this.saveBtn.disabled = true;
    this.deleteBtn.disabled = true;
    try {
      await deleteProduct(this.product?.id);
      this.allProducts = await fetchData();
      this.pageController.navigate('admin');
      this.form.reset();
    } catch (error) {
      console.error(error);
    }
  }
}
