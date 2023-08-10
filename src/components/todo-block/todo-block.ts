import './style.css';
import { Element } from "../../abstract/element";
import { TodoPopup } from "../todo-block/todo-popup/todo-popup";
import { ISimpleLang, ITodoData } from '../../interfaces';

export class TodoBlock extends Element<HTMLElement> {
  overlay: Element<HTMLElement>;
  popup: TodoPopup;
  button: Element<HTMLElement>;
  onTasksUpdate: (data: ITodoData[]) => void;
  content: ISimpleLang;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.content = {
      en: 'Todo',
      ru: 'Список дел'
    };
    this.overlay = new Element(this.el, 'div', 'todo-overlay');
    this.button = new Element(this.el, 'span', 'todo-button', this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language]);
    this.popup = new TodoPopup(this.el, 'todo-wrap');

    this.overlay.el.onclick = () => {
      this.toggleTodo();
    }

    this.button.el.onclick = () => {
      this.toggleTodo();
    }

    this.popup.onTasksUpdate = (data) => {
      this.onTasksUpdate(data);
    }
  }

  toggleTodo() {
    this.popup.movePopup();
    this.overlay.el.classList.toggle('todo-overlay-active');
  }

  setLang() {
    this.button.el.textContent = this.content[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language];
    this.popup.setLang();
  }

  setDefaultState(state: boolean) {  
    if (!state) {
      this.button.el.style.scale = '0';
    }
    this.button.el.classList.add('block-transition');
  }

  setState(state: boolean) {
    this.button.el.style.scale = state ? '1' : '0';
  }
}