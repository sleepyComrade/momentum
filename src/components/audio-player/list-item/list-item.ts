import './style.css';
import { Element } from "../../../abstract/element";
import { ITrack } from "../../../interfaces";

export class ListItem extends Element<HTMLElement> {
  title: Element<HTMLElement>;
  icon: Element<HTMLElement>;
  onClick: (bool: boolean) => void;
  constructor(parent: HTMLElement, className: string, track: ITrack) {
    super(parent, 'li', className);
    this.title = new Element(this.el, 'span', 'play-item-title');
    this.textOverflow(this.title, track);
    this.icon = new Element(this.el, 'div', 'list-play-icon');

    this.icon.el.onclick = () => {
      if (this.el.classList.contains('item-active')) {
        this.onClick(true);
      } else this.onClick(false);
    }
  }

  textOverflow(element: Element<HTMLElement>, track: ITrack) {
    element.el.textContent = track.title.length > 19 ? track.title.slice(0, 19) + '..' : track.title;
    element.el.setAttribute('title', `${track.title}`);
  }

  playPause() {
    if (this.el.classList.contains('item-active')) {
      this.icon.el.classList.toggle('pause');
      this.icon.el.scrollIntoView({behavior: "smooth", block: "center"});
    } else this.icon.el.classList.remove('pause');
  }

  addStyle() {
    this.el.classList.add('item-active');
  }

  removeStyle() {
    this.el.classList.remove('item-active');
  }
}