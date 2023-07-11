import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._handleSubmit = handleSubmit;
    }


    close() {
        super.close();
        this._form.reset();
    }

    _getInputsValue() {
        this._values = {};
        this._inputList.forEach((input) => {
            this._values[input.name] = input.value;
        });

        return this._values;
    }

    setInputsValue(userData) {
        this._inputList.forEach((input) => {
            input.value = userData[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputsValue());
            this.close();
        });


    }

}