import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';

@customElement('footer-component')
export class FooterComponent extends LitElement {
  static styles = [
    CssReset,
    css`
      footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-block: 2rem;
        background-color: #e4e4e4;
        border-top: 1px solid #e0e0e0;
      }

      footer a {
        color: red;
      }

      footer a:hover {
        color: green;
      }
    `,
  ];

  render() {
    return html` <footer>
      <p>
        &copy; ${new Date().getFullYear()} Open Cells by
        <a href="https://bubulazi.com/">Bubulazi</a>
      </p>
    </footer>`;
  }
}
