import './style.css';
import { Element } from "../../abstract/element";
import { SliderButtons } from "../slider-buttons/slider-buttons";

export class Main extends Element<HTMLElement> {
  sliderButtons: SliderButtons;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'main', className);
    this.sliderButtons = new SliderButtons(this.el, 'slider-icons');
  }
}