import './style.css';
import { Element } from "../../../abstract/element";
import { Block} from "../block/block";

export class Language extends Block {
  select: Element<HTMLSelectElement>;
  enOption: Element<HTMLOptionElement>;
  ruOption: Element<HTMLOptionElement>;
  constructor(parent: HTMLElement) {
    super(parent);
    this.el.classList.add('settings-language');
    this.select = new Element(this.el, 'select');
    this.select.el.setAttribute('name', 'language');
    this.select.el.setAttribute('id', 'language');
    this.enOption = new Element(this.select.el, 'option', 'language-option');
    this.enOption.el.setAttribute('value', 'en');
    this.ruOption = new Element(this.select.el, 'option', 'language-option');
    this.ruOption.el.setAttribute('value', 'ru');
  }
}