// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';
import '@material/web/checkbox/checkbox.js';
import svgArrowBack from '@material-design-icons/svg/filled/arrow_back.svg';
import { fetchData, addProduct } from '../../utilidades/backend.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import {
  addProductMiddleware,
  getProductsMiddleware,
} from '../../api/firebase.middlewares.js';

@customElement('add-page')
export class AddPage extends LitElement {
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

      .add-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .add-header {
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

      .add-icon-svg {
        filter: var(--filter-svg);
      }

      .delete-btn {
        --md-sys-color-primary: red;
      }
    `,
  ];

  @query('#title') inputTitle;
  @query('#description') descriptionInput;
  @query('#category') categoryInput;
  @query('#price') priceInput;
  @query('#offer') offerInput;
  @query('.add-form') addForm;
  @query('#img-url') imgInput;

  static outbounds = {
    allProducts: { channel: 'all-products' },
  };

  async handleSaveProduct(e) {
    e.preventDefault();
    try {
      const newProduct = {
        id: crypto.randomUUID(),
        title: this.inputTitle.value,
        price: parseFloat(this.priceInput.value),
        offer: this.offerInput.checked,
        description: this.descriptionInput.value,
        category: this.categoryInput.value,
        image: this.imgInput.value,
        rating: {
          rate: (Math.random() * 5).toFixed(1),
          count: Math.floor(Math.random() * 1000),
        },
      };

      await addProductMiddleware(newProduct);
      this.allProducts = await getProductsMiddleware();
      this.pageController.navigate('admin');
      this.addForm.reset();
    } catch (error) {
      console.error(error);
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    // Asegúrate de que el desplazamiento solo se realice bajo ciertas condiciones, si es necesario
    requestAnimationFrame(() => {
      const formElement = this.shadowRoot?.querySelector('.add-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  render() {
    return html`
      <section class="container">
        <div class="add-header">
          <h1>${t('add-title')}</h1>
          <a
            class="link-back"
            href="/account/admin"
            @click=${(e) => {
              e.preventDefault();
              this.pageController.backStep();
            }}
            ><img class="add-icon-svg" src=${svgArrowBack} />${t(
              'add-go-list'
            )}</a
          >
        </div>
        <form @submit=${this.handleSaveProduct} class="add-form">
          <md-filled-text-field
            id="title"
            label=${t('add-title-product')}
            type="textarea"
            rows="2"
          ></md-filled-text-field>
          <md-filled-text-field
            id="description"
            label=${t('add-description')}
            type="textarea"
            rows="5"
          ></md-filled-text-field>
          <md-filled-text-field
            id="category"
            label=${t('add-category')}
            type="text"
          ></md-filled-text-field>
          <md-filled-text-field
            id="img-url"
            label="URL de la imagen"
            type="text"
          ></md-filled-text-field>
          <md-filled-text-field
            id="price"
            label=${t('add-price')}
            type="text"
            rows="5"
          ></md-filled-text-field>
          <label>
            <md-checkbox touch-target="wrapper" id="offer"></md-checkbox>
            ${t('add-offer')}
          </label>

          <md-filled-button class="save-btn" type="submit"
            >${t('add-product-btn')}</md-filled-button
          >
        </form>
      </section>
    `;
  }
}
