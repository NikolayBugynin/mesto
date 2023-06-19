import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
import * as constants from './constants.js';

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

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

constants.popups.forEach((popup) => {
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
    constants.nameInput.value = constants.titleProfile.textContent;
    constants.jobInput.value = constants.specificationProfile.textContent;
};

constants.addButton.addEventListener('click', () => {
    openPopup(constants.popupAdd);
    // disabledButton(createButton, 'popup__button_disable');
    constants.validators[constants.addForm.getAttribute('name')].disableSubmitButton();
});

constants.editButton.addEventListener('click', () => {
    openPopup(constants.popupProfile);
    // disabledButton(createButton, 'popup__button_disable');
    constants.validators[constants.profileForm.getAttribute('name')].disableSubmitButton();
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
    constants.titleProfile.textContent = constants.nameInput.value;
    constants.specificationProfile.textContent = constants.jobInput.value;
    closePopup(constants.popupProfile);
}
constants.profileForm.addEventListener('submit', handleProfileFormSubmit);

const toggleLike = (evt) => {
    evt.target.classList.toggle('element__like-button_type_active');
};

const deleteCard = (evt) => {
    evt.target.closest('.element').remove();
};

function openPic(item) {
    openPopup(constants.popupPic);
    constants.picLink.alt = item.link;
    constants.picLink.src = item.link;
    constants.picCaption.textContent = item.name;
};

constants.initialCards.forEach((card) => {
    const newCard = createCard(card.name, card.link)
    constants.placesContainer.append(newCard.render())
});

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    // renderCard({ name: titleImgInput.value, link: linkInput.value })
    // создаем экземпляр карточки
    const newCard = createCard(constants.titleImgInput.value, constants.linkInput.value)

    //вставляем карточку в разметку
    constants.placesContainer.prepend(newCard.render())

    evt.target.reset();
    closePopup(constants.popupAdd);
}
constants.addForm.addEventListener('submit', handleAddFormSubmit);

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
constants.forms.forEach((form) => {
    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation()
    constants.validators[form.getAttribute('name')] = validator;
});
