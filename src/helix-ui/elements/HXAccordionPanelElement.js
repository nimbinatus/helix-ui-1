import { HXElement } from './HXElement';
import shadowStyles from './_hx-accordion-panel.less';

const tagName = 'hx-accordion-panel';
const template = document.createElement('template');
template.innerHTML = `
  <style>${shadowStyles}</style>
  <button id="toggle" aria-controls="body" aria-expanded="false">
    <slot name="header"></slot>
  </button>
  <div id="body" aria-expanded="false">
    <slot></slot>
  </div>
`;

export class HXAccordionPanelElement extends HXElement {
    static get is () {
        return tagName;
    }

    static get observedAttributes () {
        return [ 'open' ];
    }

    constructor () {
        super(tagName, template);

        this._btnToggle = this.shadowRoot.getElementById('toggle');
        this._elBody = this.shadowRoot.getElementById('body');

        this._onClick = this._onClick.bind(this);
    }

    connectedCallback () {
        this.$upgradeProperty('open');

        this._btnToggle.addEventListener('click', this._onClick);
    }

    disconnectedCallback () {
        this._btnToggle.removeEventListner('click', this._onClick);
    }

    attributeChangedCallback (attr, oldVal, newVal) {
        let isOpen = (newVal !== null);

        if (newVal !== oldVal) {
            this._btnToggle.setAttribute('aria-expanded', isOpen);
            this._elBody.setAttribute('aria-expanded', isOpen);
            if (isOpen) {
                this.$emit('open');
            }
        }
    }

    _onClick (evt) {
        this.open = !this.open;
    }

    get open () {
        return this.hasAttribute('open');
    }

    set open (newVal) {
        if (newVal) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

}
