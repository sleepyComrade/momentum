import './style.css';
import { Element } from "../../abstract/element";
import { Quote } from "../quote/quote";

export class Footer extends Element<HTMLElement> {
  quote: Quote;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'footer', className);
    this.quote = new Quote(this.el, 'quote-block');
  }
}