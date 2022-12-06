# Проект Mesto: карточки и попапы

### Обзор
* Интро
* Задание
* Технологии
* Figma
* Проект

**Интро**

Это вторая часть проекта над сервисом Mesto: интерактивной страницей, куда можно добавлять фотографии, удалять их и ставить лайки. Нам предстоит сверстать сайт, написать часть логики на JavaScript, опубликовать в Git. 

**Задание**

* Вёрстка
* JavaScript
* Git

**Технологии**
* HTML
* CSS
* BEM
* Flexbox
* Grid Layout
* JavaScript

**Figma**

* [Ссылка на макет в Figma](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)

**Проект**

* [Посмотреть](https://nikolaybugynin.github.io/mesto/index.html)



const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${obj.inputErrorClass}`);
  errorElement.textContent = errorMessage;
};

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const setEventListeners = (fieldset, obj) => {
  const inputList = Array.from(fieldset.querySelectorAll(`${obj.inputSelector}`));
  const buttonElement = fieldset.querySelector(`${obj.submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldset, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(`${obj.fieldsetSelector}`));

    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset, obj);
    });
  });
};

enableValidation(objForm);

fieldsetSelector: '.form__fieldset',


  inputList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });