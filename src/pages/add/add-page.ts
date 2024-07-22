// @ts-nocheck
import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import CssReset from '../../css/reset.css.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field';
import '@material/web/checkbox/checkbox.js';
import svgArrowBack from '@material-design-icons/svg/filled/arrow_back.svg';
import { editProduct, fetchData } from '../../utilidades/backend.js';

@customElement('add-page')
export class AddPage extends LitElement {
  pageController = new PageController(this);

  render() {
    return html`<h1>Add Page</h1> `;
  }
}
