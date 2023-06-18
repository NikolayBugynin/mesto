// const keys = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disable',
//     errorClass: 'popup__input-error',
//     inputErrorClass: 'popup__input-error_active',
// };

// const showInputError = (formElement, inputElement, errorMessage, key) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(key.inputErrorClass);
//     errorElement.classList.add(key.errorClass);
//     errorElement.textContent = errorMessage;
// };

// const hideInputError = (formElement, inputElement, key) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(key.inputErrorClass);
//     errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, key) => {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, key);
//     } else {
//         hideInputError(formElement, inputElement, key);
//     }
// };

// function hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// };

// function toggleButtonState(inputList, buttonElement, key) {
//     if (hasInvalidInput(inputList)) {
//         disabledButton(buttonElement, key.inactiveButtonClass);
//     } else {
//         enabledButton(buttonElement, key.inactiveButtonClass);
//     }
// };

// function disabledButton(buttonElement, inactiveButtonClass) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(inactiveButtonClass);
// };

// function enabledButton(buttonElement, inactiveButtonClass) {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(inactiveButtonClass);
// };

// const setEventListeners = (formElement, key) => {
//     const inputList = Array.from(formElement.querySelectorAll(key.inputSelector));
//     const buttonElement = formElement.querySelector(key.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement, key);

//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement, key);
//             toggleButtonState(inputList, buttonElement, key);
//         });
//     });
// };

// const enableValidation = (key) => {
//     const formList = Array.from(document.querySelectorAll(key.formSelector));
//     formList.forEach((formElement) => {
//         setEventListeners(formElement, key);
//     });
// };

// //enableValidation(keys);



