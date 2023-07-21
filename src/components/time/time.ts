import './style.css';
import { Element } from "../../abstract/element";

export class Time extends Element<HTMLDivElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
  }
  showTime() {
    const currentTime = new Date().toLocaleTimeString('en-US', {hourCycle: 'h23'});
    this.el.textContent = currentTime;
  };
}