import { openPopup, popupImage, popupCaption, popupCardImage } from "./index.js";
export default class Card {
  constructor(card, templateElement ){
    this._name = card.name;
    this._link = card.link;
    this._template = templateElement;
  }


_openPopup = () => {
  popupCaption.textContent = this._name;
  popupCardImage.src = this._link;
  popupCardImage.alt = this._name;
  openPopup(popupImage);
};

createElement() {
  this._card = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
  this._title = this._card.querySelector('.element__title');
  this._image = this._card.querySelector('.element__image');
  this._title.textContent = this._name;
  this._image.src = this._link;
  this._image.alt = this._name;
  this._listener();

  return this._card;
};

_makeLike() {
  this._buttonLike = this._card.querySelector('.element__like');
  this._buttonLike.classList.toggle('element__like_active');
};

_deleteCard() {
  this._card.remove();
};

_listener() {
  this._card.querySelector('.element__like').addEventListener('click', () => {
    this._makeLike()
  });
  this._card.querySelector('.element__image-basket').addEventListener('click', () => {
    this._deleteCard()
  }
  );

  this._image.addEventListener('click', this._openPopup);
};
};
