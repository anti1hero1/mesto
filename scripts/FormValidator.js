export default class FormValidator {
  constructor(config, form) {
    this._formElement = form;
    this._validationConfig = config;
    this._inputList = Array.from( this._formElement.querySelectorAll(this._validationConfig.inputSelector) );
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
};

_showError(input) {
  const errorElement = this._formElement.querySelector(`.${input.id}-error`);
  errorElement.classList.add(this._validationConfig.errorClass);
  errorElement.textContent = input.validationMessage;
  input.classList.add(this._validationConfig.inputErrorClass);
};

_hideError(input) {
  const errorElement = this._formElement.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(this._validationConfig.errorClass);
  errorElement.textContent = '';
  input.classList.remove(this._validationConfig.inputErrorClass);
};

_checkInputValidity(input) {
  if (!input.validity.valid) {
      this._showError(input);
  } else {
      this._hideError(input);
  }
};

_setEventListeners() {
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._toggleButtonState();
    })
  })
};

enableValidation() {
  this._setEventListeners();
};

_hasInvalidInput() {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
};

resetValidation() {
  this._toggleButtonState();
  this._inputList.forEach(item => {
    this._hideError(item);
  })
}
}
