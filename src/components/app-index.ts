// @ts-nocheck
import { navigate, startApp } from '@open-cells/core';
import { LitElement, PropertyValues, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { fetchData } from '../utilidades/backend.js';
import { styles } from './app-index.css.js';
import './header/header.js';
import './footer/footer.js';

startApp({
  routes,
  mainNode: 'app-content',
  viewLimit: 1,
  interceptor: function (navigation, ctx) {
    let intercept = false;
    let redirect;
    if (
      (navigation.to.page === 'account' ||
        navigation.to.page === 'admin' ||
        navigation.to.page === 'edit' ||
        navigation.to.page === 'add') &&
      !sessionStorage.getItem('user')
    ) {
      intercept = true;
      redirect = { page: 'login' };
    }
    if (
      (navigation.to.page === 'admin' ||
        navigation.to.page === 'edit' ||
        navigation.to.page === 'add') &&
      ctx.user?.role !== 'admin'
    ) {
      intercept = true;
      redirect = { page: 'account' };
    }

    return { intercept, redirect };
  },
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  static outbounds = {
    allProducts: { channel: 'all-products' },
    userState: { channel: 'user-state' },
  };

  static styles = styles;

  async connectedCallback() {
    try {
      super.connectedCallback();
      this.allProducts = await fetchData();
      if (sessionStorage.getItem('user')) {
        this.elementController.updateInterceptorContext({
          user: JSON.parse(sessionStorage.getItem('user')),
        });
      }
    } catch (error) {
      console.error('Error en appIndex', error);
    }
  }

  updated() {
    if (sessionStorage.getItem('user')) {
      const { name, email, password, role, isLoged } = JSON.parse(
        sessionStorage.getItem('user')
      );
      this.elementController.updateInterceptorContext({
        user: JSON.parse(sessionStorage.getItem('user')),
      });
      this.userState = {
        ...this.userState,
        cart: [],
        favorites: [],
        name,
        email,
        password,
        role,
        isLoged,
      };
    }
  }
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
