import './style.css';
import { Element } from "../../abstract/element";
import { Popup } from "../settings-block/popup/popup";

export class SettingsBlock extends Element<HTMLElement> {
  icon: Element<HTMLElement>;
  overlay: Element<HTMLElement>;
  popup: Popup;
  isVisible: boolean;
  onLangChange: (value: string) => void;
  onTagUpdate: (list: string[]) => void;
  onApply: () => void;
  onBgChange: (value: string) => void;
  onWidgetChange: (state: boolean, i: number) => void;
  onThemeChange: (state: boolean, i: number) => void;
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

    this.popup.onLangChange = (value) => {
      this.onLangChange(value);
    }
    this.popup.onTagUpdate = (list) => {
      this.onTagUpdate(list);
    }
    this.popup.onApply = () => {
      this.onApply();
    }
    this.popup.onBgChange = (value) => {
      this.onBgChange(value);
    }
    this.popup.onWidgetChange = (state, i) => {
      this.onWidgetChange(state, i);
    }
    this.popup.onThemeChange = (state, i) => {
      this.onThemeChange(state, i);
    }
  }

  toggleSettings() {
    this.popup.movePopup();
    this.icon.el.style.transform = this.isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
    this.overlay.el.classList.toggle('main-overlay-active');
    this.isVisible = !this.isVisible;
  }

  setLang() {
    this.popup.setLang();
  }

  getTags(source: string) {
    return this.popup.getTags(source);
  }

  disableTags() {
    this.popup.disableTags();
  }

  setBgValue() {
    this.popup.setBgValue();
  }
}