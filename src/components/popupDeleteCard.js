import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');//можно перенести в
        this._handleSubmit = handleSubmit;

    }

    open = (element) => {
        super.open();
        this._element = element;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._element);
        });
    }
}