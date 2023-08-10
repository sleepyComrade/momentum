import './style.css';
import { Element } from "../../../abstract/element";
import { Language } from "../language-block/language";
import { Background } from "../background-block/background";
import { Widgets } from "../widgets-block/widgets";
import { settingSectionTitles } from "../../../translation-const";
import { ISectionTitles } from "../../../interfaces";

export class Popup extends Element<HTMLElement> {
  language: Language;
  background: Background;
  onLangChange: (value: string) => void;
  content: ISectionTitles;
  onTagUpdate: (list: string[]) => void;
  onApply: () => void;
  onBgChange: (value: string) => void;
  onWidgetChange: (state: boolean, i: number) => void;
  widgets: Widgets;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.content = settingSectionTitles;
    this.language = new Language(this.el);
    this.background = new Background(this.el);
    this.widgets = new Widgets(this.el);

    this.setTitles();

    this.language.onLangChange = (value) => {
      this.onLangChange(value);
    }

    this.background.onTagUpdate = (list) => {
      this.onTagUpdate(list);
    }
    this.background.onApply = () => {
      this.onApply();
    }
    this.background.onBgChange = (value) => {
      this.onBgChange(value);
    }

    this.widgets.onWidgetChange = (state, i) => {
      this.onWidgetChange(state, i);
    }
  }

  setTitles() {
    this.language.setTitle(this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].title0);
    this.background.setTitle(this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].title1);
    this.widgets.setTitle(this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].title2);
  }

  movePopup() {
    this.el.classList.toggle('setting-move');
  }

  setLang() {
    this.setTitles();
    this.background.setLang();
    this.widgets.setLang();
  }

  getTags(source: string) {
    return this.background.getTags(source);
  }

  disableTags() {
    this.background.disableTags();
  }

  setBgValue() {
    this.background.setBgValue();
  }
}