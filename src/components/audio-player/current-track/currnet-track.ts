import './style.css';
import { Element } from "../../../abstract/element";
import { Progress } from "../progress/progress";
import { ControlsWrap } from "../controls-wrap/controls-wrap";

export class CurrentTrack extends Element<HTMLElement> {
  progress: Progress;
  controls: ControlsWrap;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.controls = new ControlsWrap(this.el, 'controls-wrap');
    this.progress = new Progress(this.el, 'progress-duration-wrap');
  }
}