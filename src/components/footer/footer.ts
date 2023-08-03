import './style.css';
import { Element } from "../../abstract/element";
import { Quote } from "../quote/quote";
import { SettingsBlock } from "../settings-block/settings-block";

export class Footer extends Element<HTMLElement> {
  quote: Quote;
  settings: SettingsBlock;
  onLangChange: (value: string) => void;
  onTagUpdate: (list: string[]) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'footer', className);
    this.settings = new SettingsBlock(this.el, 'settings-block');
    this.quote = new Quote(this.el, 'quote-block');

    this.settings.onLangChange = (value) => {
      this.onLangChange(value);
    }
    this.settings.onTagUpdate = (list) => {
      this.onTagUpdate(list);
    }
  }

  setLang() {
    this.settings.setLang();
    this.quote.getQuotes(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
  }
}