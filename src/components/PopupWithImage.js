import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__card-image');
    this._photoCaption = this._popup.querySelector('.popup__caption');
  }

  open(title, link) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._photoCaption.textContent = title;

    super.open();
  }
}