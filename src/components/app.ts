import './style.css';
import { Element } from "../abstract/element";
import { Header } from "./header/header";
import { Main } from "./main/main";
import { Footer } from "./footer/footer";
import { Loader } from "./loader/loader";
import { ISettingsData } from "../interfaces";

export class App extends Element<HTMLDivElement> {
  main: Main;
  data: ISettingsData;
  loader: Loader;
  header: Header;
  footer: Footer;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.data = {
      language: 'en',
      name: '',
      city: '',
      quotes: 'sw'
    }
    if (localStorage.sleepyComradeMomentum) {
      this.data = JSON.parse(localStorage.getItem('sleepyComradeMomentum'));
    } else {
      this.localStorageUpdate();
    }
    this.loader = new Loader(this.el, 'loader');
    this.header = new Header(this.el, 'header');
    this.main = new Main(this.el, 'main');
    this.footer = new Footer(this.el, 'footer');

    this.header.onCityChange = (value) => {
      this.data.city = value;
      this.localStorageUpdate();
    }

    this.main.onNameChange = (value) => {
      this.data.name = value;
      this.localStorageUpdate();
    }
    this.main.onBgLoad = (value) => {
      parent.style.backgroundImage = value;
    }

    window.onload = () => {
      setTimeout(() => {
        this.loader.fadeOut();
      }, 700);
    }
  }

  localStorageUpdate() {
    localStorage.setItem('sleepyComradeMomentum', JSON.stringify(this.data));
  }
}