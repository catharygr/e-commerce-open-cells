// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-card')
export class HomeCard extends LitElement {
  @property()
  productos = {};

  render() {
    return html`<h1>Card</h1>`;
  }
}
