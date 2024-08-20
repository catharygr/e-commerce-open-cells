// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/textfield/filled-text-field';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/checkbox/checkbox.js';
import CssReset from '../../css/reset.css.js';
import svgVisibility from '@material-design-icons/svg/outlined/visibility.svg';
import svgVisibilityOff from '@material-design-icons/svg/outlined/visibility_off.svg';
import { PageController } from '@open-cells/page-controller';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';

@customElement('login-page')
export class LoginPage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }
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
        align-items: center;
        margin-top: 10rem;
      }

      .form-login {
        display: flex;
        flex-direction: column;
        width: min(90vw, 30rem);
        margin-block: 2rem;
        gap: 1rem;
      }

      .btn-icon-svg {
        filter: var(--filter-svg);
      }

      md-filled-button {
        margin-top: 1rem;
      }
    `,
  ];

  @query('md-outlined-text-field[id="password"]') passField;

  static outbounds = {
    userState: { channel: 'user-state' },
  };

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
      JSON.stringify({ email, password, name, role, isLogged: true })
    );
    this.pageController.updateInterceptorContext({
      user: { email, password, name, role, isLogged: true },
    });

    this.userState = {
      ...this.userState,
      cart: [...(this.userState?.cart || [])],
      favorites: [...(this.userState?.favorites || [])],
      email,
      password,
      name,
      role,
      isLogged: true,
    };

    // Redirigir a la página de cuenta
    this.pageController.navigate('account');
    // Eliminar los valores de los campos
    this.shadowRoot.querySelector('#email').value = '';
    this.shadowRoot.querySelector('#password').value = '';
    this.shadowRoot.querySelector('#nombre').value = '';
    this.shadowRoot.querySelector('#admin').checked = false;
  }
  render() {
    return html`
      <div class="container">
        <h2 class="titulo">${t('login-title')}</h2>
        <form @submit=${this.handleSubmmit} class="form-login">
          <md-filled-text-field
            required
            label=${t('login-name')}
            id="nombre"
            name="nombre"
            type="text"
          >
          </md-filled-text-field>
          <md-filled-text-field
            required
            label=${t('login-email')}
            id="email"
            name="email"
            type="email"
          >
          </md-filled-text-field>
          <md-filled-text-field
            required
            label=${t('login-password')}
            id="password"
            name="password"
            type="password"
            minLength="8"
          >
            <md-icon-button
              @click=${this.togglePasswordVisibility}
              class="btn-icon-svg"
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
          </md-filled-text-field>
          <label for="admin">
            <md-checkbox id="admin"></md-checkbox>
            ${t('login-admin')}
          </label>
          <md-filled-button>${t('login-btn-enter')}</md-filled-button>
        </form>
      </div>
    `;
  }
}
