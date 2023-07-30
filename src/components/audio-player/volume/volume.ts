import './style.css';
import { Element } from "../../../abstract/element";

export class Volume extends Element<HTMLElement> {
  slider: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  progress: Element<HTMLElement>;
  icon: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.slider = new Element(this.el, 'div', 'volume-slider');
    this.input = new Element(this.slider.el, 'input', 'slider-progress');
    this.input.el.setAttribute('type', 'range');
    this.input.el.setAttribute('min', '0');
    this.input.el.setAttribute('max', '100');
    this.input.el.setAttribute('value', '70');
    this.progress = new Element(this.slider.el, 'div', 'volume-slider-progress');
    this.icon = new Element(this.el, 'div', 'volume-icon');
  }
}