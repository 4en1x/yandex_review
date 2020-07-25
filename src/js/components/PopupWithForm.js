import Popup from './Popup';

import { getElement } from '../utils/utils';
import { SELECTORS, EVENTS } from '../utils/constants';

class PopupWithForm extends Popup {
  /*Можно лучше: в конструктор приходит Селектор, а не Элемент, поэтому
  лучше изменить название на то, что используется в Родительстком классе Popup */
  constructor(element, submitCallback) {
    super(element);
    this._submitCallback = submitCallback;
    this._formElement = getElement(SELECTORS.POPUP_FORM, this._element);
  }

  _getInputValues() {
    const formElements = this._formElement.elements;
    const elements = {};
    /* хорошо придумано */
    [...formElements].forEach((el) => {
      if (el.type !== EVENTS.SUBMIT) {
        elements[el.name] = el.value;
      }
    });
    return elements;
  }

  setEventListeners() {
    super.setEventListeners();
    /* Можно лучше: e.preventDefault() лyчше было сразу в методе класса PopupWithForm прописать и не нужно
    было бы тогда вызывать его 2 раза в 2х экземплярах класса и передавать "e" в качестве
    аргумента в функцию-колбэк  */
    this._element.addEventListener(EVENTS.SUBMIT, e => this._submitCallback(e, this._getInputValues()));
  }

  close() {
    super.close();
    // идеально
    this._formElement.reset();
  }
}

export default PopupWithForm;
