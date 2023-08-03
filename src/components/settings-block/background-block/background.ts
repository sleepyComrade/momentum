import './style.css';
import { Element } from "../../../abstract/element";
import { Block} from "../block/block";
import { TagsBlock } from "../tags-block/tags-block";

export class Background extends Block {
  select: Element<HTMLSelectElement>;
  option1: Element<HTMLOptionElement>;
  option2: Element<HTMLOptionElement>;
  option3: Element<HTMLOptionElement>;
  tags: TagsBlock;
  onTagUpdate: (list: string[]) => void;
  constructor(parent: HTMLElement) {
    super(parent);
    this.el.classList.add('setting-background');
    this.select = new Element(this.el, 'select');
    this.select.el.setAttribute('name', 'background');
    this.select.el.setAttribute('id', 'background');
    this.option1 = new Element(this.select.el, 'option', '', 'Star Wars Collection');
    this.option1.el.setAttribute('value', 'sw');
    this.option2 = new Element(this.select.el, 'option', '', 'Unsplash');
    this.option2.el.setAttribute('value', 'unsplash');
    this.option3 = new Element(this.select.el, 'option', '', 'Flickr');
    this.option3.el.setAttribute('value', 'flickr');

    this.tags = new TagsBlock(this.el, 'tags-block');
    
    this.tags.onTagUpdate = (list) => {
      this.onTagUpdate(list);
    }
  }

  setLang() {
    this.tags.setContent(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
  }
}