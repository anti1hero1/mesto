import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigImage = this._popup.querySelector('.popup__card-image');
        this._bigImageCaption = this._popup.querySelector('.popup__caption');
    }

    open(about, image) {
        this._bigImageCaption.textContent = about;
        this._bigImage.src = image;
        this._bigImage.alt = about;
        super.open();
    }   
}

export { PopupWithImage }