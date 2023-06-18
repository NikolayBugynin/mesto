const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const titleProfile = document.querySelector(".profile__title");
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_specification');
const specificationProfile = document.querySelector('.profile__specification');
// const closeButtons = document.querySelectorAll('.popup__close-button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const popupPic = document.querySelector('.popup-picture');
const picLink = popupPic.querySelector('.popup-picture__image');
const picCaption = popupPic.querySelector('.popup-picture__caption');
const placesContainer = document.querySelector('.elements');
const titleImgInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');
const placeTemplate = document.querySelector('#element-template').content;
const profileForm = document.forms["profile-form"];
const addForm = document.forms["add-form"];
const popups = document.querySelectorAll('.popup');
const createButton = popupAdd.querySelector('.popup__button');
const formSelector = '.popup__form';
const validators = {};
const forms = Array.from(document.querySelectorAll(formSelector));

const initialCards = [
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