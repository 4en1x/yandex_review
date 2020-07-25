import { isEscButton, getElement } from '../utils/utils';
import { CLASSES, EVENTS } from '../utils/constants';

class Popup {
  constructor(selector) {
    this._element = getElement(selector);
    this._handleEscCloseListener = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    e.preventDefault();
    if (isEscButton(e)) {
      /* Нужно исправить: метод  this.close не принимает никаких аргументов */
      this.close(this._element);
    }
  }

  _handleCloseClick(e) {
    if (
      e.target.classList.contains(CLASSES.POPUP) ||
      e.target.classList.contains(CLASSES.POPUP_CLOSE)
    ) {
      this.close();
    }
  }

  getElement() {
    return this._element;
  }

  setEventListeners() {
    this._element.addEventListener(EVENTS.CLICK, e => this._handleCloseClick(e));
  }

  open() {
    this._element.classList.add(CLASSES.POPUP_OPEN);
    document.addEventListener(EVENTS.KEYUP, this._handleEscCloseListener);
  }

  close() {
    this._element.classList.remove(CLASSES.POPUP_OPEN);
    document.removeEventListener(EVENTS.KEYUP, this._handleEscCloseListener);
  }
}

export default Popup;
