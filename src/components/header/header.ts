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

  setLang() {
    this.weather.getWeather(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
  }

  setState(state: boolean, i: number, isFirstLoad: boolean) {
    if (i === 0) {
      if (isFirstLoad) {
        this.player.setDefaultState(state);
      } else {
        this.player.setState(state);
      }
    }
    if (i === 1) {
      if (isFirstLoad) {
        this.weather.setDefaultState(state);
      } else {
        this.weather.setState(state);
      }
    }
  }
}