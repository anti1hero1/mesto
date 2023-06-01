class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    };
      
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.classList.remove(this.config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        };
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this.disabledButton();
        } else {
          this._buttonElement.classList.remove(this.config.inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled', true);
        };
    };

    _setEventListeners() {
        this._toggleButtonState(); 
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
          });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };

    disabledButton() {
        this._buttonElement.setAttribute('disabled', 'disabled');
        this._buttonElement.classList.add(this.config.inactiveButtonClass);
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
    };
}

export {FormValidator}