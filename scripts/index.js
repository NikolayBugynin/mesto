const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup__profile');

const titleProfile = document.querySelector(".profile__title");
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_specification');
const specificationProfile = document.querySelector('.profile__specification');
const ProfileForm = popupProfile.querySelector('.popup__form');
const closeButtons = document.querySelectorAll('.popup__close-button');

function popupOpen(popup) {
    popup.classList.add('popup_opened');
}

function popupClose(popup) {
    popup.classList.remove('popup_opened');
}

closeButtons.forEach((closeButton) => closeButton.addEventListener('click', () => popupClose(closeButton.closest('.popup'))));

addButton.addEventListener('click', () => popupOpen(popupAdd));
editButton.addEventListener('click', () => popupOpen(popupProfile));

function popupOpenProfile() {
    popupOpen(popupProfile);
    nameInput.value = titleProfile.textContent;
    jobInput.value = specificationProfile.textContent;
}

function ProfileformSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__specification').textContent = jobInput.value;
    popupClose(popupProfile);
}
ProfileForm.addEventListener('submit', ProfileformSubmitHandler);

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

const placesContainer = document.querySelector('.elements');
const placeTemplate = document.querySelector('#element-template').content;

const placeInfo = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link
    };
});

function render() {
    placeInfo.forEach(renderCard);
}

const deleteCard = (evt) => {
    evt.target.closest('.element').remove();
}

const likecard = (evt) => {
    evt.target.classList.toggle('element__like-button_type_active');
}

const popupPic = document.querySelector('.popup__picture');
const PicLink = document.querySelector('.popup__picture-image');
const PicCaption = document.querySelector('.popup__picture-caption');

function renderCard({ name, link }) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
    placeElement.querySelector('.element__title').textContent = name;
    placeElement.querySelector('.element__image').src = link;
    placeElement.querySelector('.element__image').alt = link
    placesContainer.prepend(placeElement);

    const imgButton = placeElement.querySelector('.element__image');

    function picOpen() {
        popupOpen(popupPic);
        PicLink.alt = link;
        PicLink.src = link;
        PicCaption.textContent = name;
    };

    imgButton.addEventListener('click', () => picOpen());

    const deleteButton = placeElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const likeButton = placeElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', likecard);
}
render();

const popupAdd = document.querySelector('.popup__add');
const titleImgInput = popupAdd.querySelector('.popup__item_type_title');
const linkInput = popupAdd.querySelector('.popup__item_type_link');
const addForm = popupAdd.querySelector('.popup__form');


function addformSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({ name: titleImgInput.value, link: linkInput.value })
    evt.target.reset();
    popupClose(popupAdd);
}
addForm.addEventListener('submit', addformSubmitHandler);




