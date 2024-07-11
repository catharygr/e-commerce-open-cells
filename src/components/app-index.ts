import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
// import { styles } from './app-index.css.js';

startApp({
  routes,
  mainNode: 'app-content',
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  // static styles = styles;

  render() {
    return html`
      <h1>App Index</h1>
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
      <h2>Footer</h2>
    `;
  }
}
