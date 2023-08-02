import './style.css';
import { Element } from "../../abstract/element";
import { weather } from "../../translation-const";
import { ILangWeather } from "../../interfaces";

export class Weather extends Element<HTMLElement> {
  input: Element<HTMLInputElement>;
  content: ILangWeather;
  cityId: number;
  icon: Element<HTMLElement>;
  error: Element<HTMLElement>;
  descWrap: Element<HTMLElement>;
  temperature: Element<HTMLElement>;
  desc: Element<HTMLElement>;
  wind: Element<HTMLElement>;
  humidity: Element<HTMLElement>;
  onCityChange: (value: string) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.content = weather;
    this.cityId = 8939;
    this.input = new Element(this.el, 'input', 'city');
    this.input.el.setAttribute('type', 'text');
    this.input.el.setAttribute('placeholder', this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].placeholder);
    this.icon = new Element(this.el, 'i', 'weather-icon owf');
    this.error = new Element(this.el, 'div', 'weather-error');
    this.descWrap = new Element(this.el, 'div', 'description-container');
    this.temperature = new Element(this.descWrap.el, 'span', 'temperature');
    this.desc = new Element(this.descWrap.el, 'span', 'weather-description');
    this.wind = new Element(this.el, 'div', 'wind');
    this.humidity = new Element(this.el, 'div', 'humidity');
    
    this.input.el.value = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).city
                          ? JSON.parse(localStorage.getItem('sleepyComradeMomentum')).city
                          : this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language]['defaultCity'];
    this.getWeather(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);

    setInterval(() => {
      this.getWeather(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
    }, 600000);

    this.input.el.onchange = () => {
      this.getWeather(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
    }
  }

  resetData() {
    this.icon.el.className = 'weather-icon owf';
    this.temperature.el.textContent = '';
    this.desc.el.textContent = '';
    this.wind.el.textContent = '';
    this.humidity.el.textContent = '';
    this.error.el.textContent = '';
  }

  async getWeather(lang: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.input.el.value}&lang=${lang}&appid=a4c8f2d2359f7fc8519fabe6f8264c6b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    if (data.cod === '404' || data.cod === '400') {
      if (this.input.el.value === '') {
        this.resetData();
        this.input.el.placeholder = this.content[lang]['placeholder'];
        this.error.el.textContent = this.content[lang]['emptyInputError'];
      } else {
        this.resetData();
        this.error.el.textContent = `${this.content[lang]['cityError1']} '${this.input.el.value}'${this.content[lang]['cityError2']}!`;
        this.onCityChange('');
      }
    } else {
      if (data.sys.id === this.cityId) {
        this.input.el.value = this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language]['defaultCity'];
      }
      this.resetData();
      this.onCityChange(this.input.el.value);
      
      const descript = data.weather[0].description;
      this.icon.el.classList.add(`owf-${data.weather[0].id}`);
      this.temperature.el.textContent = `${Math.round(data.main.temp)}°C`;
      this.desc.el.textContent = descript.charAt(0).toUpperCase() + descript.slice(1);
      this.wind.el.textContent = `${this.content[lang]['windSpeed']}: ${Math.round(data.wind['speed'])} ${this.content[lang]['metric']}`;
      this.humidity.el.textContent = `${this.content[lang]['humidity']}: ${Math.round(data.main['humidity'])}%`;
    }
  }
}