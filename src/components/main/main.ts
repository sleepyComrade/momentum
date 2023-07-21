import './style.css';
import { Element } from "../../abstract/element";
import { SliderButtons } from "../slider-buttons/slider-buttons";
import { Time } from "../time/time";
import { DateInfo } from "../date/date";

export class Main extends Element<HTMLElement> {
  sliderButtons: SliderButtons;
  time: Time;
  date: DateInfo;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'main', className);
    this.sliderButtons = new SliderButtons(this.el, 'slider-icons');
    this.time = new Time(this.el, 'time');
    this.date = new DateInfo(this.el, 'date');

    const update = () => {
      this.time.showTime();
      this.date.showDate();
      setTimeout(update, 1000);
    }
    update();
  }
}