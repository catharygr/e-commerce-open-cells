// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';
import '@material/web/icon/icon.js';
import CssReset from '../../css/reset.css.js';
import svgVisibility from '@material-design-icons/svg/outlined/visibility.svg';

@customElement('login-page')
export class LoginPage extends LitElement {
  static styles = [
    CssReset,
    css`
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .titulo {
        text-align: center;
        margin-top: 10rem;
        font-size: 2rem;
      }

      .form-login {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      md-outlined-text-field {
        width: 40%;
      }
      md-filled-button {
        width: 40%;
        font-size: 1.2rem;
      }
    `,
  ];
  render() {
    return html` <div class="container">
      <h3 class="titulo">Loguear</h3>
      <form class="form-login">
        <md-outlined-text-field
          label="Email"
          id="email"
          name="email"
          type="email"
          minLenght="5"
          required
        ></md-outlined-text-field>
        <md-outlined-text-field
          label="Password"
          id="password"
          name="password"
          type="password"
          minLenght="8"
          required
        >
          <button>
            <img
              toggle
              slot="trailing-icon"
              src="${svgVisibility}"
              alt="visibility"
            />
          </button>
        </md-outlined-text-field>
        <md-filled-button type="submit">Login</md-filled-button>
      </form>
    </div>`;
  }
}
