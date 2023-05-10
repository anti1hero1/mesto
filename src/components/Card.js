export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  };

  createCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  };

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  _deleteCard() {
    this._element.remove();
  };

  _setEventListeners = () => {
    this._element.querySelector('.element__like').addEventListener('click', this._toggleLike);
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._title, this._link));
    this._element.querySelector('.element__image-basket').addEventListener('click', () => this._deleteCard());
  };
};