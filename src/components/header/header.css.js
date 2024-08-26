import { css } from 'lit';

export const styles = css`
  :host {
    background-color: var(--color-tertiary);
    position: relative;
  }
  header {
    display: flex;
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

  .search-form {
    flex-basis: auto;
    flex-grow: 1;
  }

  .search-modal {
    display: none;
    flex-direction: column;
    gap: 0.3rem;
    position: fixed;
    width: min(80vw, 40rem);
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 500;
    background-color: lightgray;
    padding: 1rem;
    border: 1px solid #e4e4e4;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    & .search-modal-results {
      max-height: 50vh;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
      gap: 0.5rem;
    }

    & :is(.search-modal-close-btn, .search-modal-btn) {
      align-self: flex-end;
    }
    & p {
      color: black;
    }
  }

  md-filled-text-field {
    width: 100%;
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
  }
  .action-header-svg {
    filter: var(--filter-svg);
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
  .menu-icon-svg {
    filter: var(--filter-svg);
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
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(80vw, 20rem);
    background-color: var(--color-secondary);
    color: var(--color-primary);
    display: flex;
    flex-direction: column;
    z-index: 900;
    border: 1px solid #e4e4e4;
    padding: 1rem;
    gap: 1rem;

    & > .checkout-btn {
      --md-sys-color-primary: darkgreen;
    }
    & .checkout-btn[disabled] {
      background-color: var(--btn-color-save-disabled);
      color: var(--btn-text-color-disabled);
    }
  }

  .cart-title {
    font-size: 1rem;
    text-align: center;
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
    & > .search-form {
      order: 2;
    }
    & > .action-header {
      order: 5;
    }
  }

  .cart-btn {
    position: relative;
    & .cart-count {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: red;
      color: white;
      font-size: 0.7rem;
      border-radius: 50%;
      padding: 0.2rem 0.4rem;
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
      & > .search-form {
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
      color: var(--color-primary);
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
