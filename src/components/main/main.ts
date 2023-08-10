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
  onBgPreload: (source: string) => string;
  onCompleteLoad: () => void;
  onBgChange: (value: string) => void;
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
    this.sliderButtons.onBgPreload = (source) => {
      return this.onBgPreload(source);
    }
    this.sliderButtons.onCompleteLoad = () => {
      this.onCompleteLoad();
    }
    this.sliderButtons.onBgChange = (value) => {
      this.onBgChange(value);
    }

    const update = () => {
      this.time.showTime();
      this.date.showDate();
      this.greeting.showGreeting(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
      setTimeout(update, 1000);
    }
    update();
  }

  setLang() {
    this.greeting.showGreeting(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
    this.greeting.updateSize();
    this.date.showDate();
  }

  setBg() {
    this.sliderButtons.setBg();
  }

  setState(state: boolean, i: number, isFirstLoad: boolean) {
    if (i === 2) {
      if (isFirstLoad) {
        this.time.setDefaultState(state)
      } else {
        this.time.setState(state);
      }
    }
    if (i === 3) {
      if (isFirstLoad) {
        this.date.setDefaultState(state)
      } else {
        this.date.setState(state);
      }
    }
    if (i === 4) {
      if (isFirstLoad) {
        this.greeting.setDefaultState(state)
      } else {
        this.greeting.setState(state);
        setTimeout(() => {
          this.greeting.updateSize();
        }, 300);
      }
    }
  }
}