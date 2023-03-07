console.log('Место JS')

const editButton = document.querySelector('.profile__edit-button');

const popupWindow = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__button-save');

let nameAuthor = document.querySelector('.profile__info-title');
let jobAuthor = document.querySelector('.profile__info-subtitle');

let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__input_type_name')
let jobInput = document.querySelector('.popup__input_type_job')


function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 