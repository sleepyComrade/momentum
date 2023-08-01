import './style.css';
import { Element } from "../../abstract/element";
import { Popup } from "../settings-block/popup/popup";

export class SettingsBlock extends Element<HTMLElement> {
  icon: Element<HTMLElement>;
  overlay: Element<HTMLElement>;
  popup: Popup;
  isVisible: boolean;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.isVisible = false;
    this.overlay = new Element(this.el, 'div', 'main-overlay');
    this.icon = new Element(this.el, 'div', 'settings-icon');
    this.popup = new Popup(this.el, 'settings-wrap');

    this.icon.el.onclick = () => {
      this.toggleSettings();
    }

    this.overlay.el.onclick = () => {
      this.toggleSettings();
    }
  }

  toggleSettings() {
    this.popup.movePopup();
    this.icon.el.style.transform = this.isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
    this.overlay.el.classList.toggle('main-overlay-active');
    this.isVisible = !this.isVisible;
  }
}