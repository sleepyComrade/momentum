import './style.css';
import { Element } from "../../abstract/element";
import { getTimeOfDay } from "../../const";

export class SliderButtons extends Element<HTMLDivElement> {
  prevButton: Element<HTMLElement>;
  nextButton: Element<HTMLElement>;
  photoNum: number;
  onBgLoad: (value: string) => void;
  canSlide: boolean;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.prevButton = new Element(this.el, 'button', 'slide-prev slider-icon');
    this.nextButton = new Element(this.el, 'button', 'slide-next slider-icon');
    this.photoNum = Math.floor(Math.random() * (21 - 1)) + 1;
    this.canSlide = true;

    this.prevButton.el.onclick = () => {
      this.getSlidePrev();
    }
    this.nextButton.el.onclick = () => {
      this.getSlideNext();
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.getSlideNext();
      if (e.key === 'ArrowLeft') this.getSlidePrev();
    })

    this.setBg();
  }
  
  getSwCollectionPic() {
    const timeOfDay = getTimeOfDay();
    const bgNum = (this.photoNum + '').padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/sleepycomrade/Star-Wars-Collection/main/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
      const style = `url('${img.src}')`;
      this.onBgLoad(style);
      this.canSlide = true;
    }
  }

  setBg() {
    this.canSlide = false;
    this.getSwCollectionPic();
  }

  getSlideNext() {
    if (this.canSlide) {
      this.photoNum = this.photoNum === 20 ? 1 : this.photoNum + 1;
      this.setBg();
    }
  }
  
  getSlidePrev() {
    if (this.canSlide) {
      this.photoNum = this.photoNum === 1 ? 20 : this.photoNum - 1;
      this.setBg();
    }
  }
}