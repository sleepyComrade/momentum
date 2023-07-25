import './style.css';
import { Element } from "../../abstract/element";
import { Weather } from "../weather/weather";

export class Header extends Element<HTMLElement> {
  weather: Weather;
  onCityChange: (value: string) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'header', className);
    this.weather = new Weather(this.el, 'weather');

    this.weather.onCityChange = (value) => {
      this.onCityChange(value);
    }
  }
}