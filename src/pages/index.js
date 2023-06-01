import './index.css';

import { 
  config, 
  apiData, 
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  avatar } from '../utils/constants.js';

import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

const api = new Api(apiData);
let userId;

const bigImage = new PopupWithImage('.popup_type_photo');
const popupDelete = new PopupWithSubmit('.popup_type_delete');

const formValidator = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidator[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

const userForm = new UserInfo({
  selectorName: '.profile__info-title',
  selectorAbout: '.profile__info-subtitle',
  selectorAvatar: '.profile__image'
});

const defaultCards = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    defaultCards.addItem(cardElement);
  },
},
  '.elements'
);

function createCard(card) {
  const newCard = new Card({
    data: card,
    userId: userId,
    handleCardClick: (name, link) => {
      bigImage.open(name, link);
    },
    handleDeleteCard(card) {
      popupDelete.open(() => {
        api.deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            popupDelete.close();
          })
          .catch((err) => { console.log(err) })
      });
    },
    handleLikeCard(card) {
      api.getCardLike(card.getId())
        .then((data) => { card.toggleLike(data) })
        .catch((err) => { console.log(err) })
    },
    handleDeleteLikeCard(card) {
      api.deleteCardLike(card.getId())
        .then((data) => { card.toggleLike(data) })
        .catch((err) => { console.log(err) })
    },
  },
    '#elementTemplate'
  );
  const cardTemplate = newCard.generateCard();
  return cardTemplate;
}

const profilePopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    profilePopup.renderLoading(true);
    api.changeUserInfo(data)
      .then((res) => {
        userForm.setUserInfo(res);
      })
      .then(() => profilePopup.close())
      .catch((err) => { console.log(err) })
      .finally(() => {
        profilePopup.renderLoading(false);
      })
  },
},
  '.popup_type_profile'
);

profilePopup.setEventListeners();
buttonOpenEditProfilePopup.addEventListener('click', openProfilePopup);
function openProfilePopup() {
  profilePopup.open();
  profilePopup.setValues(userForm.getUserInfo());
  formValidator['popup-form'].resetValidation();
}

const cardPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    cardPopup.renderLoading(true);
    api.addNewCard({
      name: data.place,
      link: data.link,
    })
      .then((data) => {
        const cardElement = createCard({
          name: data.name,
          link: data.link,
          likes: data.likes,
          _id: data._id,
          owner: { _id: userId }
        })
        defaultCards.addItem(cardElement);
      })
      .then(() => cardPopup.close())
      .catch((err) => { console.log(err) })
      .finally(() => {
        cardPopup.renderLoading(false);
      });
  },
},
  '.popup_type_places'
);

cardPopup.setEventListeners();
buttonOpenAddCardPopup.addEventListener('click', openPlacePopup);
function openPlacePopup() {
  cardPopup.open();
  formValidator['popup-places'].resetValidation();
  formValidator['popup-places'].disabledButton();
}

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (data) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(data)
      .then((res) => {
        userForm.setUserInfo(res);
        avatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
},
  '.popup_type_avatar'
);

avatarPopup.setEventListeners();
avatar.addEventListener('click', openAvatarPopup);
function openAvatarPopup() {
  avatarPopup.open();
  formValidator['popup-avatar'].resetValidation();
  formValidator['popup-avatar'].disabledButton();
}

bigImage.setEventListeners();
popupDelete.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userForm.setUserInfo(userData);
    defaultCards.renderItems(cards);
  })
  .catch(err => { console.log(err) });
