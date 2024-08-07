import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('favorites-page')
export class FavoritesPage extends LitElement {
  render() {
    return html`
      <section>
        <h1>Favoritos</h1>
        <p>Estos son tus productos favoritos</p>
      </section>
    `;
  }
}
