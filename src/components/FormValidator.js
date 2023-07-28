export default class FormValidator {
    constructor(keys, form) {
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(keys.inputSelector));
        this._submitButton = this._form.querySelector(keys.submitButtonSelector);

        this._errorClass = keys.errorClass;
        this._inputErrorClass = keys.inputErrorClass;
        this._inactiveSubmitButtonClass = keys.inactiveButtonClass;

        this._inputSelector = keys.inputSelector;
        this._submitButtonSelector = keys.submitButtonSelector;
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        this._hasInvalidInput() ? this.disableSubmitButton() : this._enableSubmitButton();
    }

    disableSubmitButton() {
        this._submitButton.disabled = true;
        this._submitButton.classList.add(this._inactiveSubmitButtonClass);
    }

    _enableSubmitButton() {
        this._submitButton.disabled = false;
        this._submitButton.classList.remove(this._inactiveSubmitButtonClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    resetErrorsForm() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };


    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(); //перенес метод туда где вызывпется _checkInputValidity(inputElement);
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }

}