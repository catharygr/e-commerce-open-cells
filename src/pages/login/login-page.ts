// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';

@customElement('login-page')
export class LoginPage extends LitElement {
  render() {
    return html`<h1>My login</h1>
      <form>
        <md-outlined-text-field
          label="Email"
          id="email"
          name="email"
          type="email"
          required
        ></md-outlined-text-field>
        <md-outlined-text-field
          label="Password"
          id="password"
          name="password"
          type="password"
          required
        ></md-outlined-text-field>
        <md-filled-button type="submit">Login</md-filled-button>
      </form>`;
  }
}
