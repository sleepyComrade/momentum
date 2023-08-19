import './style.css';
import { Element } from "../abstract/element";
import { Header } from "./header/header";
import { Main } from "./main/main";
import { Footer } from "./footer/footer";
import { Loader } from "./loader/loader";
import { ISettingsData } from "../interfaces";
import { defaultData } from '../const';

export class App extends Element<HTMLDivElement> {
  main: Main;
  data: ISettingsData;
  loader: Loader;
  header: Header;
  footer: Footer;
  isFirstLoad: boolean;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.isFirstLoad = true;
    this.data = defaultData;
    if (localStorage.sleepyComradeMomentum) {
      this.data = JSON.parse(localStorage.getItem('sleepyComradeMomentum'));
    } else {
      this.localStorageUpdate();
    }
    this.loader = new Loader(this.el, 'loader');
    this.header = new Header(this.el, 'header');
    this.main = new Main(this.el, 'main');
    this.footer = new Footer(this.el, 'footer');

    this.data.widgets.forEach((el, i) => {
      this.setState(el, i, this.isFirstLoad);
    })
    this.isFirstLoad = false;

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
        setTimeout(() => {
          this.loader.destroy();
        }, 500);
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
    this.footer.onWidgetChange = (state, i) => {
      this.setState(state, i, this.isFirstLoad);
      this.data.widgets[i] = state;
      this.localStorageUpdate();
    }
    this.footer.onThemeChange = (state, i) => {
      this.data.themes[i] = state;
      if (!i) {
        this.data.music = state ? 'sw' : 'side';
        this.localStorageUpdate();
        this.header.updatePlayer();
      }
      if (i) {
        this.data.quotes = state ? 'sw' : 'side';
        this.localStorageUpdate();
        this.footer.updateQuotes();
      }
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

  setState(state: boolean, i: number, isFirstLoad: boolean) {
    switch (i) {
      case 0:
      case 1:
        this.header.setState(state, i, isFirstLoad);
        break;
      case 2:
      case 3:
      case 4:
        this.main.setState(state, i, isFirstLoad);
        break;
      case 5:
      case 6:
        this.footer.setState(state, i, isFirstLoad);
        break;
    }
  }
}