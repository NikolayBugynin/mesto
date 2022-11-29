const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
const titleProfile = document.querySelector(".profile__title");
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_specification');
const specificationProfile = document.querySelector('.profile__specification');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const popupPic = document.querySelector('.popup-picture');
const picLink = popupPic.querySelector('.popup-picture__image');
const picCaption = popupPic.querySelector('.popup-picture__caption');
const placesContainer = document.querySelector('.elements');
const placeTemplate = document.querySelector('#element-template').content;
const titleImgInput = popupAdd.querySelector('.popup__item_type_title');
const linkInput = popupAdd.querySelector('.popup__item_type_link');
const profileForm = popupProfile.querySelector('.popup__form');
const addForm = popupAdd.querySelector('.popup__form');

/*const profileForm = document.forms["profile-form"];
const addForm = document.forms["add-form"]; не работает*/

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

closeButtons.forEach((closeButton) => closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup'))));

addButton.addEventListener('click', () => openPopup(popupAdd));
editButton.addEventListener('click', () => openPopup(popupProfile));

function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = titleProfile.textContent;
    jobInput.value = specificationProfile.textContent;
};

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

function createCard(item) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

    const imgButton = placeElement.querySelector('.element__image');
    placeElement.querySelector('.element__title').textContent = item.name;
    imgButton.src = item.link;
    imgButton.alt = item.link;

    imgButton.addEventListener('click', () => openPic(item));

    /* imgButton.addEventListener('click', openPic(item); - не работает(((*/

    const likeButton = placeElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', toggleLike);

    const deleteButton = placeElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return placeElement;
}

function render() {
    initialCards.forEach(renderCard);
}

function renderCard(item) {
    const placeElement = createCard(item)
    placesContainer.prepend(placeElement);
}
render();

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    renderCard({ name: titleImgInput.value, link: linkInput.value })
    evt.target.reset();
    closePopup(popupAdd);
}
addForm.addEventListener('submit', handleAddFormSubmit);