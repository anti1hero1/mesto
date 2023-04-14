const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible',
};
const showError = (form, input, validationConfig, error) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = error;
    input.classList.add(validationConfig.inputErrorClass);
};
const hideError = (form, input, validationConfig) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
    input.classList.remove(validationConfig.inputErrorClass);
};
const checkInputValidity = (form, input, validationConfig) => {
    if (!input.validity.valid) {
        showError(form, input, validationConfig, input.validationMessage);
    } else {
        hideError(form, input, validationConfig);
    }
};
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            checkInputValidity(formElement, input, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((form) => {
        setEventListeners(form, validationConfig);
    });
};
enableValidation(config);

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, validationConfig);
    } else {
        enableButton(buttonElement, validationConfig);
    }
};
function disableButton(button, validationConfig) {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true;
};
function enableButton(button, validationConfig) {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.disabled = false;
};

function resetInput(form, validationConfig) {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const button = form.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach(input => {
        hideError(form, input, validationConfig);
        console.log()
    })
    toggleButtonState(inputList, button, validationConfig);
};

