import './style.css';
import { Element } from "../../../abstract/element";

export class Widget extends Element<HTMLElement> {
  title: Element<HTMLElement>;
  switcher: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  slider: Element<HTMLElement>;
  onChange: (state: boolean) => void;
  constructor(parent: HTMLElement, className: string, state: boolean) {
    super(parent, 'div', className);
    this.title = new Element(this.el, 'span', 'widget-title');
    this.switcher = new Element(this.el, 'label', 'switcher');
    this.input = new Element(this.switcher.el, 'input', 'widget-checkbox');
    this.input.el.setAttribute('type', 'checkbox');
    this.input.el.checked = state;
    this.slider = new Element(this.switcher.el, 'span', 'widget-slider');

    this.input.el.onchange = () => {
      this.onChange(this.input.el.checked);
    }
  }

  setTitle(value: string) {
    this.title.el.textContent = value;
  }
}