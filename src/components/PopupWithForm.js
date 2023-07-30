import Popup from './Popup.js';
import { inactiveButtonClass } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._handleSubmit = handleSubmit;
    // submit button
    this._submitButton = this._popup.querySelector('.popup__button');
    this._inactiveButtonClass = inactiveButtonClass;
    this._buttonDefaultText;
    this._buttonTextLoading = 'Сохранение...';
  }

  _getInputsValue() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputsValue(userData) {
    this._inputList.forEach((input) => {
      input.value = userData[input.name];
    });
  }

  _buttonLoading() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._buttonDefaultText = this._submitButton.textContent;
    this._submitButton.textContent = this._buttonTextLoading;
  }

  _buttonDefault() {
    this._submitButton.textContent = this._buttonDefaultText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonLoading();
      this._handleSubmit(this._getInputsValue()).then(this.close()).finally(this._buttonDefault());
    });
  }
}
