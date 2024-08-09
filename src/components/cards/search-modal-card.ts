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
    background-color: white;
    padding: 0.5rem;
    `,
  ];

  @property()
  product;

  render() {
    return html` <p>${this.product.title}</p> `;
  }
}
