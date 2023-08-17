import './style.css';
import { Element } from "../../../abstract/element";
import { ListItem } from "../list-item/list-item";
import { ITrack } from "../../../interfaces";

export class Playlist extends Element<HTMLElement> {
  items: ListItem[];
  playlist: { [sw: string]: ITrack[]; side: ITrack[]; };
  onClick: (bool: boolean, index: number) => void;
  constructor(parent: HTMLElement, className: string, playlist: { [sw: string]: ITrack[]; side: ITrack[]; }) {
    super(parent, 'ul', className);
    this.playlist = playlist;
    this.items = [];
    this.createPlaylist();
  }

  createPlaylist() {
    if (this.items.length) {
      this.items.forEach(el => el.destroy());
    }
    this.items = [];
    this.playlist[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).music].forEach(el => {
      const item = new ListItem(this.el, 'play-item', el);
      const index = this.items.length;
      item.onClick = (bool) => {
        this.onClick(bool, index);
      }
      this.items.push(item);
    })
  }

  addStyle(num: number) {
    this.items[num].addStyle();
    this.items.forEach(el => {
      el.playPause();
    })
  }

  removeStyle(num: number) {
    this.items[num].removeStyle();
  }
}