import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
  controller = new PageController(this);

  static styles = css`
    .container-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    h1 {
      font-size: 2rem;
      color: #f00;
    }
    p {
      margin: 0;
      font-size: 2rem;
    }
  `;
  render() {
    return html`
      <div class="container-found">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    `;
  }
}
