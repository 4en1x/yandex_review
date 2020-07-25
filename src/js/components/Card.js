import { getElement } from '../utils/utils';
import { SELECTORS, EVENTS, CLASSES } from '../utils/constants';

class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._text = name;
    this._link = link;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return getElement(
      SELECTORS.CARD,
      getElement(this._cardSelector).content
    ).cloneNode(true);
  }

  _setEventListeners() {
    getElement(SELECTORS.LIKE_BUTTON, this._element)
      .addEventListener(EVENTS.CLICK, () => this._handleLikeIcon());

    getElement(SELECTORS.DELETE_BUTTON, this._element)
      .addEventListener(EVENTS.CLICK, () => this._handleDeleteCard());

    getElement(SELECTORS.CARD_IMAGE, this._element)
      .addEventListener(EVENTS.CLICK, () => this._handlePreviewPicture());
  }

  _handleLikeIcon() {
    getElement(SELECTORS.LIKE_BUTTON, this._element)
      .classList.toggle(CLASSES.LIKE_BUTTON_ACTIVE);
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewPicture() {
    /* Можно лучше: в классе Card в конструктор поступает колбэк-функция handleCardClick,
      и ее можно было вообще без аргументов сделать, ведь "data" в конструкторе будет
      равно "data" в колбэке и в showCardImageModal.open(data) в index.js*/
    this._handleCardClick({
      link: this._link,
      text: this._text,
    });
  }

  getView() {
    // Публичный метод, возвращащий представление карточки;
    this._element = this._getTemplate();
    this._setEventListeners();

    getElement(SELECTORS.CARD_IMAGE, this._element).style.backgroundImage = `url(${this._link})`;
    getElement(SELECTORS.CARD_TITLE, this._element).textContent = this._text;

    return this._element;
  }
}

export default Card;
