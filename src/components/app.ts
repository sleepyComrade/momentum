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
      quotes: 'sw',
      music: 'sw',
      background: 'sw',
      tags: [],
      todo: []
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
    this.main.onBgPreload = (source) => {
      return this.footer.getTags(source);
    }
    this.main.onBgChange = (value) => {
      this.changeBg(value);
      this.footer.setBgValue();
    }
    this.main.onCompleteLoad = () => {
      setTimeout(() => {
        this.loader.fadeOut();
      }, 700);
    }

    this.footer.onLangChange = (value) => {
      this.data.language = value;
      this.localStorageUpdate();
      this.header.setLang();
      this.main.setLang();
      this.footer.setLang();
    }
    this.footer.onTagUpdate = (list) => {
      this.data.tags = list;
      this.localStorageUpdate();
    }
    this.footer.onApply = () => {
      this.main.setBg();
    }
    this.footer.onBgChange = (value) => {
      this.changeBg(value);
    }
    this.footer.onTasksUpdate = (data) => {
      this.data.todo = data;
      this.localStorageUpdate();
    }
  }

  localStorageUpdate() {
    localStorage.setItem('sleepyComradeMomentum', JSON.stringify(this.data));
  }

  changeBg(value: string) {
    this.data.background = value;
    this.localStorageUpdate();
    this.main.setBg();
    this.footer.disableTags();
  }
}