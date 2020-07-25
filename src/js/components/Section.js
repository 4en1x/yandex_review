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
    /* тут немного нарушает правила Иммутабельности, ведь при добавлении
    нового элемента мы бы отправляли его на сервер и уже там бы обновлялся список
    всех items, поэтому использовать push стоит очень аккуратно в этих случаях. Код
    похожего класса был в теории у студентов по ссылке https://repl.it/@praktikum/lesson-05#components/Section.js 
    а теория сама в спринте 5 = https://praktikum.yandex.ru/learn/web/courses/370a2c73-45bf-439f-a747-ef4e3c0db48f/sprints/1703/topics/f27d0d85-d368-467e-a8a4-068277e68667/lessons/984b6648-17e2-471f-94a7-063d1884e15e/ 
    к тому же нет особого смысла добавлять в this._items новые элементы, ведь
    нового вызова render не происходит.*/
    this._items.push(element);
    this._updateContainer(element);
  }
}

export default Section;
