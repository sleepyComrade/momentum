import './style.css';
import { Element } from "../../../abstract/element";
import { Block} from "../block/block";
import { widgetsTitles } from "../../../translation-const";
import { IWidgetsTitles } from "../../../interfaces";
import { Widget } from "../widget-item/widget";

export class Widgets extends Block {
  widgetsWrap: Element<HTMLElement>;
  states: boolean[];
  titles: IWidgetsTitles;
  widgets: Widget[];
  onWidgetChange: (state: boolean, i: number) => void;
  constructor(parent: HTMLElement) {
    super(parent);
    this.titles = widgetsTitles;
    this.widgets = [];
    this.states = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).widgets;
    this.el.classList.add('setting-widgets');
    this.widgetsWrap = new Element(this.el, 'div', 'widgets-container');

    this.states.forEach((el, i) => {
      if (i) new Element(this.widgetsWrap.el, 'div', 'widget-separator');
      const widget = new Widget(this.widgetsWrap.el, 'widget-item', el);
      widget.onChange = (state) => {
        this.onWidgetChange(state, i);
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