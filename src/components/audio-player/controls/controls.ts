import './style.css';
import { Element } from "../../../abstract/element";

export class Controls extends Element<HTMLElement> {
  prevButton: Element<HTMLElement>;
  playButton: Element<HTMLElement>;
  nextButton: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.prevButton = new Element(this.el, 'button', 'play-prev player-icon');
    this.playButton = new Element(this.el, 'button', 'play player-icon');
    this.nextButton = new Element(this.el, 'button', 'play-next player-icon');
  }
}