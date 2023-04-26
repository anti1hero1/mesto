import { openPopup, popupImage, popupCaption, popupCardImage } from "./index.js";
export default class Card {
  constructor(card, templateElement ){
    this._name = card.name;
    this._link = card.link;
    this._template = templateElement;
    this._card = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    this._title = this._card.querySelector('.element__title');
    this._image = this._card.querySelector('.element__image');
    this._likeButton = this._card.querySelector('.element__like');
    this._cardBasket = this._card.querySelector('.element__image-basket');
  }

_openPopup = () => {
  popupCaption.textContent = this._name;
  popupCardImage.src = this._link;
  popupCardImage.alt = this._name;
  openPopup(popupImage);
};

createElement() {
  this._title.textContent = this._name;
  this._image.src = this._link;
  this._image.alt = this._name;
  this._setEventListeners();

  return this._card;
};

_makeLike() {
  this._likeButton.classList.toggle('element__like_active');
};

_deleteCard() {
  this._card.remove();
};

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
    this._makeLike()
  });
    this._cardBasket.addEventListener('click', () => {
    this._deleteCard()
  }
  );
  this._image.addEventListener('click', this._openPopup);
};
};
