export const editButton = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup-profile');
export const titleProfile = document.querySelector(".profile__title");
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_specification');
export const specificationProfile = document.querySelector('.profile__specification');
export const popupAdd = document.querySelector('.popup-add');
export const addButton = document.querySelector('.profile__add-button');
export const popupPic = document.querySelector('.popup-picture');
export const picLink = popupPic.querySelector('.popup-picture__image');
export const picCaption = popupPic.querySelector('.popup-picture__caption');
export const placesContainer = document.querySelector('.elements');
export const titleImgInput = popupAdd.querySelector('.popup__input_type_title');
export const linkInput = popupAdd.querySelector('.popup__input_type_link');
export const placeTemplate = document.querySelector('#element-template').content;
export const profileForm = document.forms["profile-form"];
export const addForm = document.forms["add-form"];
export const popups = document.querySelectorAll('.popup');
export const createButton = popupAdd.querySelector('.popup__button');
export const formSelector = '.popup__form';
export const validators = {};
export const forms = Array.from(document.querySelectorAll(formSelector));

export const initialCards = [
    {
        name: "Архыз",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
        name: "Челябинская область",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
        name: "Иваново",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Камчатка",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
        name: "Холмогорский район",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
        name: "Байкал",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
];