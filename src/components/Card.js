export default class Card {
  constructor(
    { name, link, owner, _id, likes },
    templateSelector,
    handleCardClick,
    handleConfirmPopup,
    myID,
    setLike,
    removeLike,
  ) {
    this._ownerId = owner._id;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmPopup = handleConfirmPopup;
    this._card = this._getTemplate();
    this._elementImage = this._card.querySelector('.element__image');
    this._likeButton = this._card.querySelector('.element__like-button');
    this._title = this._card.querySelector('.element__title');
    this._deleteButton = this._card.querySelector('.element__delete-button');
    this._scoreLikes = this._card.querySelector('.element__like-score');
    this._myID = myID;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._myHeart = false;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _showDeleteButton() {
    if (this._ownerId === this._myID) {
      this._deleteButton.classList.remove('element__delete-button_type_inactive');
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // like
  _changeColorHeart() {
    this._likeButton.classList.toggle('element__like-button_type_active');
  }

  _setHeart() {
    this._setLike(this._id).then(() => {
      this._changeColorHeart();
      this._scoreLikes.textContent = this._likes.length + 1;
    });
  }

  _removeHeart() {
    this._removeLike(this._id).then(() => {
      this._changeColorHeart();
      this._scoreLikes.textContent = this._likes.length - 1;
    });
  }

  _checkMyHeart() {
    this._likes.find((like) => {
      if (like._id === this._myID) {
        this._myHeart = true;
      } else {
        this._myHeart = false;
      }
    });
  }

  // edit node
  _editCard() {
    this._title.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    if (this._likes.length) {
      this._scoreLikes.textContent = this._likes.length;
      this._checkMyHeart();
      if (this._myHeart) {
        this._changeColorHeart();
      }
    }
  }

  // add listeners
  _makeListeners() {
    this._likeButton.addEventListener('click', () => {
      this._setHeart();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleConfirmPopup(this);
    });
  }

  render() {
    this._editCard();
    this._makeListeners();
    this._showDeleteButton();
    return this._card;
  }
}
