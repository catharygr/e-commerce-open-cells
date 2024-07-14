import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('spinner-element')
export class Spinner extends LitElement {
  static styles = css`
    .loader {
      margin: 10rem auto;
      display: block;
      position: relative;
      height: 20px;
      width: 140px;
      background-image: linear-gradient(#222 20px, transparent 0),
        linear-gradient(#222 20px, transparent 0),
        linear-gradient(#222 20px, transparent 0),
        linear-gradient(#222 20px, transparent 0);
      background-repeat: no-repeat;
      background-size: 20px auto;
      background-position: 0 0, 40px 0, 80px 0, 120px 0;
      animation: pgfill 1s linear infinite;
    }
    @keyframes pgfill {
      0% {
        background-image: linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0);
      }
      25% {
        background-image: linear-gradient(#ff3d00 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0);
      }
      50% {
        background-image: linear-gradient(#222 20px, transparent 0),
          linear-gradient(#ff3d00 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0);
      }
      75% {
        background-image: linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#ff3d00 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0);
      }
      100% {
        background-image: linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#222 20px, transparent 0),
          linear-gradient(#ff3d00 20px, transparent 0);
      }
    }
  `;
  render() {
    return html` <span class="loader"></span>`;
  }
}
