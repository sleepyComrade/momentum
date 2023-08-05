import './style.css';
import { Element } from "../../abstract/element";
import { Quote } from "../quote/quote";
import { SettingsBlock } from "../settings-block/settings-block";
import { TodoBlock } from "../todo-block/todo-block";
import { ITodoData } from '../../interfaces';

export class Footer extends Element<HTMLElement> {
  quote: Quote;
  settings: SettingsBlock;
  onLangChange: (value: string) => void;
  onTagUpdate: (list: string[]) => void;
  onApply: () => void;
  onBgChange: (value: string) => void;
  todo: TodoBlock;
  onTasksUpdate: (data: ITodoData[]) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'footer', className);
    this.settings = new SettingsBlock(this.el, 'settings-block');
    this.quote = new Quote(this.el, 'quote-block');
    this.todo = new TodoBlock(this.el, 'todo-block');

    this.settings.onLangChange = (value) => {
      this.onLangChange(value);
    }
    this.settings.onTagUpdate = (list) => {
      this.onTagUpdate(list);
    }
    this.settings.onApply = () => {
      this.onApply();
    }
    this.settings.onBgChange = (value) => {
      this.onBgChange(value);
    }

    this.todo.onTasksUpdate = (data) => {
      this.onTasksUpdate(data);
    }
  }

  setLang() {
    this.settings.setLang();
    this.quote.getQuotes(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
  }

  getTags(source: string) {
    return this.settings.getTags(source);
  }

  disableTags() {
    this.settings.disableTags();
  }

  setBgValue() {
    this.settings.setBgValue();
  }
}