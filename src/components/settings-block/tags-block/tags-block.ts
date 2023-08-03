import './style.css';
import { Element } from "../../../abstract/element";
import { inputPlaceholderText } from "../../../translation-const";
import { ITagsPlaceholder } from "../../../interfaces";
import { Tag } from "../tag/tag";
import { getTimeOfDay } from "../../../const";

export class TagsBlock extends Element<HTMLElement> {
  overlay: Element<HTMLElement>;
  inputWrap: Element<HTMLElement>;
  input: Element<HTMLInputElement>;
  addButton: Element<HTMLElement>;
  icon: Element<HTMLElement>;
  applyButton: Element<HTMLElement>;
  tagsWrap: Element<HTMLElement>;
  applyButtonContent: { [en: string]: string; ru: string; };
  tagList: string[];
  placeholderContent: ITagsPlaceholder;
  unsplashTags: string;
  flickrTags: string;
  timeOfDay: string[];
  tags: Tag[];
  onTagUpdate: (list: string[]) => void;
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.applyButtonContent = {
      en: 'Apply tags',
      ru: 'Применить теги'
    };
    this.placeholderContent = inputPlaceholderText;
    this.tagList = [];
    this.unsplashTags = 'all';
    this.flickrTags = 'all';
    this.timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
    this.tags = [];

    this.overlay = new Element(this.el, 'div', 'overlay-tag');
    this.inputWrap = new Element(this.el, 'div', 'tag-input-container');
    this.input = new Element(this.inputWrap.el, 'input', 'tags');
    this.input.el.setAttribute('type', 'text');
    this.input.el.setAttribute('placeholder', 'Add a tag');
    this.input.el.setAttribute('maxlength', '20');
    this.addButton = new Element(this.inputWrap.el, 'div', 'tag-adding');
    this.icon = new Element(this.addButton.el, 'div', 'check-icon');
    this.applyButton = new Element(this.el, 'button', 'add-tag-button');
    this.tagsWrap = new Element(this.el, 'div', 'tags-wrap');

    const lsTags: string[] = JSON.parse(localStorage.getItem('sleepyComradeMomentum')).tags;
    this.tagList = lsTags.length > 5 ? [] : lsTags;
    if (this.tagList.length === 0 || this.timeOfDay.includes(this.tagList[0])) {
      this.tagList[0] = getTimeOfDay();
    }
    this.setContent(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
    this.tagList.forEach(el => {
      this.generateTag(el);
    })

    this.input.el.oninput = () => {
      const removedSpaces = this.input.el.value.replace(/\s/g, '');
      this.input.el.value = removedSpaces.replace(/[^a-zA-Z0-9а-яА-Я]/g, '');
    }
    this.input.el.onchange = () => {
      this.addTag();
    }

    this.icon.el.onclick = () => {
      this.addTag();
    }
  }

  setContent(lang: string) {
    this.applyButton.el.textContent = this.applyButtonContent[lang];
    this.input.el.placeholder = this.tagList.length >= 5 ?  this.placeholderContent[lang].full : this.placeholderContent[lang].add;
    this.input.el.disabled = this.tagList.length >= 5 ? true : false;
  }

  createApiChunk() {
    let tagListFlickrSum = '';
    let tagListUnsplashSum = '';
    this.tagList.forEach((el, i) => {
      tagListFlickrSum += i === 0 ? el : ',' + el;
      tagListUnsplashSum += i === 0 ? el : '%20' + el;
    })
    tagListFlickrSum += this.tagList.length === 0 ? 'all' : ',all';
    tagListUnsplashSum += this.tagList.length === 0 ? 'all' : '%20all';
    this.unsplashTags = tagListUnsplashSum;
    this.flickrTags = tagListFlickrSum;
  }

  generateTag(input: string) {
    const tag = new Tag(this.tagsWrap.el, 'tag-item', input);
    tag.onClick = () => {
      const i = this.tags.indexOf(tag);
      tag.destroy();
      this.tags.splice(i, 1);
      this.tagList.splice(i, 1);
      this.onTagUpdate(this.tagList);
      if (this.tagList.length === 4) {
        this.input.el.placeholder = this.placeholderContent[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].add;
        this.input.el.disabled = false;
      }
    }
    this.tags.push(tag);
    this.createApiChunk();
  }

  addTag() {
    if (!this.input.el.value || this.tagList.includes(this.input.el.value)) {
      this.input.el.value = '';
      return;
    } else {
      this.tagList.push(this.input.el.value);
      this.generateTag(this.input.el.value);
      this.input.el.value = '';
      this.onTagUpdate(this.tagList);
      if (this.tagList.length >= 5) {
        this.input.el.placeholder = this.placeholderContent[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language].full;
        this.input.el.disabled = true;
      }
    }
  }
}