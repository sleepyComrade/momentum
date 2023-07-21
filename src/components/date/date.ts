import './style.css';
import { Element } from "../../abstract/element";

export class DateInfo extends Element<HTMLDivElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
  }
  showDate() {
    const options: {
      weekday: 'long';
      month: 'long';
      day: 'numeric';
    } = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = new Date().toLocaleDateString('en-US', options);
    this.el.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
  }
}