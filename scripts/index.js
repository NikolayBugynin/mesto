let editButton = document.querySelector('.profile__edit-button');
let popupOpen = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__item_type-name');
let jobInput = document.querySelector('.popup__item_type-specification');

editButton.addEventListener('click', () => {
    popupOpen.classList.add('popup_opened');
});

popupClose.addEventListener('click', () => {
    popupOpen.classList.remove('popup_opened');
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__specification').textContent = jobInput.value;
    popupOpen.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 