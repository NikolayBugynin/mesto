export default class Card {
    constructor({ name, link, owner, _id, likes }, templateSelector, handleCardClick, handleConfirmPopup) {
        this._owner = owner
        this._name = name
        this._link = link
        this._id = _id
        this._likes = likes
        this._templateSelector = templateSelector
        this._handleCardClick = handleCardClick
        this._handleConfirmPopup = handleConfirmPopup
        this._card = this._getTemplate()
        this._elementImage = this._card.querySelector('.element__image')
        this._likeButton = this._card.querySelector('.element__like-button')
        this._title = this._card.querySelector('.element__title')
        this._deleteButton = this._card.querySelector('.element__delete-button')
        // console.log(owner, _id)

    }


    _removeDeleteButton() {
        if (this._owner !== this._Id)
            this._deleteButton.classList.add('element__delete-button_type_inactive')
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
        this._likeButton.addEventListener('click', () => {
            this._like()
        })

        this._elementImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link })
        })

        this._deleteButton.addEventListener('click', () => {
            this._handleConfirmPopup(this);


        });
    }

    removeCard() {
        this._card.remove();
        this._card = null;
    }

    _like() {

        this._likeButton.classList.toggle('element__like-button_type_active');
    }

    render() {

        this._title.textContent = this._name
        this._elementImage.src = this._link
        this._elementImage.alt = this._name

        this._makeListeners()
        this._removeDeleteButton()

        return this._card
    }
}



