import './style.css';
import { Element } from "../../abstract/element";
import { CurrentTrack } from "./current-track/currnet-track";
import { Playlist } from "./playlist/playlist";

export class Player extends Element<HTMLElement> {
  playlist: Playlist;
  currentTrack: CurrentTrack;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.currentTrack = new CurrentTrack(this.el, 'current-track-wrap');
    this.playlist = new Playlist(this.el, 'play-list');
  }
}