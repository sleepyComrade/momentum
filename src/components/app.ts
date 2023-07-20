import './style.css';
import { Element } from "../abstract/element";
import { Main } from "./main/main";

export class App extends Element<HTMLDivElement> {
  main: Main;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.main = new Main(this.el, 'main');
  }
}