import './style.css';
import { Element } from "../../abstract/element";

export class Time extends Element<HTMLDivElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
  }

  showTime() {
    const currentTime = new Date().toLocaleTimeString('en-US', {hourCycle: 'h23'});
    this.el.textContent = currentTime;
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