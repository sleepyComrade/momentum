import './style.css';
import { Element } from "../../../abstract/element";
import { Controls } from "../controls/controls";
import { Volume } from "../volume/volume";

export class ControlsWrap extends Element<HTMLElement> {
  title: Element<HTMLElement>;
  controls: Controls;
  volume: Volume;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.title = new Element(this.el, 'div', 'current-title');
    this.controls = new Controls(this.el, 'player-controls');
    this.volume = new Volume(this.el, 'volume-wrap');
  }
}