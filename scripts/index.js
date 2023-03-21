const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_edit')

const editButton = document.querySelector('.profile__edit-button');
const closeAllButtons = document.querySelectorAll('.popup__close');

const formElement = document.querySelector('.popup__form');

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
const inputAddName = document.querySelector('.popup__input_card-name');
const inputAddLink = document.querySelector('.popup__input_card-link');

const templateElement = document.querySelector('#elementTemplate').content;

function openPopup(block) {
    block.classList.add('popup_opened');
};

function openEditProfileForm() {
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
    openPopup(editPopup);
};

function closePopup(block) {
    block.classList.remove('popup_opened');
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
    closePopup(editPopup);
};

const elementsCards = document.querySelector('.elements');

const elements = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const createElement = (element) => {
    const newElement = templateElement.querySelector('.element').cloneNode(true);
    const elementHeading = newElement.querySelector('.element__title');
    elementHeading.textContent = element.name;
    const elementImage = newElement.querySelector('.element__image');
    elementImage.setAttribute('src', element.link);
    elementImage.setAttribute('alt', element.name);

    const likeButton = newElement.querySelector('.element__like');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active')
    });

    const deleteButton = newElement.querySelector('.element__image-basket');

    deleteButton.addEventListener('click', function () {
        const deleteElement = deleteButton.closest('.element');
        deleteElement.remove();
    });

    function openPopupImage(element) {
        popupCardImage.src = element.link;
        popupCaption.textContent = element.name;
        popupCardImage.alt = element.name;
        openPopup(popupImage);
    };

    elementImage.addEventListener('click', () => openPopupImage(element));

    return newElement;
}

function renderElement(block, item) {
    block.prepend(createElement(item))
};

elements.forEach(item => {
    renderElement(elementsCards, item)
});

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    closePopup(popupAddCard);


    renderElement(elementsCards, {
        name: evt.target.name.value,
        link: evt.target.link.value,
    })
    evt.target.reset();
};

addButton.addEventListener('click', function () {
    openPopup(popupAddCard)
});
editButton.addEventListener('click', openEditProfileForm);

formElement.addEventListener('submit', submitEditProfileForm);
formAddElement.addEventListener('submit', handleAddFormSubmit);