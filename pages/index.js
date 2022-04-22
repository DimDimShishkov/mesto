let editButton = document.querySelector('.profile__editButton');
let addButton = document.querySelector('.profile__addButton');

let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submitButton');
let exitButton = document.querySelector('.popup__exitButton');

let like = document.querySelector('.element__like');

editButton.addEventListener('click', function() {
    popup.classList.toggle('popup_opened')
});

exitButton.addEventListener('click', function() {
    popup.classList.toggle('popup_opened')
});

