import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('footer-component')
export class FooterComponent extends LitElement {
  static styles = css`
    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background-color: #f8f8f8;
      border-top: 1px solid #e0e0e0;
    }
  `;
  render() {
    return html` <footer>
      <p>
        &copy; ${new Date().getFullYear()} Open Cells by
        <a href="https://bubulazi.com/">Bubulazi</a>
      </p>
    </footer>`;
  }
}
