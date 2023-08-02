import './style.css';
import { Element } from "../../../abstract/element";
import { Language } from "../language-block/language";
import { Background } from "../background-block/background";
import { settingSectionTitles } from "../../../translation-const";
import { ISectionTitles } from "../../../interfaces";

export class Popup extends Element<HTMLElement> {
  language: Language;
  background: Background;
  onLangChange: (value: string) => void;
  content: ISectionTitles;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.content = settingSectionTitles;
    this.language = new Language(this.el);
    this.background = new Background(this.el);

    this.setTitles();

    this.language.onLangChange = (value) => {
      this.onLangChange(value);
    }
  }

  setTitles() {
    this.language.setTitle(this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].title0);
    this.background.setTitle(this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].title1);
  }

  movePopup() {
    this.el.classList.toggle('setting-move');
  }
}