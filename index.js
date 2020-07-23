import Card from './js/components/Card.js';
import PopupWithImage from './js/components/PopupWithImage';
import FormValidator from './js/components/FormValidator.js';
import Section from './js/components/Section';
import UserInfo from './js/components/UserInfo';
import PopupWithForm from './js/components/PopupWithForm.js';
import { initialCards } from './js/utils/mock';
import { SELECTORS, EVENTS } from './js/utils/constants';
import { getElement } from './js/utils/utils';
import { defaultFormConfig } from './js/utils/config';
import './index.css';

const userInfo = new UserInfo({
  nameSelector: SELECTORS.PROFILE_TITLE,
  descriptionSelector: SELECTORS.PROFILE_DESCRIPTIONS,
});

// Модальное окно редактирования информации
const editProfileInfoModal = new PopupWithForm(
  SELECTORS.POPUP_EDIT,
  (e, data) => {
    e.preventDefault();
    const { name, description } = data;
    userInfo.setUserInfo({ name, description });
    editProfileInfoModal.close();
  }
);
editProfileInfoModal.setEventListeners();

// Модальное окно создания карточки
const createCardModalForm = new PopupWithForm(
  SELECTORS.POPUP_NEW_CARD,
  (evt, data) => {
    evt.preventDefault();
    cardSection.addItem({
      name: data['place-name'],
      link: data['link'],
    });
    createCardModalForm.close();
  }
);
createCardModalForm.setEventListeners();

// Модальное окно открытия карточки
const showCardImageModal = new PopupWithImage(SELECTORS.POPUP_IMAGE_TYPE);
showCardImageModal.setEventListeners();

// Кнопки-открыватели модальных окошек
const openEditProfileInfoModalButton = getElement(SELECTORS.EDIT_BUTTON);
const openCreateCardModalButton = getElement(SELECTORS.ADD_BUTTON);

openEditProfileInfoModalButton.addEventListener(EVENTS.CLICK, () => {
  const userData = userInfo.getUserInfo();
  getElement(SELECTORS.POPUP_INPUT_NAME, editProfileInfoModal.getElement()).value = userData.name;
  getElement(SELECTORS.POPUP_INPUT_DESCRIPTION, editProfileInfoModal.getElement()).value = userData.description;
  editProfileInfoModal.open();
});

openCreateCardModalButton.addEventListener(EVENTS.CLICK, () => createCardModalForm.open());

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, SELECTORS.CARD_TEMPLATE, (data) =>
        showCardImageModal.open(data)
      );
      return card.getView();
    },
  },
  SELECTORS.PLACES_LIST
);

cardSection.render();

const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileInfoModal.getElement());
editProfileFormValidator.enableValidation();

const createCardFormValidator = new FormValidator(defaultFormConfig, createCardModalForm.getElement());
createCardFormValidator.enableValidation();
