let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let titleProfile = document.querySelector(".profile__title");
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_specification');
let specificationProfile = document.querySelector('.profile__specification');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = titleProfile.textContent;
    jobInput.value = specificationProfile.textContent;
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
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);