import './style.css';
import { Element } from "../../abstract/element";
import { getTimeOfDay } from "../../const";
import { setUnsplashAlert } from "../../translation-const";
import { ISimpleLang } from '../../interfaces';

export class SliderButtons extends Element<HTMLDivElement> {
  prevButton: Element<HTMLElement>;
  nextButton: Element<HTMLElement>;
  photoNum: number;
  onBgLoad: (value: string) => void;
  canSlide: boolean;
  unsplashAlert: ISimpleLang;
  onBgPreload: (source: string) => string;
  isFirstLoad: boolean;
  onCompleteLoad: () => void;
  onBgChange: (value: string) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.unsplashAlert = setUnsplashAlert;
    this.prevButton = new Element(this.el, 'button', 'slide-prev slider-icon');
    this.nextButton = new Element(this.el, 'button', 'slide-next slider-icon');
    this.photoNum = Math.floor(Math.random() * (21 - 1)) + 1;
    this.canSlide = true;
    this.isFirstLoad = true;

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

    window.addEventListener('DOMContentLoaded', () => {
      this.setBg();
    })
  }

  async getUnsplashPic() {
    const tags = this.onBgPreload('unsplash');
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=TbuL6Cn8QVuPRGQNGH15Bi8ccuZdqBrUhlevJEv2U9I`;
    const res = await fetch(url);
    const data = await res.json().catch(error => {
      console.log(error.message);
    });
    
    if (data !== undefined) {
      const img = new Image();
      img.src = data.urls.regular;
      img.onload = () => {
        this.completeBgSet(img.src);
      }
    } else {
      alert(this.unsplashAlert[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language]);
      this.onBgChange('sw');
    }
  }

  async getFlickrPic() {
    const tags = this.onBgPreload('flickr');
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b6c117d0294752bca406a020076da6b2&tags=${tags}&extras=url_h&format=json&nojsoncallback=1&safe_search=1&sort=relevance`;
    const res = await fetch(url);
    const data = await res.json();
  
    const filteredData = (data.photos.photo).filter((photo: any) => photo.url_h && photo.height_h < photo.width_h);
    const img = new Image();
    img.src = filteredData[Math.floor(Math.random() * (filteredData.length - 1))].url_h;
    img.onload = () => {
      this.completeBgSet(img.src);
    }
  }
  
  getSwCollectionPic() {
    const timeOfDay = getTimeOfDay();
    const bgNum = (this.photoNum + '').padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/sleepycomrade/Star-Wars-Collection/main/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
      this.completeBgSet(img.src);
    }
  }

  completeBgSet(src: string) {
    const style = `url('${src}')`;
    this.onBgLoad(style);
    this.canSlide = true;
    if (this.isFirstLoad) {
      this.onCompleteLoad();
      this.isFirstLoad = false;
    };
  }

  setBg() {
    this.canSlide = false;
    const bg = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).background;
    if (bg === 'sw') this.getSwCollectionPic();
    if (bg === 'unsplash') this.getUnsplashPic();
    if (bg === 'flickr') this.getFlickrPic();
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