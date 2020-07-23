import { ESC } from './constants';

export const isEscButton = e => e.which === ESC;

export const getElement = (selector, element = document) => element.querySelector(selector);

export const getElements = (selector, element = document) => element.querySelectorAll(selector);

export const getImageAlt = link => `Изображение ${link}`;
