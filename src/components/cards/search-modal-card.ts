import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';

@customElement('search-modal-card')
export class SearchModalCard extends LitElement {
  static styles = [
    CssReset,
    css`
      :host {
      }
    `,
  ];
  render() {
    return html` <p>Search Modal Card</p> `;
  }
}
