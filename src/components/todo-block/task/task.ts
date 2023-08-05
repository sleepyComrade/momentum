import './style.css';
import { Element } from "../../../abstract/element";

export class Task extends Element<HTMLElement> {
  taskCheck: Element<HTMLElement>;
  checkbox: Element<HTMLInputElement>;
  value: Element<HTMLElement>;
  deleteButton: Element<HTMLElement>;
  onClick: () => void;
  buttonsBlock: Element<HTMLElement>;
  editButton: Element<HTMLElement>;
  content: string;
  input: Element<HTMLInputElement>;
  applyButton: Element<HTMLElement>;
  applyWrap: Element<HTMLElement>;
  onStateChange: (state: boolean) => void;
  onEdit: (value: string, state: boolean) => void;
  constructor(parent: HTMLElement, className: string, value: string) {
    super(parent, 'div', className);
    this.content = value;
    this.generateTask(this.content);
  }

  generateTask(value : string) {
    this.taskCheck = new Element(this.el, 'div', 'task-check');
    this.checkbox = new Element(this.taskCheck.el, 'input', 'task-checkbox');
    this.checkbox.el.setAttribute('type', 'checkbox');
    this.value = new Element(this.taskCheck.el, 'p', 'task-value', value);
    this.value.el.setAttribute('spellcheck', 'false');
    this.buttonsBlock = new Element(this.el, 'div', 'task-btns-block');
    this.editButton = new Element(this.buttonsBlock.el, 'div', 'edit-task');
    this.deleteButton = new Element(this.buttonsBlock.el, 'div', 'delete-task');

    this.deleteButton.el.onclick = () => {
      this.onClick();
    }

    this.checkbox.el.onclick = () => {
      if (this.checkbox.el.checked) {
        this.taskCheck.el.classList.add('finished');
      } else {
        this.taskCheck.el.classList.remove('finished');
      }
      this.onStateChange(this.checkbox.el.checked);
    }

    this.editButton.el.onclick = () => {
      const boxState = this.checkbox.el.checked;
      this.taskCheck.destroy();
      this.buttonsBlock.destroy();
      this.input = new Element(this.el, 'input', 'edit-input');
      this.input.el.value = this.content;
      this.applyWrap = new Element(this.el, 'div', 'apply-task-wrap');
      this.applyButton = new Element(this.applyWrap.el, 'div', 'apply-edit-task');
      this.input.el.focus();
  
      this.applyButton.el.onclick = () => {
        this.changeContent(boxState);
      }

      this.input.el.onkeydown = (e) => {
        if (e.key === 'Enter') {
          this.input.el.blur();
        }
      }
      this.input.el.onblur = () => {
        this.changeContent(boxState);
      }
    }
  }

  changeContent(boxState: boolean) {
    this.content = this.input.el.value;
    if (this.content.trim()) {
      this.input.destroy();
      this.applyWrap.destroy();
      this.generateTask(this.content);
      if (boxState) {
        this.checkbox.el.checked = true;
        this.taskCheck.el.classList.add('finished');
      }
      this.onEdit(this.content, boxState);
    } else this.onClick();
  }

  setCheckbox(state: boolean) {
    if (state) {
      this.checkbox.el.checked = true;
      this.taskCheck.el.classList.add('finished');
    }
  }
}