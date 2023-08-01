import './style.css';
import { Element } from "../../../abstract/element";

export class Popup extends Element<HTMLElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
  }

  movePopup() {
    this.el.classList.toggle('setting-move');
  }
}