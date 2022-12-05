const keys = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disable',
    errorClass: 'popup__input-error',
    inputErrorClass: 'popup__input-error_active',
};

const showInputError = (formElement, inputElement, errorMessage, key) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(key.inputErrorClass);
    errorElement.classList.add(key.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, key) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(key.inputErrorClass);
    errorElement.classList.remove(key.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, key) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, key);
    } else {
        hideInputError(formElement, inputElement, key);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement, key) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(key.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(key.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, key) => {
    const inputList = Array.from(formElement.querySelectorAll(key.inputSelector));
    const buttonElement = formElement.querySelector(key.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, key);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, key);
            toggleButtonState(inputList, buttonElement, key);
        });
    });
};

const enableValidation = (key) => {
    const formList = Array.from(document.querySelectorAll(key.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, key);
    });
};

enableValidation(keys);


