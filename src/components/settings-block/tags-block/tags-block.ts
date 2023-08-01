import './style.css';
import { Element } from "../../../abstract/element";

export class TagsBlock extends Element<HTMLElement> {
  overlay: Element<HTMLElement>;
  inputWrap: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  addButton: Element<HTMLElement>;
  icon: Element<HTMLElement>;
  applyButton: Element<HTMLElement>;
  tagsWrap: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.overlay = new Element(this.el, 'div', 'overlay-tag');
    this.inputWrap = new Element(this.el, 'div', 'tag-input-container');
    this.input = new Element(this.inputWrap.el, 'input', 'tags');
    this.input.el.setAttribute('type', 'text');
    this.input.el.setAttribute('placeholder', 'Add a tag');
    this.input.el.setAttribute('maxlength', '20');
    this.addButton = new Element(this.inputWrap.el, 'div', 'tag-adding');
    this.icon = new Element(this.addButton.el, 'div', 'check-icon');
    this.applyButton = new Element(this.el, 'button', 'add-tag-button', 'Apply tags');
    this.tagsWrap = new Element(this.el, 'div', 'tags-wrap');
  }
}