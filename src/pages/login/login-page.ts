// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/checkbox/checkbox.js';
import CssReset from '../../css/reset.css.js';
import svgVisibility from '@material-design-icons/svg/outlined/visibility.svg';
import svgVisibilityOff from '@material-design-icons/svg/outlined/visibility_off.svg';
import { PageController } from '@open-cells/page-controller';

@customElement('login-page')
export class LoginPage extends LitElement {
  pageController = new PageController(this);
  static styles = [
    CssReset,
    css`
      :host {
        max-width: 100rem;
        margin-inline: auto;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .titulo {
        text-align: center;
        margin-top: 5rem;
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

  @query('md-outlined-text-field[id="password"]') passField;

  togglePasswordVisibility(e) {
    e.preventDefault;
    this.passField.type =
      this.passField.type === 'password' ? 'text' : 'password';
  }

  handleSubmmit(e) {
    e.preventDefault();
    const email = this.shadowRoot?.querySelector('#email').value;
    const password = this.shadowRoot?.querySelector('#password').value;
    const name = this.shadowRoot?.querySelector('#nombre').value;
    const role = this.shadowRoot?.querySelector('#admin').checked
      ? 'admin'
      : 'user';

    // Guardar ambos en sessionStorage como un objecto
    sessionStorage.setItem(
      'user',
      JSON.stringify({ email, password, name, role, isLoged: true })
    );
    this.pageController.updateInterceptorContext({
      user: { email, password, name, role, isLoged: true },
    });
    // Redirigir a la página de cuenta
    this.pageController.navigate('account');
    // Eliminar los valores de los campos
    this.shadowRoot.querySelector('#email').value = '';
    this.shadowRoot.querySelector('#password').value = '';
    this.shadowRoot.querySelector('#nombre').value = '';
    this.shadowRoot.querySelector('#admin').checked = false;
  }
  render() {
    return html` <div class="container">
      <h3 class="titulo">Loguear</h3>
      <form class="form-login">
        <md-outlined-text-field
          label="Nombre"
          id="nombre"
          name="nombre"
          type="text"
        >
        </md-outlined-text-field>
        <md-outlined-text-field
          label="Email"
          id="email"
          name="email"
          type="email"
          required
        >
        </md-outlined-text-field>
        <md-outlined-text-field
          label="Password"
          id="password"
          name="password"
          type="password"
          minLength="8"
          required
        >
          <md-icon-button
            @click=${this.togglePasswordVisibility}
            toggle
            slot="trailing-icon"
            type="button"
          >
            <img src="${svgVisibility}" alt="visibility" />
            <img
              slot="selected"
              src="${svgVisibilityOff}"
              alt="visibility_off"
            />
          </md-icon-button>
        </md-outlined-text-field>
        <label for="admin">
          <md-checkbox id="admin"></md-checkbox>
          ¿Eres admin?
        </label>
        <md-filled-button @click=${this.handleSubmmit}>Login</md-filled-button>
      </form>
    </div>`;
  }
}
