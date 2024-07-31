import { css } from 'lit';

export const styles = css`
  :host {
    background-color: #e4e4e4;
  }
  header {
    display: flex;
    // justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    max-width: 100rem;
    margin-inline: auto;
  }

  .tienda-logo {
    width: 30px;
  }

  md-filled-text-field {
    flex-basis: auto;
    flex-grow: 1;
    height: 2.3rem;
    --md-ref-typeface-plain: system-ui, sans-serif;
    --md-filled-text-field-container-shape: 50px;
    --md-filled-text-field-container-color: white;
    --md-filled-text-field-top-space: 0.3rem;
    --md-filled-text-field-bottom-space: 0.2rem;
    --md-filled-text-field-active-indicator-height: 0px;
    --md-filled-text-field-focus-active-indicator-height: 0px;
    --md-filled-text-field-hover-active-indicator-color: transparent;
  }

  .action-header {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    gap: 0.5rem;
  }

  .close-menu-icon {
    width: 1em;
    height: 1em;
    font-size: 4rem;
    fill: currentColor;
    color: red;
    filter: invert(20%) sepia(100%) saturate(7500%) hue-rotate(5deg)
      brightness(100%) contrast(105%);
  }

  .list-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    & a {
      text-decoration: none;
      font-weight: 500;
      color: white;
      font-size: 1.8rem;
    }
  }

  .navegation,
  .cart {
    display: none;
  }
  .open-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
  }
  .open-cart {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(80vw, 20rem);
    background-color: white;
    display: flex;
    flex-direction: column;
    z-index: 900;
    border: 1px solid #e4e4e4;
    padding: 1rem;
    gap: 1rem;

    & > .close-cart-btn {
      --md-sys-color-primary: red;
    }
    & > .checkout-btn {
      --md-sys-color-primary: darkgreen;
    }
  }

  header {
    & > .tienda-logo {
      order: 1;
    }
    & > .open-menu-btn {
      order: 3;
    }
    & > .navegation {
      order: 3;
    }
    & > .search-field {
      order: 2;
    }
    & > .action-header {
      order: 5;
    }
  }

  @media (min-width: 35rem) {
    .action-header {
      justify-content: flex-end;
    }
  }

  @media (min-width: 50rem) {
    header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > .tienda-logo {
        order: 1;
      }
      & > .open-menu-btn {
        order: 2;
      }
      & > .navegation {
        order: 3;
      }
      & > .search-field {
        order: 4;
      }
      & > .action-header {
        order: 5;
        justify-content: flex-end;
        flex-grow: 0;
      }
    }

    .tienda-logo {
      width: 40px;
    }
    .list-nav {
      flex-direction: row;
    }
    .list-nav a {
      text-decoration: none;
      font-weight: 700;
      color: black;
      font-size: 1.2rem;
    }
    .open-menu-btn {
      display: none;
    }
    .navegation {
      display: block;
    }
    .close-menu-btn {
      display: none;
    }
  }
`;
