import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';

@customElement('edit-page')
export class EditPage extends LitElement {
  pageController = new PageController(this);

  static styles = [
    CssReset,
    css`
      :host {
        max-width: 50rem;
        margin: 1rem auto;
      }
    `,
  ];

  render() {
    return html`
      <h1>Edit Page</h1>
      <md-filled-button @click=${() => this.pageController.backStep()}
        >Go to Admin</md-filled-button
      >
    `;
  }
}
