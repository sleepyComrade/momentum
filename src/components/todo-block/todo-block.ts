import './style.css';
import { Element } from "../../abstract/element";
import { TodoPopup } from "../todo-block/todo-popup/todo-popup";
import { ITodoData } from '../../interfaces';

export class TodoBlock extends Element<HTMLElement> {
  overlay: Element<HTMLElement>;
  popup: TodoPopup;
  button: Element<HTMLElement>;
  onTasksUpdate: (data: ITodoData[]) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.overlay = new Element(this.el, 'div', 'todo-overlay');
    this.button = new Element(this.el, 'span', 'todo-button', 'Todo');
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

  // setLang() {
  //   this.popup.setLang();
  // }
}