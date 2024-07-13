import { css } from 'lit';

export const styles = css`
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem 1rem;
    background-color: #e4e4e4;
  }

  .main-nav {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
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
    flex-direction: row;
    gap: 0.5rem;
  }
`;
