import './style.css';
import { Element } from "../../../abstract/element";
import { Task } from "../task/task";
import { ITodoData } from "../../../interfaces";

export class TodoPopup extends Element<HTMLElement> {
  todo: Element<HTMLElement>;
  list: Element<HTMLElement>;
  inputWrap: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  button: Element<HTMLElement>;
  tasks: Task[];
  data: ITodoData[];
  isFirstLoad: boolean;
  onTasksUpdate: (data: ITodoData[]) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.tasks = [];
    this.data = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).todo;
    this.isFirstLoad = true;
    this.todo = new Element(this.el, 'div', 'todo-section');
    this.list = new Element(this.todo.el, 'div', 'task-list');
    this.inputWrap = new Element(this.todo.el, 'div', 'input-wrap');
    this.input = new Element(this.inputWrap.el, 'input', 'input-task');
    this.input.el.setAttribute('type', 'text');
    this.input.el.setAttribute('placeholder', 'New task');
    this.button = new Element(this.inputWrap.el, 'button', 'input-button', 'Add');

    this.data.forEach((el, i) => {
      this.addTask(el.task);
      this.tasks[i].setCheckbox(el.state);
    })
    this.isFirstLoad = false;

    this.input.el.oninput = () => {
      if (this.input.el.value.trim()) {
        this.button.el.classList.add('active');
      } else this.button.el.classList.remove('active');
    }
    this.input.el.onchange = () => {
      if (this.input.el.value.trim()) {
        this.addTask(this.input.el.value);
      } else {
        this.input.el.value = '';
        this.button.el.classList.remove('active');
      }
    }
    this.input.el.onblur = () => {
      if (!this.input.el.value.trim()) {
        this.button.el.classList.remove('active');
      }
    }

    this.button.el.onclick = () => {
      if (this.input.el.value.trim()) {
        this.addTask(this.input.el.value);
      }
    }
  }

  movePopup() {
    this.el.classList.toggle('todo-move');
  }

  addTask(value: string) {
    const task = new Task(this.list.el, 'task-item', value);
    task.onClick = () => {
      const i = this.tasks.indexOf(task);
      task.destroy();
      this.tasks.splice(i, 1);
      this.data.splice(i, 1);
      this.onTasksUpdate(this.data);
    }
    task.onStateChange = (state) => {
      const i = this.tasks.indexOf(task);
      this.data[i].state = state;
      this.onTasksUpdate(this.data);
    }
    task.onEdit = (value, state) => {
      const i = this.tasks.indexOf(task);
      this.data[i].task = value;
      this.data[i].state = state;
      this.onTasksUpdate(this.data);
    }
    this.tasks.push(task);
    if (!this.isFirstLoad) {
      this.data.push({
        task: value,
        state: false
      });
      this.onTasksUpdate(this.data);
    }
    this.input.el.value = '';
    this.button.el.classList.remove('active');
  }
}