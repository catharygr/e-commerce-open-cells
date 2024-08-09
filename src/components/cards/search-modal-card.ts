// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';

@customElement('search-modal-card')
export class SearchModalCard extends LitElement {
  static styles = [
    CssReset,
    css`
    
    :host {
    border: 1px solid black;
    border-radius: 0.5rem;
    background-color: white;
    padding: 0.5rem;

    `,
  ];

  @property()
  product;

  render() {
    return html`
      <div class="search-modal-card">
        <h3>${this.product?.title}</h3>
        <img src="${this.product?.image}" alt="${this.product?.title}" />
        <p>${this.product.price}</p>
      </div>
    `;
  }
}
