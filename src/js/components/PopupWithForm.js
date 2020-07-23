import Popup from './Popup';

import { getElement } from '../utils/utils';
import { SELECTORS, EVENTS } from '../utils/constants';

class PopupWithForm extends Popup {
  constructor(element, submitCallback) {
    super(element);
    this._submitCallback = submitCallback;
    this._formElement = getElement(SELECTORS.POPUP_FORM, this._element);
  }

  _getInputValues() {
    const formElements = this._formElement.elements;
    const elements = {};
    [...formElements].forEach((el) => {
      if (el.type !== EVENTS.SUBMIT) {
        elements[el.name] = el.value;
      }
    });
    return elements;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener(EVENTS.SUBMIT, e => this._submitCallback(e, this._getInputValues()));
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
