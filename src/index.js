import './pages/index.css';

import Card from './components/Card.js';
import { initialCards } from './utils/constants.js';
import { config, FormValidator } from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
console.log('Hello, World!')
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardsButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

function createCard(item) {
  const card = new Card(item, '#elementTemplate', handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}
const initialCardsRenderer = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = createCard(data);
    initialCardsRenderer.addItem(cardElement);
  }
},
  '.elements');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__info-title',
  profileJobSelector: '.profile__info-subtitle'
});

const popupEditProfile = new PopupWithForm({
  selector: '.popup_edit',
  handleSubmitForm: handleProfileSubmitForm
});

function handleProfileSubmitForm(data) {
  userInfo.setUserInfo(data.name, data.job);
};

const popupAddCards = new PopupWithForm({
  selector: '.popup_add-card',
  handleSubmitForm: handleAddCardsSubmitForm,
});

function handleAddCardsSubmitForm(data) {
  const cardElement = createCard({
    link: data.link,
    title: data.title,
  })
  initialCardsRenderer.addItem(cardElement);
};

const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

function handleCardClick(title, link) {
  popupImage.open(title, link);
};

const editProfileValidation = new FormValidator(config, document.querySelector('.popup_edit').querySelector('.popup__form'));
const addCardsValidation = new FormValidator(config, document.querySelector('.popup_add-card')
  .querySelector('.popup__form'));

editProfileValidation.enableValidation();
addCardsValidation.enableValidation();

profileEditButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name;
  jobInput.value = userInfoValues.job;
  popupEditProfile.open();
  editProfileValidation.resetValidation();
});

addCardsButton.addEventListener('click', () => {
  popupAddCards.open();
  addCardsValidation.resetValidation();
});
initialCardsRenderer.renderItems();
popupEditProfile.setEventListeners();
popupAddCards.setEventListeners();


const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10