console.log('Место JS :)')

const popupWindow = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__button-save');
const cardLike = document.querySelector('.element__like');

let formElement = document.querySelector('.popup__content');
let nameAuthor = document.querySelector('.profile__info-title');
let jobAuthor = document.querySelector('.profile__info-subtitle');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

function openPopup() {
    popupWindow.classList.add('popup_opened');
    nameInput.value = nameAuthor.innerHTML;
    jobInput.value = jobAuthor.innerHTML;
};

function toggleButton() {
    cardLike.classList.toggle('element__like_active');
};


function handleFormSubmit(evt) {
    evt.preventDefault();
    nameAuthor.textContent = nameInput.value;
    jobAuthor.textContent = jobInput.value;
    popupWindow.classList.remove('popup_opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', function () { popupWindow.classList.remove('popup_opened') });
formElement.addEventListener('submit', handleFormSubmit);
cardLike.addEventListener('click', toggleButton);
