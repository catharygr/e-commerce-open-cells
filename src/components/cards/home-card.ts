// @ts-nocheck
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('home-card')
export class HomeCard extends LitElement {
  @property()
  product = {};

  render() {
    const {
      title = '',
      image = '',
      description = '',
      price = '',
      rating: { rate = 0, count = 0 } = {},
    } = this.product || {};
    return html` <section>
      <h2>${title}</h2>
      <img src="${image}" alt="${title}" />
      <div>
        <p>${description}</p>
        <p>${price}</p>
        <p>${rate}</p>
        <p>${count}</p>
      </div>
    </section>`;
  }
}

// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//     "rate": 3.9,
//     "count": 120
//   }
// },
