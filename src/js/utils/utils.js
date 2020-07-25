import { ESC } from './constants';

/* используется 1 раз в коде в Popup.js - возможно, и не стоило выносить ее в константу */
export const isEscButton = e => e.which === ESC;

export const getElement = (selector, element = document) => element.querySelector(selector);

export const getElements = (selector, element = document) => element.querySelectorAll(selector);

/* используется 1 раз в коде в PopupWithImage.js - возможно, и не стоило выносить ее в константу */
export const getImageAlt = link => `Изображение ${link}`;

/* в целом всегда хорошая идея выносить в utils функции, которые нужно использовать
в разных частях кода */
