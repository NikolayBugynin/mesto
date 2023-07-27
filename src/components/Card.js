export default class Card {
    constructor({ name, link, myid, ownerId }, templateSelector, handleCardClick, handleConfirmPopup) {

        this._handleCardClick = handleCardClick
        // this._myid = myid
        // this._ownerId = ownerId
        this._name = name
        this._link = link
        this._templateSelector = templateSelector
        this._handleConfirmPopup = handleConfirmPopup
        this._card = this._getTemplate()
        this._elementImage = this._card.querySelector('.element__image')
        this._likeButton = this._card.querySelector('.element__like-button')
        this._title = this._card.querySelector('.element__title')
        this._deleteButton = this._card.querySelector('.element__delete-button')

    }


    // _changeVisibleForDeleteButton() {
    //     this._myId === this._ownerId
    //         ? (this._deleteButton.style.display = "block")
    //         : (this._deleteButtont.style.display = "none");
    // }

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

            // this._changeVisibleForDeleteButton();
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


        return this._card
    }
}



