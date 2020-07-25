export const ESC = 27;

// selectors
export const SELECTORS =  {
  POPUP_IMAGE: '.popup__image',
  POPUP_CAPTION: '.popup__caption',
  POPUP_FORM: '.popup__form',
  POPUP_INPUT: '.popup__input',
  POPUP_BUTTON: '.popup__button',
  CARD: '.card',
  LIKE_BUTTON: '.card__like-button',
  DELETE_BUTTON: '.card__delete-button',
  CARD_IMAGE: '.card__image',
  CARD_TITLE: '.card__title',
  PROFILE_TITLE: '.profile__title',
  PROFILE_DESCRIPTIONS: '.profile__description',
  POPUP_EDIT: '.popup_type_edit',
  POPUP_NEW_CARD: '.popup_type_new-card',
  POPUP_IMAGE_TYPE: '.popup_type_image',
  POPUP_INPUT_NAME: '.popup__input_type_name',
  POPUP_INPUT_DESCRIPTION: '.popup__input_type_description',
  EDIT_BUTTON: '.profile__edit-button',
  ADD_BUTTON: '.profile__add-button',
  PLACES_LIST: '.places__list',
  CARD_TEMPLATE: '.card-template',
};

// classes
export const CLASSES = {
  POPUP: 'popup',
  POPUP_OPEN: 'popup_is-opened',
  POPUP_CLOSE: 'popup__close',
  POPUP_BUTTON_DISABLED: 'popup__button_disabled',
  POPUP_INPUT_ERROR: 'popup__input_type_error',
  POPUP_ERROR: 'popup__error_visible',
  LIKE_BUTTON_ACTIVE: 'card__like-button_is-active'
};

// events

/* Скорее всего имена нативных событий браузера вряд ли изменятся,
поэтому не было особого надобности выносить их в константы, ведь не
скоро понадобится изменять их название одновременно во всех местах, где 
они используются в коде */
export const EVENTS = {
  KEYUP: 'keyup',
  CLICK: 'click',
  SUBMIT: 'submit',
  INPUT: 'input',
};

/* Отличное решение */
