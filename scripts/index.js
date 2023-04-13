const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit')

const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonPopupSave = document.querySelector('.popup__button-save');
const closeAllButtons = document.querySelectorAll('.popup__close');

const formEditProfile = document.querySelector('.popup__form');
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
const elementsCards = document.querySelector('.elements');


function addListeners(popup) {
    document.addEventListener('keydown', closePopupEsc);
};

function removeListeners(popup) {
    document.removeEventListener('keydown', closePopupEsc);
    popup.removeEventListener('mousedown', closePopupByClick);
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
    openPopup(profilePopup);
    resetInput(formEditProfile);
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
    openPopup(popupAddCard);
    formAddElement.reset();
    resetInput(formAddElement);
});

buttonOpenEditProfilePopup.addEventListener('click', openEditProfileForm);
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddElement.addEventListener('submit', handleAddFormSubmit);
popupList.forEach(function (popup) {
    popup.addEventListener('mousedown', function (event) {
        if (event.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (event.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});
