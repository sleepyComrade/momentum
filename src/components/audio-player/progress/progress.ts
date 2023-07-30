import './style.css';
import { Element } from "../../../abstract/element";

export class Progress extends Element<HTMLElement> {
  barWrap: Element<HTMLElement>;
  bar: Element<HTMLElement>;
  halfCircle1: Element<HTMLElement>;
  halfCircle2: Element<HTMLElement>;
  halfCircleCover: Element<HTMLElement>;
  barSliderWrap: Element<HTMLElement>;
  barSliderVisible: Element<HTMLElement>;
  barSliderInvisible: Element<HTMLElement>;
  barCircle: Element<HTMLElement>;
  audioDuration: Element<HTMLElement>;
  durationContent: Element<HTMLElement>;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.barWrap = new Element(this.el, 'div', 'bar-container');
    this.bar = new Element(this.barWrap.el, 'div', 'progress-bar');
    this.halfCircle1 = new Element(this.bar.el, 'div', 'half-circle bar-transition');
    this.halfCircle2 = new Element(this.bar.el, 'div', 'half-circle bar-transition');
    this.halfCircleCover = new Element(this.bar.el, 'div', 'half-circle-cover bar-transition');
    this.barSliderWrap = new Element(this.bar.el, 'div', 'bar-slider bar-transition');
    this.barSliderVisible = new Element(this.barSliderWrap.el, 'div', 'bar-slider-visible');
    this.barSliderInvisible = new Element(this.barSliderWrap.el, 'div', 'bar-slider-invisible');
    this.barCircle = new Element(this.bar.el, 'div', 'bar-circle bar-transition');
    this.audioDuration = new Element(this.el, 'div', 'audio-duration');
    this.durationContent = new Element(this.audioDuration.el, 'span', 'current-total');
  }
}