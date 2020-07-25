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
    /* Можно лучше: e.preventDefault() лyчше было сразу в методе класса PopupWithForm прописать и не нужно
    было бы тогда вызывать его 2 раза в 2х экземплярах класса и передавать "e" в качестве
    аргумента в функцию-колбэк  */
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
    /* Можно лучше: e.preventDefault() лyчше было сразу в методе класса PopupWithForm прописать и не нужно
    было бы тогда вызывать его 2 раза в 2х экземплярах класса и передавать "e" в качестве
    аргумента в функцию-колбэк  */
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
/* Можно лучше: эти кнопки не меняются, поэтому можно перенести в constants.js */
const openEditProfileInfoModalButton = getElement(SELECTORS.EDIT_BUTTON);
const openCreateCardModalButton = getElement(SELECTORS.ADD_BUTTON);

openEditProfileInfoModalButton.addEventListener(EVENTS.CLICK, () => {
  /* Можно лучше: можно использовать Деструктуризацию переменных из userInfo.getUserInfo() */
  const userData = userInfo.getUserInfo();
  /* Можно лучше: немного запутанные 2 действия - лучше поместить их в понятные переменные и потом уже 
  присваивать им значения */
  getElement(SELECTORS.POPUP_INPUT_NAME, editProfileInfoModal.getElement()).value = userData.name;
  getElement(SELECTORS.POPUP_INPUT_DESCRIPTION, editProfileInfoModal.getElement()).value = userData.description;
  editProfileInfoModal.open();
});

openCreateCardModalButton.addEventListener(EVENTS.CLICK, () => createCardModalForm.open());

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      /* Можно лучше: в классе Card в конструктор поступает колбэк-функция handleCardClick,
      и ее можно было вообще без аргументов сделать, ведь "data" в конструкторе будет
      равно "data" в колбэке и в showCardImageModal.open(data) */
      const card = new Card(data, SELECTORS.CARD_TEMPLATE, (data) =>
      // ====================== Вот эта "data" ============ ^^^^ =====
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

/* мне нравится стиль написания кода - очень напоминает React/Redux, почти все строковые значения
вынесены в constants.js для одновременного изменения, если потребуется */

/* Надо исправить: в чек-листе указаны инструкции по тому, как должны быть организованы файлы в src
вот ссылка на него для студентов https://code.s3.yandex.net/web-developer/checklists/new-program/checklist-8/index.html
хотя лично мне всё нравится в Вашей структуре файлов */