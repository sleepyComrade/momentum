import './style.css';
import { Element } from "../../abstract/element";
import { ILangGreetings } from "../../interfaces";
import { greetings } from "../../translation-const";
import { getTimeOfDay } from "../../const";

export class Greeting extends Element<HTMLDivElement> {
  greetings: ILangGreetings;
  currentGreeting: Element<HTMLElement>;
  autoInput: Element<HTMLElement>;
  inputCalibration: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  onNameChange: (value: string) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.greetings = greetings;
    this.currentGreeting = new Element(this.el, 'span', 'greeting');
    this.autoInput = new Element(this.el, 'div', 'auto-input');
    this.inputCalibration = new Element(this.autoInput.el, 'span', 'input-calibration');
    this.input = new Element(this.autoInput.el, 'input', 'name');
    this.input.el.setAttribute('type', 'text');
    this.input.el.setAttribute('placeholder', this.greetings[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language]['placeholder']);

    this.input.el.onkeydown = (e) => {
      if (e.key === 'Enter') {
        this.input.el.blur();
      }
    }
    this.input.el.onblur = () => {
      this.isNameLong();
      this.updateSize();
    }
    this.input.el.oninput = () => {
      this.isNameLong();
      this.updateSize();
    };

    this.input.el.value = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).name;
    this.updateSize();

    window.addEventListener('beforeunload', () => {
      this.onNameChange(this.input.el.value);
    });
  }

  showGreeting(lang: string) {
    this.currentGreeting.el.textContent = `${this.greetings[lang][getTimeOfDay()]}, `;
    this.input.el.setAttribute('placeholder', this.greetings[lang]['placeholder']);
  }

  updateSize() {    
    this.inputCalibration.el.textContent = this.input.el.value.length === 0 ? this.input.el.getAttribute('placeholder') : this.input.el.value;
    this.input.el.style.width = `${this.inputCalibration.el.getBoundingClientRect().width}px`;
  }

  isNameLong() {
    if (this.input.el.value.length > 19) {
      this.input.el.value = this.input.el.value.slice(0, 19);
    }
  }

  setDefaultState(state: boolean) {
    if (!state) {
      this.el.style.scale = '0';
      this.el.classList.toggle('block-zero-height');
    }
    this.el.classList.add('block-transition');
  }

  setState(state: boolean) {
    this.el.style.scale = state ? '1' : '0';
    this.el.classList.toggle('block-zero-height');
  }
}