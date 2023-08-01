import './style.css';
import { Element } from "../../../abstract/element";

export class Block extends Element<HTMLElement> {
  title: Element<HTMLElement>;
  constructor(parent: HTMLElement) {
    super(parent, 'div', 'setting-block');
    this.title = new Element(this.el, 'h3', 'setting-section');
  }
}