import { Element } from "../abstract/element";

export class App extends Element<HTMLDivElement> {
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
  }
}