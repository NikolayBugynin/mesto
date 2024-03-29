let myID;

// imports ---------------------------------------------------------------------------
// styles
import './index.css';
// constants
import {
  apiConfig,
  editButton,
  avatarButton,
  addButton,
  profileForm,
  addForm,
  avatarForm,
  popupAdd,
  popupPic,
  placesContainer,
  popupProfile,
  popupAvatarSelector,
  popupDeleteSelector,
  profileSelectors,
  validators,
  forms,
  validationConfig,
  inactiveButtonClass,
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

// callbacks for classes -------------------------------------------------------------
const changeBio = ({ username, specification }) => {
  const item = { name: username, about: specification };
  return api.editProfile(item).
    then(userInfo.changeUserInfo(item))
    .catch(err => console.error(`Ошибка при редактировании данных профиля: ${err}`))
};

const addCard = ({ placename, placelink }) => {
  const item = { name: placename, link: placelink };
  return api.addCard(item).
    then((res) => section.addItemPrepend(createCard(res)))
    .catch(err => console.error(`Ошибка при при создании новой карточки: ${err}`))
};

const deleteCard = (element) => {
  return api.deleteCard(element._id).then(element.removeCard()).then(popupDeleteCard.close())
    .catch(err => console.error(`Ошибка при при удалении карточки: ${err}`))
};

const editAvatar = (data) => {
  return api.newAvatar(data).
    then((data) => userInfo.changeAvatar(data))
    .catch(err => console.error(`Ошибка при редактировании аватара: ${err}`))
};

const renderCard = (item) => {
  return section.addItemAppend(createCard(item));
};

const callbacks = {
  profilePopup: changeBio,
  placePopup: addCard,
  popupDeleteCard: deleteCard,
  popupEditAvatar: editAvatar,
  section: renderCard,
};

// utils functions -------------------------------------------------------------------
// for card
const openDeleteCard = (info) => {
  popupDeleteCard.open(info);
};

const openPicture = (info) => {
  popupWithImage.open(info);
};

const setLike = async (cardId) => {
  return api.setLike(cardId)
    .catch(err => console.error(`Ошибка при при постановки лайка: ${err}`))
};

const removeLike = async (cardId) => {
  return api.removeLike(cardId)
    .catch(err => console.error(`Ошибка при при снятии лайка: ${err}`))
};

// create card
function createCard(dataCard) {
  const newCard = new Card(
    dataCard,
    '#element-template',
    openPicture,
    openDeleteCard,
    myID,
    setLike,
    removeLike,
  );
  return newCard.render();
}

// create class instances ------------------------------------------------------------
// api
const api = new Api(apiConfig);

// validation
const profileValidation = new FormValidator(validationConfig, profileForm);
const placeValidation = new FormValidator(validationConfig, addForm);
const avatarValidation = new FormValidator(validationConfig, avatarForm);


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

// validation------------------------------------------------------------------------
profileValidation.enableValidation();
placeValidation.enableValidation();
avatarValidation.enableValidation();

// event listeners ------------------------------------------------------------------
profilePopup.setEventListeners();
popupEditAvatar.setEventListeners();
placePopup.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();

addButton.addEventListener('click', () => {
  placeValidation.resetErrorsForm();
  placePopup.open();
});

editButton.addEventListener('click', () => {
  const item = userInfo.getUserInfo();
  profilePopup.setInputsValue({
    username: item.name,
    specification: item.job,
    avatar: item.avatar,
  });
  profileValidation.disableSubmitButton()
  profileValidation.resetErrorsForm();
  profilePopup.open();
});

avatarButton.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarValidation.resetErrorsForm();
});

// executable code -----------------------------------------------------------------
Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    myID = dataUser._id;
    section.renderItems(dataCard);
    userInfo.setUserInfo(dataUser);
  })
  .catch(err => console.error(`Ошибка при создании начальных данных страницы: ${err}`))





