import { popupPic, picLink, picCaption, openPopup } from "./index.js"

export class Card {
    constructor({ name, link }, templateSelector) {
        this._name = name
        this._link = link
        this._templateSelector = templateSelector
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _makeListeners() {
        this.card.querySelector('.element__delete-button').addEventListener('click', () => {
            this._remove()
        })

        this.card.querySelector('.element__like-button').addEventListener('click', () => {
            this._like()
        })

        this.card.querySelector('.element__image').addEventListener('click', () => {
            this._preview()
        })

    }

    _remove() {
        this.card.remove()
    }

    _like() {

        this.card.querySelector('.element__like-button').classList.toggle('element__like-button_type_active');
    }

    _preview() {
        openPopup(popupPic)
        picLink.alt = this._link;
        picLink.src = this._link;
        picCaption.textContent = this._name;
    }

    render() {
        this.card = this._getTemplate()

        console.log(this.card)
        const elementImage = this.card.querySelector('.element__image')
        this.card.querySelector('.element__title').textContent = this._name
        elementImage.src = this._link
        elementImage.alt = this._name
        this._makeListeners()


        return this.card
    }
}



