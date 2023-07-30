import './style.css';
import { Element } from "../../../abstract/element";

export class Playlist extends Element<HTMLElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'ul', className);
  }
}