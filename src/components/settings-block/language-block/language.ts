import './style.css';
import { Element } from "../../../abstract/element";
import { Block} from "../block/block";
import { settingLangOptions } from "../../../translation-const";
import { ISettingsLangOptions } from "../../../interfaces";

export class Language extends Block {
  select: Element<HTMLSelectElement>;
  enOption: Element<HTMLOptionElement>;
  ruOption: Element<HTMLOptionElement>;
  content: ISettingsLangOptions;
  options: Element<HTMLOptionElement>[];
  onLangChange: (value: string) => void;
  constructor(parent: HTMLElement) {
    super(parent);
    this.content = settingLangOptions;
    this.options = [];
    this.el.classList.add('settings-language');
    this.select = new Element(this.el, 'select');
    this.select.el.setAttribute('name', 'language');
    this.select.el.setAttribute('id', 'language');
    this.enOption = new Element(this.select.el, 'option', 'language-option');
    this.options.push(this.enOption);
    this.enOption.el.setAttribute('value', 'en');
    this.ruOption = new Element(this.select.el, 'option', 'language-option');
    this.options.push(this.ruOption);
    this.ruOption.el.setAttribute('value', 'ru');

    this.setLangOptions();
    this.select.el.value = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language;

    this.select.el.onchange = (e) => {
      const target = e.target as HTMLSelectElement;
      this.onLangChange(target.value);
      this.setLangOptions();
    }
  }

  setLangOptions() {
    this.options.forEach((el, i) => {
      el.el.textContent = this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language][`lang${i}`];
    })
  }
}