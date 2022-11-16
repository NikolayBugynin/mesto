let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_specification');

function popupOpen() {
    popup.classList.add('popup_opened');
    namePopup.value = nameProfile.textContent;
    specificationPopup.value = specificationProfile.textContent;
}
editButton.addEventListener('click', popupOpen);

function popupClose() {
    popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__specification').textContent = jobInput.value;
    popupOpen.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);