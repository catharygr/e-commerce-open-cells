import { css } from 'lit';

export const styles = css`
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  .main-nav {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  md-outlined-text-field {
    width: 100%;
    height: 2.2rem;
    --md-ref-typeface-plain: system-ui, sans-serif;
    --md-outlined-text-field-container-shape: 50px;
    --md-outlined-text-field-top-space: 0.2rem;
    --md-outlined-text-field-bottom-space: 0.2rem;
  }
`;
