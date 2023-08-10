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

  showDate() {
    const options: {
      weekday: 'long';
      month: 'long';
      day: 'numeric';
    } = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = new Date().toLocaleDateString(this.langs[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language], options);
    this.el.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  }

  setDefaultState(state: boolean) {
    if (!state) {
      this.el.style.scale = '0';
      this.el.classList.toggle('block-zero-height');
    }
    this.el.classList.add('block-transition');
  }

  setState(state: boolean) {
    this.el.style.scale = state ? '1' : '0';
    this.el.classList.toggle('block-zero-height');
  }
}