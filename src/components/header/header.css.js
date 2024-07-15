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
    width: 40px;
    cursor: pointer;
  }

  .open-menu-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  .navegation {
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

  @media (min-width: 48rem) {
    .tienda-logo {
      width: 30px;
    }
    .list-nav a {
      font-size: 0.8rem;
    }
    .list-nav {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }
    .list-nav a {
      text-decoration: none;
      font-weight: 700;
      color: black;
      font-size: 1rem;
    }
    .open-menu-btn {
      display: none;
    }
  }
`;
