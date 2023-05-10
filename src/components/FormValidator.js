export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible',
};

export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    };
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => { this._hideInputError(inputElement); })
  };
};