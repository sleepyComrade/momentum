import './style.css';
import { Element } from "../../../abstract/element";
import { Language } from "../language-block/language";
import { Background } from "../background-block/background";

export class Popup extends Element<HTMLElement> {
  language: Language;
  background: Background;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.language = new Language(this.el);
    this.background = new Background(this.el);
  }

  movePopup() {
    this.el.classList.toggle('setting-move');
  }
}