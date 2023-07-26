// import './index.css';

import * as constants from '../utils/constants.js';
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupDeleteCard from '../components/popupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js"




const popupDeleteCard = new PopupDeleteCard(constants.popupDeleteSelector, (element) => {
    element.removeCard();
    popupDeleteCard.close();

});
popupDeleteCard.setEventListeners();


function createCard({ name, link }) {
    // создаем экземпляр карточки
    const newCard = new Card({ name: name, link: link }, '#element-template', openPicture, openDeleteCard)
    return newCard.render()
}


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '145216f7-2935-42bd-94ca-1d1f129997a1',
        'Content-Type': 'application/json'
    }
});


const userInfo = new UserInfo(constants.profileSelectors);

const popupWithImage = new PopupWithImage(constants.popupPic);
popupWithImage.setEventListeners();


const openDeleteCard = (info) => {
    popupDeleteCard.open(info)
}

const openPicture = (info) => {
    popupWithImage.open(info)
}

const section = new Section({ items: constants.initialCards, renderer: (item) => { section.addItem(createCard(item)) } }, constants.placesContainer);
// section.renderItems();

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


const popupEditAvatar = new PopupWithForm(constants.popupAvatarSelector, (data) => {
    document.querySelector('.profile__avatar').src = data.avatar;
})
popupEditAvatar.setEventListeners();

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

constants.avatarButton.addEventListener('click', () => {
    popupEditAvatar.open()
})

// ищем все формы на странице и включаем для них проверку
constants.forms.forEach((form) => {
    const validator = new FormValidator(constants.validationConfig, form);
    validator.enableValidation()
    constants.validators[form.getAttribute('name')] = validator;

});

Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) => {

        dataCard.forEach((element) => (element.myId) = (dataUser._id));
        userInfo.setUserInfo({
            username: dataUser.name,
            job: dataUser.about,
            avatar: dataUser.avatar,
        })
        section.renderItems(dataCard)

    })


