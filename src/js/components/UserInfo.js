import { getElement } from '../utils/utils';

class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = getElement(nameSelector);
    this._descriptionElement = getElement(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}

export default UserInfo;

//  все отлично