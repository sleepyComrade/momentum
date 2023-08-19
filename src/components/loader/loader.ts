import './style.css';
import { Element } from "../../abstract/element";
import loader from "../../assets/gifs/loader.gif";
import bar from "../../assets/gifs/bar.gif";

export class Loader extends Element<HTMLDivElement> {
  img: Element<HTMLElement>;
  notification: Element<HTMLElement>;
  bar: Element<HTMLElement>;
  wrap: Element<HTMLElement>;
  messageWrap: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.wrap = new Element(this.el, 'div', 'loader-content-wrap');
    this.img = new Element(this.wrap.el, 'img', 'loader-img');
    this.img.el.setAttribute('src', loader);
    this.img.el.setAttribute('alt', 'loader');
    this.messageWrap = new Element(this.wrap.el, 'div', 'loader-message-wrap');
    this.notification = new Element(this.messageWrap.el, 'p', 'loader-notification', 'Slow connection');
    this.bar = new Element(this.messageWrap.el, 'img', 'bar-loader-img');
    this.bar.el.setAttribute('src', bar);
    this.bar.el.setAttribute('alt', 'bar');

    setTimeout(() => {
      this.messageWrap.el.classList.add('loader-message-wrap-active');
    }, 5000);
  }

  fadeOut() {
    this.el.classList.add('fade-out');
  }
}