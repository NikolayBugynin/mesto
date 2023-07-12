import './index.css';

import * as constants from '../utils/constants.js';
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from '../components/UserInfo.js';

function createCard({ name, link }) {
    // создаем экземпляр карточки
    const newCard = new Card({ name: name, link: link }, '#element-template', openPicture)

    return newCard.render()
}

const userInfo = new UserInfo(constants.profileSelectors);

const popupWithImage = new PopupWithImage(constants.popupPic);
popupWithImage.setEventListeners();


const openPicture = (info) => {
    popupWithImage.open(info)
}

const section = new Section({ items: constants.initialCards, renderer: (item) => { section.addItem(createCard(item)) } }, constants.placesContainer);
section.renderItems();

const placePopup = new PopupWithForm(constants.popupAdd, (data) => {
    const item = { name: data.placename, link: data.placelink };
    section.addItem(createCard(item));
});
placePopup.setEventListeners();


const profilePopup = new PopupWithForm(constants.popupProfile, (data) => {
    const item = { name: data.username, job: data.specification };
    userInfo.setUserInfo(item);
});
profilePopup.setEventListeners();

const profileValidation = new FormValidator(constants.validationConfig, constants.profileForm);
const placeValidation = new FormValidator(constants.validationConfig, constants.addForm);

profileValidation.enableValidation();
placeValidation.enableValidation();

constants.addButton.addEventListener('click', () => {
    placeValidation.disableSubmitButton();
    placePopup.open();
});

constants.editButton.addEventListener('click', () => {
    const item = userInfo.getUserInfo();
    profilePopup.setInputsValue({ username: item.name, specification: item.job });
    profilePopup.open();
});

// ищем все формы на странице и включаем для них проверку
constants.forms.forEach((form) => {
    const validator = new FormValidator(constants.validationConfig, form);
    validator.enableValidation()
    constants.validators[form.getAttribute('name')] = validator;
});
