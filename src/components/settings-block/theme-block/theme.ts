import './style.css';
import { Element } from "../../../abstract/element";
import { Block} from "../block/block";
import { themesTitles } from "../../../translation-const";
import { IThemesTitles } from '../../../interfaces';
import { Widget } from "../widget-item/widget";

export class Theme extends Block {
  titles: IThemesTitles;
  widgetsWrap: Element<HTMLElement>;
  states: boolean[];
  widgets: Widget[];
  onThemeChange: (state: boolean, i: number) => void;
  constructor(parent: HTMLElement) {
    super(parent);
    this.titles = themesTitles;
    this.widgets = [];
    this.states = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).themes;
    this.el.classList.add('setting-theme-control');
    this.widgetsWrap = new Element(this.el, 'div', 'theme-control-container');

    this.states.forEach((el, i) => {
      if (i) new Element(this.widgetsWrap.el, 'div', 'widget-separator');
      const widget = new Widget(this.widgetsWrap.el, 'widget-item', el);
      widget.onChange = (state) => {
        this.onThemeChange(state, i);
      }
      this.widgets.push(widget);
    })

    this.setLang();
  }

  setLang() {
    this.widgets.forEach((el, i) => {
      el.setTitle(this.titles[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language][`name${i}`]);
    })
  }
}