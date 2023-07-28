import './style.css';
import { Element } from "../../abstract/element";
import { Player } from "../audio-player/player";
import { Weather } from "../weather/weather";

export class Header extends Element<HTMLElement> {
  player: Player;
  weather: Weather;
  onCityChange: (value: string) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'header', className);
    this.player = new Player(this.el, 'player');
    this.weather = new Weather(this.el, 'weather');

    this.weather.onCityChange = (value) => {
      this.onCityChange(value);
    }
  }
}