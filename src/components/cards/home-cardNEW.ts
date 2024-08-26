// @ts-nocheck
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CSSreset from '../../css/reset.css.js';
import svgGrade from '@material-design-icons/svg/filled/grade.svg';
import svgFavFilled from '@material-design-icons/svg/filled/favorite.svg';
import svgFavOutline from '@material-design-icons/svg/filled/favorite_border.svg';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/icon-button.js';
import { ElementController } from '@open-cells/element-controller';
import { addToCart, addToFav } from '../../utilidades/utils.js';

@customElement('home-card')
export class HomeCard extends LitElement {
  controler = new ElementController(this);

  @property()
  product;

  static styles = [
    CSSreset,
    css`
      section {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 0.5rem;

        & h2 {
          font-size: 1.2rem;
          text-align: center;
          margin-top: 1.1rem;
        }
      }
      .offer-triangle {
        position: absolute;
        top: 0;
        left: 0;
        aspect-ratio: 1/1;
        background-color: red;
        padding: 0 1.5rem 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        rotate: -45deg;
        translate: -50% -50%;

        & p {
          font-size: 0.8rem;
          font-weight: bold;
          color: white;
        }
      }
      .fav-btn {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        z-index: 100;

        & img {
          filter: invert(14%) sepia(92%) saturate(3137%) hue-rotate(351deg)
            brightness(98%) contrast(86%);
        }
      }

      .content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      .details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
      }
      .img-product {
        object-fit: contain;
        aspect-ratio: 2/1;
        border-radius: 0.4rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        background-color: #fff;
        padding: 0.5rem;
      }
      .cart-btn {
        --md-sys-color-primary: darkorange;
        --md-filled-button-container-height: 2rem;
        --md-filled-button-leading-space: 1rem;
        --md-filled-button-trailing-space: 1rem;
      }
      .opinions {
        display: flex;
        gap: 2rem;
        margin-top: auto;
        font-size: 1rem;
      }
      .opinions-stars {
        display: flex;
        align-items: center;
      }
      .opinion-stars-svg {
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
      }
      @media (min-width: 43rem) {
        .content {
          grid-template-columns: 40% 1fr;
          gap: 2rem;
        }
        section {
          gap: 2rem;
          padding: 2rem;

          & h2 {
            font-size: 1.8rem;
            max-width: 90%;
            text-align: left;
            margin-top: 0;
          }
        }
        .details {
          font-size: 1.3rem;
          gap: 1rem;
        }
        .img-product {
          aspect-ratio: 1/1;
        }
      }
    `,
  ];

  static outbounds = {
    userState: { channel: 'user-state' },
  };
  static inbounds = {
    userState: { channel: 'user-state' },
    ocApp: { channel: '__oc_app' },
  };

  render() {
    const {
      id = '',
      title = '',
      image = '',
      description = '',
      price = 0,
      offer = false,
      rating: { rate = 0, count = 0 } = {},
    } = this.product || {};

    const ratingArray = new Array(Math.round(rate))
      .fill(null)
      .map(
        (elem) =>
          html`<img class="opinion-stars-svg" src=${svgGrade} alt="Rating" />`
      );

    return html`
      <section>
        ${offer
          ? html`
              <div class="offer-triangle">
                <p>Offer</p>
              </div>
            `
          : ''}
        ${this.userState?.isLogged
          ? html`
              <md-icon-button
                @click=${this.isProductFav()
                  ? () => this.removeFromFav(this.product.id)
                  : addToFav}
                class="fav-btn"
                ><img src=${this.isProductFav() ? svgFavFilled : svgFavOutline}
              /></md-icon-button>
            `
          : ''}
        <h2>${title}</h2>
        <div class="content">
          <img class="img-product" src=${image} alt=${title} />
          <div class="details">
            <p>
              <b>Description:</b><br />
              ${this.ocApp.value.currentPage === 'home'
                ? html`
                    ${description.slice(0, 400)}
                    ${description.length > 400
                      ? html`...<a
                            href="/#!/product/${this.product.id}"
                            @click=${(e) => {
                              e.preventDefault();
                              this.controler.navigate('product', {
                                productID: this.product.id,
                              });
                            }}
                            >Read more.</a
                          >`
                      : ''}
                  `
                : html`${description}`}
            </p>
            <p>
              <b>Price:</b>
              ${new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR',
              }).format(price)}
            </p>

            <md-filled-button
              ?disabled=${this.isProductInCart()}
              @click=${addToCart}
              class="cart-btn"
              >${this.isProductInCart()
                ? 'Already in Cart'
                : 'Add to Cart'}</md-filled-button
            >

            <div class="opinions">
              <div class="opinions-stars">
                <p><b>Rating:</b> &nbsp;&nbsp</p>
                ${ratingArray}
              </div>
              <p><b>Reviews:</b> ${count}</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  isProductInCart() {
    if (!this.userState) return false;
    return this.userState?.cart.find(
      (item) => item?.id.toString() === this.product?.id.toString()
    );
  }
  isProductFav() {
    if (!this.userState) return false;
    return this.userState?.favorites.find(
      (item) => item?.id.toString() === this.product?.id.toString()
    );
  }
  removeFromFav(id) {
    this.userState = {
      ...this.userState,
      favorites: this.userState.favorites.filter(
        (item) => item?.id.toString() !== id.toString()
      ),
    };
  }
}
