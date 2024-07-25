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

  render() {
    return html`
      <section class="container">
        <div class="edit-header">
          <h1>Add roduct</h1>
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
        <form @submit=${this.handleSaveProduct} class="edit-form">
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

  async handleSaveProduct(e) {
    e.preventDefault();
    try {
      const newProduct = {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        offer: true,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: {
          rate: 3.9,
          count: 120,
        },
      };

      await addProduct(newProduct);
    } catch (error) {
      console.error(error);
    }
  }
}
