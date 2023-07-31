import './style.css';
import { Element } from "../../../abstract/element";

export class Controls extends Element<HTMLElement> {
  prevButton: Element<HTMLElement>;
  playButton: Element<HTMLElement>;
  nextButton: Element<HTMLElement>;
  onPlay: () => void;
  onSwitch: (n: number) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.prevButton = new Element(this.el, 'button', 'play-prev player-icon');
    this.playButton = new Element(this.el, 'button', 'play player-icon');
    this.nextButton = new Element(this.el, 'button', 'play-next player-icon');

    this.prevButton.el.onclick = () => {
      this.onSwitch(-1);
    }

    this.playButton.el.onclick = () => {
      this.onPlay();
    }

    this.nextButton.el.onclick = () => {
      this.onSwitch(1);
    }
  }

  togglePlayButton = () => {
    this.playButton.el.classList.toggle('pause');
  }
}