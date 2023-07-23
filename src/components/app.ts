import './style.css';
import { Element } from "../abstract/element";
import { Main } from "./main/main";
import { ISettingsData } from "../interfaces";

export class App extends Element<HTMLDivElement> {
  main: Main;
  data: ISettingsData;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.data = {
      language: 'en',
      name: ''
    }
    if (localStorage.sleepyComradeMomentum) {
      this.data = JSON.parse(localStorage.getItem('sleepyComradeMomentum'));
    } else {
      this.localStorageUpdate();
    }
    this.main = new Main(this.el, 'main');

    this.main.onNameChange = (value) => {
      this.data.name = value;
      this.localStorageUpdate();
    }
    this.main.onBgLoad = (value) => {
      parent.style.backgroundImage = value;
    }
  }

  localStorageUpdate() {
    localStorage.setItem('sleepyComradeMomentum', JSON.stringify(this.data));
  }
}