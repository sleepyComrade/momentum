import './style.css';
import { Element } from "../../abstract/element";

export class Player extends Element<HTMLElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
  }
}