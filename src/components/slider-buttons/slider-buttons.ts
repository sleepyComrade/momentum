import './style.css';
import { Element } from "../../abstract/element";

export class SliderButtons extends Element<HTMLDivElement> {
  prevButton: Element<HTMLElement>;
  nextButton: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.prevButton = new Element(this.el, 'button', 'slide-prev slider-icon');
    this.nextButton = new Element(this.el, 'button', 'slide-next slider-icon');
  }
}