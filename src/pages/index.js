// imports ---------------------------------------------------------------------------
// styles
import './index.css';
// constants
import {
    apiConfig,
    editButton,
    avatarButton,
    // titleProfile,
    // nameInput,
    // jobInput,
    // specificationProfile,
    addButton,
    // placeTemplate,
    profileForm,
    addForm,
    // popups,
    // formSelector,
    popupAdd,
    popupPic,
    placesContainer,
    popupProfile,
    // templateSelector,
    popupAvatarSelector,
    popupDeleteSelector,
    profileSelectors,
    validators,
    forms,
    validationConfig,
    // initialCards,
} from '../utils/constants.js';
// components
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/popupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// utils functions -------------------------------------------------------------------
const openDeleteCard = (info) => {
    popupDeleteCard.open(info);
};

const openPicture = (info) => {
    popupWithImage.open(info);
};

function createCard({ name, link }) {
    // создаем экземпляр карточки
    const newCard = new Card(
        { name: name, link: link },
        '#element-template',
        openPicture,
        openDeleteCard,
    );
    return newCard.render();
}

// callbacks for classes -------------------------------------------------------------
const changeBio = (data) => {
    const item = { name: data.username, about: data.specification };
    userInfo.changeUserInfo(item);
};

const addCard = (data) => {
    const item = { name: data.placename, link: data.placelink };
    section.addItem(createCard(item));
};

const deleteCard = (element) => {
    element.removeCard();
    popupDeleteCard.close();
};

const editAvatar = (data) => {
    document.querySelector('.profile__avatar').src = data.avatar;
};

const renderCard = (item) => {
    section.addItem(createCard(item));
};

const callbacks = {
    profilePopup: changeBio,
    placePopup: addCard,
    popupDeleteCard: deleteCard,
    popupEditAvatar: editAvatar,
    section: renderCard,
};

// create class instances ------------------------------------------------------------
// api
const api = new Api(apiConfig);

// validation
const profileValidation = new FormValidator(validationConfig, profileForm);
const placeValidation = new FormValidator(validationConfig, addForm);

// userInfo
const userInfo = new UserInfo(profileSelectors);

// popups
const popupWithImage = new PopupWithImage(popupPic);
const popupDeleteCard = new PopupDeleteCard(popupDeleteSelector, callbacks.popupDeleteCard);
const placePopup = new PopupWithForm(popupAdd, callbacks.placePopup);
const profilePopup = new PopupWithForm(popupProfile, callbacks.profilePopup);
const popupEditAvatar = new PopupWithForm(popupAvatarSelector, callbacks.popupEditAvatar);

// render
const section = new Section(callbacks.section, placesContainer);

// validation ------------------------------------------------------------------------
profileValidation.enableValidation();
placeValidation.enableValidation();

forms.forEach((form) => {
    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation();
    validators[form.getAttribute('name')] = validator;
});

// event listeners ------------------------------------------------------------------
profilePopup.setEventListeners();
popupEditAvatar.setEventListeners();
placePopup.setEventListeners();
popupWithImage.setEventListeners();

popupDeleteCard.setEventListeners();
addButton.addEventListener('click', () => {
    placeValidation.disableSubmitButton();
    placePopup.open();
});

editButton.addEventListener('click', () => {
    const item = userInfo.getUserInfo();
    profilePopup.setInputsValue({ username: item.name, specification: item.job, avatar: item.avatar });
    profilePopup.open();
});

avatarButton.addEventListener('click', () => {
    popupEditAvatar.open();
});

// executable code -----------------------------------------------------------------
Promise.all([api.getInfo(), api.getCards()]).then(([dataUser, dataCard]) => {
    section.renderItems(dataCard);
    userInfo.setUserInfo(dataUser);
    dataCard.forEach((element) => (element.myId = dataUser._id));
});
