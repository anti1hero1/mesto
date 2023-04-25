import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { elements } from "./constants.js";

export { openPopup, popupImage, popupCaption, popupCardImage };

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible',
};

const profilePopup = document.querySelector('.popup_edit')

const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const closeAllButtons = document.querySelectorAll('.popup__close');

const formEditProfiles = profilePopup.querySelectorAll('.popup__form');
const nameAuthor = document.querySelector('.profile__info-title');
const jobAuthor = document.querySelector('.profile__info-subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const popupImage = document.querySelector('.popup_image');
const popupCaption = document.querySelector('.popup__caption');
const popupCardImage = document.querySelector('.popup__card-image');

const popupAddCard = document.querySelector('.popup_add-card');
const formAddElement = document.querySelector('.popup__add-form');
const addButton = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.popup__edit-form');

const popupEditValidation = new FormValidator(config, formEditElement);
const popupAddValidation = new FormValidator(config, formAddElement);

const elementsCards = document.querySelector('.elements');


function addListeners() {
    document.addEventListener('keydown', closePopupEsc);
};

function removeListeners() {
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

function closePopupByClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

function openPopup(block) {
    block.classList.add('popup_opened');
    addListeners(block);
};

function openEditProfileForm() {
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
    popupEditValidation.resetValidation();
    openPopup(profilePopup);

};
function closePopup(block) {
    block.classList.remove('popup_opened');
    removeListeners(block);
};
closeAllButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        const closeItem = event.target.closest('.popup')
        closePopup(closeItem)
    })
});
function submitEditProfileForm(evt) {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    jobAuthor.textContent = jobInput.value;
    closePopup(profilePopup);
};

function renderElement(item) {
    const card = new Card(item, '#elementTemplate').createElement();
    return card;
};
function addCard(card) {
    elementsCards.prepend(card);
};

elements.forEach(item => {
    addCard(renderElement(item));
});

formEditProfiles.forEach(element => {
    popupAddValidation.enableValidation(element);
    popupEditValidation.enableValidation(element);
});

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    closePopup(popupAddCard);

    addCard(renderElement({
        name: evt.target.name.value,
        link: evt.target.link.value,
    }));
    evt.target.reset();
};

function openAddPopup() {
    formAddElement.reset();
    popupAddValidation.resetValidation();
    openPopup(popupAddCard);
};

addButton.addEventListener('click', openAddPopup);
buttonOpenEditProfilePopup.addEventListener('click', openEditProfileForm);
formEditElement.addEventListener('submit', submitEditProfileForm);
formAddElement.addEventListener('submit', handleAddFormSubmit);
profilePopup.addEventListener('mousedown', closePopupByClick);
popupAddCard.addEventListener('mousedown', closePopupByClick);
popupImage.addEventListener('mousedown', closePopupByClick);
