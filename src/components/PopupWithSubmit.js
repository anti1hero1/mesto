import { Popup } from './Popup.js';

class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector('.popup__button_delete');
  }
  
  open(evt) {
    super.open();
    this.evt = evt;
    this._deleteButton.onclick = this.evt;
  }
}

export { PopupWithSubmit }