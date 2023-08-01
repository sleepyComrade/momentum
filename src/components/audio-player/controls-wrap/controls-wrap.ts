import './style.css';
import { Element } from "../../../abstract/element";
import { Controls } from "../controls/controls";
import { Volume } from "../volume/volume";
import { ITrack } from '../../../interfaces';

export class ControlsWrap extends Element<HTMLElement> {
  title: Element<HTMLElement>;
  controls: Controls;
  volume: Volume;
  onPlay: () => void;
  onSwitch: (n: number) => void;
  playlist: { [sw: string]: ITrack[]; side: ITrack[]; };
  onInput: (value: number) => void;
  onClick: () => void;
  constructor(parent: HTMLElement, className: string, playlist: { [sw: string]: ITrack[]; side: ITrack[]; }) {
    super(parent, 'div', className);
    this.playlist = playlist;
    this.title = new Element(this.el, 'div', 'current-title');
    this.controls = new Controls(this.el, 'player-controls');
    this.volume = new Volume(this.el, 'volume-wrap');

    this.controls.onPlay = () => {
      this.onPlay();
    }
    this.controls.onSwitch = (n) => {
      this.onSwitch(n);
    }

    this.volume.onInput = (value) => {
      this.onInput(value);
    }
    this.volume.onClick = () => {
      this.onClick();
    }

    this.textOverflow(this.title, this.playlist[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).music][0]);
  }

  togglePlayButton() {
    this.controls.togglePlayButton();
  }

  textOverflow(element: Element<HTMLElement>, track: ITrack) {
    element.el.textContent = track.title.length > 18 ? track.title.slice(0, 18) + '..' : track.title;
    element.el.setAttribute('title', `${track.title}`);
  }

  getCurTitle(track: ITrack) {
    this.textOverflow(this.title, track);
  }

  getVolume() {
    return this.volume.getVolume();
  }

  setIcon(isMuted: boolean) {
    this.volume.setIcon(isMuted);
  }
}