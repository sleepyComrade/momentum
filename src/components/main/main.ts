import './style.css';
import { Element } from "../../abstract/element";
import { SliderButtons } from "../slider-buttons/slider-buttons";
import { Time } from "../time/time";
import { DateInfo } from "../date/date";
import { Greeting } from "../greeting/greeting";

export class Main extends Element<HTMLElement> {
  sliderButtons: SliderButtons;
  time: Time;
  date: DateInfo;
  greeting: Greeting;
  onNameChange: (value: string) => void;
  onBgLoad: (value: string) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'main', className);
    this.sliderButtons = new SliderButtons(this.el, 'slider-icons');
    this.time = new Time(this.el, 'time');
    this.date = new DateInfo(this.el, 'date');
    this.greeting = new Greeting(this.el, 'greeting-container');

    this.greeting.onNameChange = (value) => {
      this.onNameChange(value);
    }

    this.sliderButtons.onBgLoad = (value) => {
      this.onBgLoad(value);
    }

    const update = () => {
      this.time.showTime();
      this.date.showDate(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
      this.greeting.showGreeting(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
      setTimeout(update, 1000);
    }
    update();
  }
}