// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/checkbox/checkbox.js';
import svgArrowBack from '@material-design-icons/svg/filled/arrow_back.svg';
import { fetchData, addProduct } from '../../utilidades/backend.js';

@customElement('add-page')
export class AddPage extends LitElement {
  pageController = new PageController(this);

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
        image:
          'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
        rating: {
          rate: (Math.random() * 5).toFixed(1),
          count: Math.floor(Math.random() * 1000),
        },
      };

      await addProduct(newProduct);
      this.allProducts = await fetchData();
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
          <h1>Add Product</h1>
          <a
            class="link-back"
            href="/account/admin"
            @click=${(e) => {
              e.preventDefault();
              this.pageController.backStep();
            }}
            ><img src=${svgArrowBack} />Go to list</a
          >
        </div>
        <form @submit=${this.handleSaveProduct} class="add-form">
          <md-outlined-text-field
            id="title"
            label="Title"
            type="textarea"
            rows="2"
          ></md-outlined-text-field>
          <md-outlined-text-field
            id="description"
            label="Description"
            type="textarea"
            rows="5"
          ></md-outlined-text-field>
          <md-outlined-text-field
            id="category"
            label="Category"
            type="text"
          ></md-outlined-text-field>
          <md-outlined-text-field
            id="price"
            label="Price"
            type="text"
            suffix-text="€"
          ></md-outlined-text-field>
          <label>
            <md-checkbox touch-target="wrapper" id="offer"></md-checkbox>
            Product on offer
          </label>

          <md-filled-button class="save-btn" type="submit"
            >Save</md-filled-button
          >
        </form>
      </section>
    `;
  }
}
