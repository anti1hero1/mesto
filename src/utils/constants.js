const apiData = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '9b1777f3-98dd-4967-afba-6faae59432d3',
    'content-type': 'application/json'
  },
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible',
};

const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__avatar-button');

export {
  config,
  apiData,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  avatar }