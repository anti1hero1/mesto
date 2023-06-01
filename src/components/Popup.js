class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonsClose = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(esc) {
        if (esc.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(event) {
        if (event.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonsClose.addEventListener('mousedown', this.close.bind(this));
        this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
    }
}

export {Popup}