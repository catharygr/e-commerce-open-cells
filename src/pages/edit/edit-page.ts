import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/checkbox/checkbox.js';
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
        gap: 1rem;
      }

      .edit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ];

  render() {
    return html`
      <div class="edit-header">
        <h1>Edit product</h1>
        <md-filled-button @click=${() => this.pageController.backStep()}
          >Go to Admin</md-filled-button
        >
      </div>
      <form class="edit-form">
        <md-outlined-text-field
          id="title"
          label="Title"
          type="text"
        ></md-outlined-text-field>
        <md-outlined-text-field
          id="description"
          label="Description"
          type="textarea"
        ></md-outlined-text-field>
        <md-outlined-text-field
          id="price"
          label="Price"
          type="number"
        ></md-outlined-text-field>
        <md-checkbox touch-target="wrapper"></md-checkbox>

        <md-filled-button type="submit">Save</md-filled-button>
      </form>
      <md-filled-button>Eliminar</md-filled-button>
    `;
  }
}
