import './style.css';
import { Element } from "../../../abstract/element";
import muted from "../../../assets/svg/volume-mute.svg";
import speakers from "../../../assets/svg/volume-up.svg";

export class Volume extends Element<HTMLElement> {
  slider: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  progress: Element<HTMLElement>;
  icon: Element<HTMLElement>;
  onInput: (value: number) => void;
  icons: typeof module[];
  onClick: () => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.icons = [muted, speakers];
    this.slider = new Element(this.el, 'div', 'volume-slider');
    this.input = new Element(this.slider.el, 'input', 'slider-progress');
    this.input.el.setAttribute('type', 'range');
    this.input.el.setAttribute('min', '0');
    this.input.el.setAttribute('max', '100');
    this.input.el.setAttribute('value', '70');
    this.progress = new Element(this.slider.el, 'div', 'volume-slider-progress');
    this.icon = new Element(this.el, 'div', 'volume-icon');

    this.volumeSlider();
    this.icon.el.style.backgroundImage = `url('${this.icons[1]}')`;

    this.icon.el.onclick = () => {
      this.onClick();
    }

    this.input.el.oninput = () => {
      this.volumeSlider();
      this.onInput(this.getVolume());
    }
  }

  volumeSlider() {
    const maxValue = this.input.el.getAttribute('max');
    const value = (+this.input.el.value / +maxValue) * 100 + "%";
    this.progress.el.style.width = value;
  }

  getVolume() {
    return +this.input.el.value / 100;
  }

  setIcon(isMuted: boolean) {
    const img = new Image();
    img.src = isMuted ? this.icons[1] + '' : this.icons[0] + '';
    img.onload = () => {
      this.icon.el.style.backgroundImage = `url('${img.src}')`;
    }
  }
}