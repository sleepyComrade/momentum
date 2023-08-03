import './style.css';
import { Element } from "../../../abstract/element";

export class Tag extends Element<HTMLElement> {
  text: Element<HTMLElement>;
  button: Element<HTMLElement>;
  icon: Element<HTMLElement>;
  onClick: () => void;
  constructor(parent: HTMLElement, className: string, text: string) {
    super(parent, 'div', className);
    this.text = new Element(this.el, 'span', 'tag-item-text', text);
    this.button = new Element(this.el, 'div', 'tag-close');
    this.icon = new Element(this.button.el, 'div', 'icon-close');

    this.icon.el.onclick = () => {
      this.onClick();
    }
  }

  disableTag(value: string) {
    if (value === 'sw') {
      this.button.el.classList.add('tag-close-disabled');
    } else this.button.el.classList.remove('tag-close-disabled');
  }
}