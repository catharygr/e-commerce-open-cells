import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import './header/header.js';
import './footer/footer.js';

startApp({
  routes,
  mainNode: 'app-content',
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  render() {
    return html`
      <header-component></header-component>
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
      <footer-component></footer-component>
    `;
  }
}
