import './style.css';
import { Element } from "../../abstract/element";
import { CurrentTrack } from "./current-track/current-track";
import { Playlist } from "./playlist/playlist";
import { playLists } from "../../const";
import { ITrack } from "../../interfaces";

export class Player extends Element<HTMLElement> {
  playlist: Playlist;
  currentTrack: CurrentTrack;
  playlists: { [sw: string]: ITrack[]; side: ITrack[]; };
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.playlists = playLists;
    this.currentTrack = new CurrentTrack(this.el, 'current-track-wrap', this.playlists);
    this.playlist = new Playlist(this.el, 'play-list', this.playlists);

    this.currentTrack.onAddStyle = (num) => {
      this.playlist.addStyle(num);
    }

    this.currentTrack.onRemoveStyle = (num) => {
      this.playlist.removeStyle(num);
    }

    this.playlist.onClick = (bool, index) => {      
      if (bool) {
        this.currentTrack.playPause();
      } else this.currentTrack.switchAudio(0, index);
    }
  }

  setDefaultState(state: boolean) {
    if (!state) {
      this.el.style.scale = '0';
    }
    this.el.classList.add('block-transition');
  }

  setState(state: boolean) {
    this.el.style.scale = state ? '1' : '0';
  }
}