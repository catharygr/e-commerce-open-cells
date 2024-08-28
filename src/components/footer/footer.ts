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
        background-color: var(--color-tertiary);
        padding-block: 1rem;
      }

      footer a {
        color: orange;
      }

      footer a:hover {
        color: green;
      }
    `,
  ];

  render() {
    return html` <footer>
      <p>
        &copy; ${new Date().getFullYear()} by
        <a href="https://bubulazi.com/">Bubulazi</a>
      </p>
    </footer>`;
  }
}
