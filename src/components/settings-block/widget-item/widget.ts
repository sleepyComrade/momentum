import './style.css';
import { Element } from "../../../abstract/element";

export class Widget extends Element<HTMLElement> {
  title: Element<HTMLElement>;
  switcher: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  slider: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string, state: string) {
    super(parent, 'div', className);
    this.title = new Element(this.el, 'span', 'widget-title');
    this.switcher = new Element(this.el, 'label', 'switcher');
    this.input = new Element(this.switcher.el, 'input', 'widget-checkbox');
    this.input.el.setAttribute('type', 'checkbox');
    this.input.el.setAttribute('checked', state);
    this.slider = new Element(this.switcher.el, 'span', 'widget-slider');
  }

  setTitle(value: string) {
    this.title.el.textContent = value;
  }
}