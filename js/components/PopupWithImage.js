import Popup from './Popup';
import { getElement, getImageAlt } from '../utils/utils';
import { SELECTORS } from '../utils/constants';

class PopupWithImage extends Popup {
  open({ link, text }) {
    const popupImage = getElement(SELECTORS.POPUP_IMAGE, this._element);
    const popupCaption = getElement(SELECTORS.POPUP_CAPTION, this._element);
    popupImage.src = link;
    popupImage.alt = getImageAlt(link);
    popupCaption.textContent = text;
    super.open();
  }
}

export default PopupWithImage;
