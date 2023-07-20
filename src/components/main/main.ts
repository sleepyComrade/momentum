import './style.css';
import { Element } from "../../abstract/element";
import { SliderButtons } from "../slider-buttons/slider-buttons";
import { Time } from "../time/time";

export class Main extends Element<HTMLElement> {
  sliderButtons: SliderButtons;
  time: Time;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'main', className);
    this.sliderButtons = new SliderButtons(this.el, 'slider-icons');
    this.time = new Time(this.el, 'time');
  }
}