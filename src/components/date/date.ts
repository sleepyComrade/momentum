import './style.css';
import { Element } from "../../abstract/element";

export class DateInfo extends Element<HTMLDivElement> {
  langs: { [en: string]: string; ru: string; };
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.langs = {
      en: 'en-US',
      ru: 'ru'
    }
  }
  showDate(lang: string) {
    const options: {
      weekday: 'long';
      month: 'long';
      day: 'numeric';
    } = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = new Date().toLocaleDateString(this.langs[lang], options);
    this.el.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  }
}