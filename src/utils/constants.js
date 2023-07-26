export const editButton = document.querySelector('.profile__edit-button');
export const avatarButton = document.querySelector('.profile__edit-avatar_button')

export const titleProfile = document.querySelector(".profile__title");
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_specification');
export const specificationProfile = document.querySelector('.profile__specification');
export const addButton = document.querySelector('.profile__add-button');

export const placeTemplate = document.querySelector('#element-template').content;
export const profileForm = document.forms["profile-form"];
export const addForm = document.forms["add-form"];
export const popups = document.querySelectorAll('.popup');



export const formSelector = '.popup__form';
export const popupAdd = '.popup-add';
export const popupPic = '.popup-picture';
export const placesContainer = '.elements';
export const popupProfile = '.popup-profile';
export const templateSelector = '.template';
export const popupAvatarSelector = '.popup-avatar'
export const popupDeleteSelector = '.popup-delete-card'

export const profileSelectors = {
    name: '.profile__title',
    job: '.profile__specification',
    profileAvatar: '.profile__avatar'
}



export const validators = {};
export const forms = Array.from(document.querySelectorAll(formSelector));



export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    errorClass: 'popup__input-error',
    inputErrorClass: 'popup__input-error_active',
};


// export const initialCards = [
//     {
//         name: "Архыз",
//         link:
//             "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
//     },
//     {
//         name: "Челябинская область",
//         link:
//             "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
//     },
//     {
//         name: "Иваново",
//         link:
//             "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
//     },
//     {
//         name: "Камчатка",
//         link:
//             "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
//     },
//     {
//         name: "Холмогорский район",
//         link:
//             "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
//     },
//     {
//         name: "Байкал",
//         link:
//             "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
//     }
// ];