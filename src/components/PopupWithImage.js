import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._picCaption = this._popup.querySelector('.popup-picture__caption');
        this._picLink = this._popup.querySelector('.popup-picture__image');

    }

    open(item) {
        this._picLink.alt = item.link;
        this._picLink.src = item.link;
        this._picCaption.textContent = item.name;

        super.open();
    };


}