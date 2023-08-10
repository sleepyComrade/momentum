import './style.css';
import { Element } from "../../abstract/element";

export class Quote extends Element<HTMLElement> {
  button: Element<HTMLElement>;
  quoteWrap: Element<HTMLElement>;
  quote: Element<HTMLElement>;
  author: Element<HTMLElement>;
  degree: number;
  quotesTheme: { [sw: string]: string; side: string; };
  constructor(parent: HTMLElement, className: string) {
    super(parent, 'div', className);
    this.degree = 180;
    this.quotesTheme = {
      sw: 'sw-quotes',
      side: 'quotes'
    };
    this.button = new Element(this.el, 'button', 'change-quote');
    this.quoteWrap = new Element(this.el, 'div');
    this.quote = new Element(this.quoteWrap.el, 'div', 'quote');
    this.author = new Element(this.quoteWrap.el, 'div', 'author');

    this.button.el.onclick = () => {
      this.getQuotes(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
      this.button.el.style.transform = `rotate(${this.degree}deg)`;
      this.degree += 180;
    }

    this.getQuotes(JSON.parse(localStorage.getItem('sleepyComradeMomentum')).language);
  }

  async getQuotes(lang: string) {
    try {
      const quotes = `https://raw.githubusercontent.com/sleepycomrade/Star-Wars-Collection/main/quotes/${this.quotesTheme[JSON.parse(localStorage.getItem('sleepyComradeMomentum')).quotes]}-${lang}.json`;
      const res = await fetch(quotes);
      const data = await res.json();
    
      const randomQuoteNum = Math.floor(Math.random() * (data.quotes.length - 1));
      const randomQuote = data.quotes[randomQuoteNum];
      this.quote.el.textContent = `"${randomQuote.quote}"`;
      this.author.el.textContent = randomQuote.author;
    } catch (error) {
      console.log(error.message);
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