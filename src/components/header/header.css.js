import { css } from 'lit';

export const styles = css`
  header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem 1rem;
    background-color: #e4e4e4;
  }

  .tienda-logo {
    width: 30px;
    cursor: pointer;
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
    flex-direction: row;
    gap: 0.5rem;
  }

  .open-menu-btn,
  .close-menu-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  .close-menu-icon {
    width: 1em;
    height: 1em;
    font-size: 4rem;
    fill: currentColor;
    color: red;
  }

  .navegation {
    display: none;
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
      padding: 1.5rem;
    }
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

  @media (min-width: 43rem) {
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
  }
`;
