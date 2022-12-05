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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}


function closePopupByEsc(evt) {
    const isOverlay = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
        closePopup(isOverlay);
    }
};

popups.forEach((popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});


// closeButtons.forEach((closeButton) => closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup'))));


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


// document.addEventListener('click', (e) => {
//     const withinBoundaries = e.composedPath().includes(div);

//     if (!withinBoundaries) {
//         div.style.display = 'none'; // скрываем элемент т к клик был за его пределами
//     }
// })

// document.addEventListener('keydown', function (e) {
//     if (e.keyCode == 27) { // код клавиши Escape, но можно использовать e.key
//         div.style.display = 'none';
//     }
// });