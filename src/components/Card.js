class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteCard,
      handleLikeCard, handleDeleteLikeCard
    }, templateSelector) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.handleLikeCard = handleLikeCard;
    this.handleDeleteLikeCard = handleDeleteLikeCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  toggleLike(data) {
    this._likes = data.likes;
    this.cardLikeNumber.textContent = this._likes.length;
    this.cardLikeButton.classList.toggle('element__like_active');
  }

  getId() {
    return this._data._id;
  }

  _checkLike() {
    if (this._likes.some((user) => this._userId === user._id)) {
      this.cardLikeButton.classList.add('element__like_active');
    }
  }

  _openImagePopup() {
    this.handleCardClick(this._name, this._link);
  }

  generateCard() {
    this._element = this._getTemplate();
    this.cardImage = this._element.querySelector('.element__image');
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardName = this._element.querySelector('.element__title');
    this.cardName.textContent = this._name;
    this.cardLikeButton = this._element.querySelector('.element__like');
    this.cardDeleteButton = this._element.querySelector('.element__image-basket');
    this.cardLikeNumber = this._element.querySelector('.element__like-counter');
    this.cardLikeNumber.textContent = this._likes.length;
    if (this._owner !== this._userId) {
      this.cardDeleteButton.style.display = 'none';
    }
    this._checkLike();
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this.cardLikeButton.addEventListener('click', () => {
      if (this.cardLikeButton.classList.contains('element__like_active')) {
        this.handleDeleteLikeCard(this);
      } else {
        this.handleLikeCard(this);
      }
    });
    this.cardDeleteButton.addEventListener('click', () => this.handleDeleteCard(this));
    this.cardImage.addEventListener('click', () => {
      this._openImagePopup();
    });
  }
}

export { Card }