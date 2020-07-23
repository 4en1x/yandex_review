import { getElement } from '../utils/utils';

class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = getElement(selector);
  }

  _updateContainer(data) {
    this._container.prepend(this._renderer(data));
  }

  render() {
    this._items.forEach(item => this._updateContainer(item));
  }

  addItem(element) {
    this._items.push(element);
    this._updateContainer(element);
  }
}

export default Section;
