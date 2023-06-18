import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js";

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const titleProfile = document.querySelector(".profile__title");
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_specification');
const specificationProfile = document.querySelector('.profile__specification');
// const closeButtons = document.querySelectorAll('.popup__close-button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
export const popupPic = document.querySelector('.popup-picture');
export const picLink = popupPic.querySelector('.popup-picture__image');
export const picCaption = popupPic.querySelector('.popup-picture__caption');
const placesContainer = document.querySelector('.elements');
const titleImgInput = popupAdd.querySelector('.popup__input_type_title');
const linkInput = popupAdd.querySelector('.popup__input_type_link');
const placeTemplate = document.querySelector('#element-template').content;
const profileForm = document.forms["profile-form"];
const addForm = document.forms["add-form"];
const popups = document.querySelectorAll('.popup');
const createButton = popupAdd.querySelector('.popup__button');
const formSelector = '.popup__form';


export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

// function openPopupProfile() {
//     openPopup(popupProfile);
// };

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

popups.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});


// closeButtons.forEach((closeButton) => closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup'))));

// addButton.addEventListener('click', () => openPopup(popupAdd));
// editButton.addEventListener('click', () => openPopup(popupProfile));

function fillPopupProfile() {
    nameInput.value = titleProfile.textContent;
    jobInput.value = specificationProfile.textContent;
};

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    // disabledButton(createButton, 'popup__button_disable');
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile);
    // disabledButton(createButton, 'popup__button_disable');
    fillPopupProfile();
});

// function disabledButton(buttonElement, inactiveButtonClass) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(inactiveButtonClass);
// };

// function enabledButton(buttonElement, inactiveButtonClass) {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(inactiveButtonClass);
// };

// обработка отправки формы профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    titleProfile.textContent = nameInput.value;
    specificationProfile.textContent = jobInput.value;
    closePopup(popupProfile);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

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



const toggleLike = (evt) => {
    evt.target.classList.toggle('element__like-button_type_active');
};

const deleteCard = (evt) => {
    evt.target.closest('.element').remove();
};

function openPic(item) {
    openPopup(popupPic);
    picLink.alt = item.link;
    picLink.src = item.link;
    picCaption.textContent = item.name;
};

// function createCard(item) {
//     const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

//     const imgButton = placeElement.querySelector('.element__image');
//     placeElement.querySelector('.element__title').textContent = item.name;
//     imgButton.src = item.link;
//     imgButton.alt = item.link;

//     imgButton.addEventListener('click', () => openPic(item));

//     const likeButton = placeElement.querySelector('.element__like-button');
//     likeButton.addEventListener('click', toggleLike);

//     const deleteButton = placeElement.querySelector('.element__delete-button');
//     deleteButton.addEventListener('click', deleteCard);

//     return placeElement;
// }


initialCards.forEach((card) => {
    const newCard = createCard(card.name, card.link)
    placesContainer.append(newCard.render())

    // newCard.render()
});



// function renderCard(item) {
//     // const placeElement = createCard(item)
//     // placesContainer.prepend(placeElement);
//     // создаем экземпляр карточки
// }
// // render();

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    // renderCard({ name: titleImgInput.value, link: linkInput.value })
    // создаем экземпляр карточки
    const newCard = createCard(titleImgInput.value, linkInput.value)

    //вставляем карточку в разметку
    placesContainer.prepend(newCard.render())

    evt.target.reset();
    closePopup(popupAdd);
}
addForm.addEventListener('submit', handleAddFormSubmit);

function createCard(name, link) {
    // создаем экземпляр карточки
    const newCard = new Card({ name: name, link: link }, '#element-template', openPic)

    return newCard

}

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    errorClass: 'popup__input-error',
    inputErrorClass: 'popup__input-error_active',
};


//ищем все формы на странице и включаем для них проверку
const forms = Array.from(document.querySelectorAll(formSelector));
forms.forEach((form) => {
    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation();
});


