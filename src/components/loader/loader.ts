import './style.css';
import { Element } from "../../abstract/element";
import loader from "../../assets/gifs/loader.gif";

export class Loader extends Element<HTMLDivElement> {
  img: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.img = new Element(this.el, 'img', 'loader-img');
    this.img.el.setAttribute('src', loader);
    this.img.el.setAttribute('alt', 'loader');
  }

  fadeOut() {
    this.el.classList.add('fade-out');
  }
}