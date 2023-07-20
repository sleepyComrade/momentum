export class Element<T extends HTMLElement> {
  el: T;

  constructor(parent: HTMLElement, tag = 'div', className = '', content = '') {
    this.el = document.createElement(tag) as T;
    this.el.className = className;
    this.el.textContent = content;
    if (parent) {
      parent.append(this.el);
    }
  }

  destroy() {
    this.el.remove();
  }
}
