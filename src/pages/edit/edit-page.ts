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
        width: min(96vw, 40rem);
        margin: 1rem auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
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
