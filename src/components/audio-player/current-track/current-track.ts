import './style.css';
import { Element } from "../../../abstract/element";
import { Progress } from "../progress/progress";
import { ControlsWrap } from "../controls-wrap/controls-wrap";
import { ITrack } from "../../../interfaces";

export class CurrentTrack extends Element<HTMLElement> {
  progress: Progress;
  controls: ControlsWrap;
  audio: HTMLAudioElement;
  trackNum: number;
  curTime: number;
  playlist: { [sw: string]: ITrack[]; side: ITrack[]; };
  onAddStyle: (num: number) => void;
  onRemoveStyle: (num: number) => void;
  isPLay: boolean;
  constructor(parent: HTMLElement, className: string, playlist: { [sw: string]: ITrack[]; side: ITrack[]; }) {
    super(parent, 'div', className);
    this.playlist = playlist;
    this.audio = new Audio();
    this.audio.src = this.getTrack(0);
    this.trackNum = 0;
    this.curTime = 0;
    this.isPLay = false;
    this.controls = new ControlsWrap(this.el, 'controls-wrap');
    this.progress = new Progress(this.el, 'progress-duration-wrap');

    this.controls.onPlay = () => {
      this.playPause();
    }

    this.controls.onSwitch = (n) => {
      this.switchAudio(n);
    }
  }

  initSwitch() {
    this.audio.pause();
    this.audio.src = this.getTrack(0);
    this.trackNum = 0;
    this.isPLay = false;
    this.curTime = 0;
    this.audio.currentTime = 0;
  }

  playAudio() {
    if (!this.isPLay) {
      this.audio.src = this.getTrack(this.trackNum);
      this.audio.currentTime = this.curTime;
      this.audio.play();
      this.isPLay = true;
    } else {
      this.audio.pause();
      this.isPLay = false;
    }
  }

  switchAudio(dir: number, n?: number) {
    this.curTime = 0;
    // halfCircles.forEach(el => el.style.transform = 'rotate(0deg)');
    // barSlider.style.transform = 'rotate(0deg)';
    // barCircle.style.transform = 'rotate(0deg)';
    if (this.isPLay) {
      this.isPLay = false;
    } else this.controls.togglePlayButton();
    this.onRemoveStyle(this.trackNum);
    if (dir === 1) this.trackNum = this.trackNum === this.playlist[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).music].length - 1 ? 0 : this.trackNum + 1;
    if (dir === -1) this.trackNum = this.trackNum === 0 ? this.playlist[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).music].length - 1 : this.trackNum - 1;
    if (dir === 0) this.trackNum = n;
    this.playAudio();
    this.onAddStyle(this.trackNum);
  }

  playPause() {
    this.audio.currentTime = this.curTime;
    this.controls.togglePlayButton();
    this.playAudio();
    this.onAddStyle(this.trackNum);
  }

  getTrack(num: number) {
    return this.playlist[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).music][num].src;
  }
}