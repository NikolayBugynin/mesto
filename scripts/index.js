import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"

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
    validators[addForm.getAttribute('name')].disableSubmitButton();
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile);
    // disabledButton(createButton, 'popup__button_disable');
    validators[profileForm.getAttribute('name')].disableSubmitButton();
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

initialCards.forEach((card) => {
    const newCard = createCard(card.name, card.link)
    placesContainer.append(newCard.render())
});

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
forms.forEach((form) => {
    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation()
    validators[form.getAttribute('name')] = validator;
});
