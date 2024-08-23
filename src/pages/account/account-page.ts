// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/button/filled-button.js';
import { PageController } from '@open-cells/page-controller';
import { resetInterceptorContext } from '@open-cells/core/src/bridge.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebase.js';

@customElement('account-page')
export class AccountPage extends LitElement {
  pageController = new PageController(this);

  constructor() {
    super();
    updateWhenLocaleResourcesChange(this);
  }

  static styles = [
    CssReset,
    css`
      :host {
        max-width: 50rem;
        margin: 1rem auto;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      .acc-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .user-admin {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .user-logout {
        --md-sys-color-primary: red;
      }
    `,
  ];

  static inbounds = {
    userState: { channel: 'user-state' },
  };

  static outbounds = {
    userState: { channel: 'user-state' },
  };

  handleLogOff() {
    signOut(auth);
    sessionStorage.removeItem('user');
    this.pageController.resetInterceptorContext();
    this.userState = {
      ...this.userState,
      cart: [...(this.userState?.cart || [])],
      favorites: [...(this.userState?.favorites || [])],
      name: '',
      email: '',
      password: '',
      role: '',
      isLogged: false,
    };
    this.pageController.navigate('home');
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="container">
        <div class="acc-header">
          <h1>${t('user-title')}</h1>
          <md-filled-button class="user-logout" @click=${this.handleLogOff}
            >${t('user-lougot')}</md-filled-button
          >
        </div>
        <div class="user-info">
          <h2>${t('user-info')}</h2>
          <p>${t('user-name')} ${this.userState?.name || 'Anónimo'}</p>
          <p>Email: ${this.userState?.email || 'No email'}</p>
        </div>
        ${this.userState?.role === 'admin'
          ? html`
              <div class="user-admin">
                <h2>${t('user-admin')}</h2>
                <md-filled-button
                  @click=${() => this.pageController.navigate('admin')}
                >
                  ${t('user-admin-btn')}
                </md-filled-button>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
