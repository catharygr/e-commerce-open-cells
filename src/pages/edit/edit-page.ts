import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';

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
    console.log('Edit Page');
    return html`
      <h1>Edit Page</h1>
      <p>This is the edit page</p>
    `;
  }
}
