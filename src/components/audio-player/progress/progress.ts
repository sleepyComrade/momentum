import './style.css';
import { Element } from "../../../abstract/element";
import imgSw from "../../../assets/img/player-img.png";
import imgSide from "../../../assets/img/player-img0.png";

export class Progress extends Element<HTMLElement> {
  barWrap: Element<HTMLElement>;
  bar: Element<HTMLElement>;
  halfCircle1: Element<HTMLElement>;
  halfCircle2: Element<HTMLElement>;
  halfCircleCover: Element<HTMLElement>;
  barSliderWrap: Element<HTMLElement>;
  barSliderVisible: Element<HTMLElement>;
  barSliderInvisible: Element<HTMLElement>;
  barCircle: Element<HTMLElement>;
  audioDuration: Element<HTMLElement>;
  durationContent: Element<HTMLElement>;
  onSetTime: (degree: number) => void;
  onRotate: () => number;
  halfCircles: Element<HTMLElement>[];
  onTimeConvert: (isDuration: boolean) => number;
  isMoving: boolean;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.halfCircles = [];
    this.isMoving = false;
    this.barWrap = new Element(this.el, 'div', 'bar-container');
    this.bar = new Element(this.barWrap.el, 'div', 'progress-bar');
    this.halfCircle1 = new Element(this.bar.el, 'div', 'half-circle bar-transition');
    this.halfCircles.push(this.halfCircle1);
    this.halfCircle2 = new Element(this.bar.el, 'div', 'half-circle bar-transition');
    this.halfCircles.push(this.halfCircle2);
    this.halfCircleCover = new Element(this.bar.el, 'div', 'half-circle-cover bar-transition');
    this.barSliderWrap = new Element(this.bar.el, 'div', 'bar-slider bar-transition');
    this.barSliderVisible = new Element(this.barSliderWrap.el, 'div', 'bar-slider-visible');
    this.barSliderInvisible = new Element(this.barSliderWrap.el, 'div', 'bar-slider-invisible');
    this.barCircle = new Element(this.bar.el, 'div', 'bar-circle bar-transition');
    this.audioDuration = new Element(this.el, 'div', 'audio-duration');
    this.durationContent = new Element(this.audioDuration.el, 'span', 'current-total');

    this.initCurTime();
    this.setPlayerImg();

    this.bar.el.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('progress-bar') ||
      target.classList.contains('half-circle-cover') ||
      target.classList.contains('half-circle')) {
        this.getCurTimeOnMouse(e.clientX, e.clientY);
        this.rotateProgressBar();
        this.durationContent.el.textContent = `${this.convertTime(false)} / ${this.convertTime(true)}`;
      }
    }

    this.barSliderWrap.el.onmousedown = (e) => {
      this.isMoving = true;
      this.getCurTimeOnMouse(e.clientX, e.clientY);
      this.barCircle.el.classList.remove('bar-transition');
      this.barSliderWrap.el.classList.remove('bar-transition');
      this.halfCircles.forEach(el => el.el.classList.remove('bar-transition'));
      this.halfCircleCover.el.classList.remove('bar-transition');
    }

    document.addEventListener('mousemove', (e) => {
      if (this.isMoving) {
        this.getCurTimeOnMouse(e.clientX, e.clientY);
        this.rotateProgressBar();
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.isMoving) {
        this.barCircle.el.classList.add('bar-transition');
        this.barSliderWrap.el.classList.add('bar-transition');
        this.halfCircles.forEach(el => el.el.classList.add('bar-transition'));
        this.halfCircleCover.el.classList.add('bar-transition');
      }
      this.isMoving = false;
    });
  }

  setPlayerImg() {
    const img = new Image();
    img.src = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).music === 'sw' ? imgSw : imgSide;
    img.onload = () => {
      this.barCircle.el.style.backgroundImage = `url('${img.src}')`;
    }
  }

  getCurrentDegree(ax: number, ay: number, bx: number, by: number) {
    const angleRad = Math.atan((ay - by) / (ax - bx));
    const angleDeg = angleRad * 180 / Math.PI;
    return angleDeg;
  }

  getCurTimeOnMouse(ex: number, ey: number) {
    let degree;
    const barDomRect = this.bar.el.getBoundingClientRect();
    const centerX = barDomRect.left + barDomRect.width / 2;
    const centerY = barDomRect.top + barDomRect.height / 2;
    const x = ex;
    const y = ey;
    if (centerX < x && centerY > y || centerX < x && centerY < y) {
      degree = 90 + this.getCurrentDegree(centerX, centerY, x, y);
    }
    if (centerX > x && centerY < y || centerX > x && centerY > y) {
      degree = 270 + this.getCurrentDegree(centerX, centerY, x, y);
    }
    if (centerX === x && centerY > y) degree = 0;
    if (centerX === x && centerY < y) degree = 180;
    if (centerY === y && centerX < x) degree = 90;
    if (centerY === y && centerX > x) degree = 270;
  
    this.onSetTime(degree);
  }

  rotateProgressBar() {
    const durationDegree = this.onRotate();
    this.barCircle.el.style.transform = `rotate(-${durationDegree}deg)`;
    this.barSliderWrap.el.style.transform = `rotate(${durationDegree}deg)`;
    this.halfCircles.forEach(el => {
      el.el.style.transform = `rotate(${durationDegree}deg)`;
      if (durationDegree >= 180) {
        this.halfCircles[0].el.style.transform = 'rotate(180deg)';
        this.halfCircleCover.el.style.opacity = '0';
      } else {
        this.halfCircleCover.el.style.opacity = '1';
      }
    })
  }

  setBarZero() {
    this.barCircle.el.style.transform = `rotate(-0deg)`;
    this.barSliderWrap.el.style.transform = `rotate(0deg)`;
    this.halfCircles.forEach(el => el.el.style.transform = `rotate(${0}deg)`)
    this.halfCircleCover.el.style.opacity = '1';
  }

  initCurTime() {
    this.durationContent.el.textContent = '0:00 / 0:00';
  }

  convertTime(isTotal: boolean) {
    const time = this.onTimeConvert(true);
    const curTime = this.onTimeConvert(false);
    if (Number.isNaN(time) || Number.isNaN(curTime)) return '0:00';
    let seconds: string, minutes: string;
    if (isTotal) {
      seconds = time % 60 === 0 ? '00' : (time % 60 + '').padStart(2, '0');
      minutes = time > 60 ? ((time - +seconds) / +'60') + '' : '0';
    } else {
      seconds = curTime % 60 === 0 ? '00' : (curTime % 60 + '').padStart(2, '0');
      minutes = curTime > 60 ? ((curTime - +seconds) / +'60') + '' : '0';
    }
    return `${minutes}:${seconds}`;
  }

  setTime() {
    if (`${this.convertTime(false)} / ${this.convertTime(true)}` !== '0:00 / 0:00') {
      this.durationContent.el.textContent = `${this.convertTime(false)} / ${this.convertTime(true)}`;
    }
  }
}