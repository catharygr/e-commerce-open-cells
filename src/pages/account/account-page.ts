// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import '@material/web/button/filled-button.js';
import { PageController } from '@open-cells/page-controller';
import { resetInterceptorContext } from '@open-cells/core/src/bridge.js';

@customElement('account-page')
export class AccountPage extends LitElement {
  pageController = new PageController(this);

  @property()
  user = this.pageController.getInterceptorContext().user || {};

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
    `,
  ];

  onPageEnter() {
    this.user = this.pageController.getInterceptorContext().user || {};
  }

  handleLogOff() {
    sessionStorage.removeItem('user');
    this.pageController.resetInterceptorContext();
    this.pageController.navigate('home');
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="container">
        <div class="acc-header">
          <h1>My account</h1>
          <md-filled-button @click=${this.handleLogOff}
            >Logout</md-filled-button
          >
        </div>
        <div class="user-info">
          <h2>User Information</h2>
          <p>UserName: ${this.user?.name || 'Anónimo'}</p>
          <p>Email: ${this.user?.email || 'No email'}</p>
        </div>
        ${this.user?.role === 'admin'
          ? html`
              <div class="user-admin">
                <h2>Admin Section</h2>
                <md-filled-button
                  @click=${() => this.pageController.navigate('admin')}
                >
                  Panel de admin
                </md-filled-button>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
