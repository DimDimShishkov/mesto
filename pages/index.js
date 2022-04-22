let page = document.querySelector('.page');

let editButton = document.querySelector('.profile__editButton');
let addButton = document.querySelector('.profile__addButton');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submitButton');
let exitButton = document.querySelector('.popup__exitButton');
let profileNameEdit = document.querySelector('.popup__name');
let profileDescriptionEdit = document.querySelector('.popup__description');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_active');
};

editButton.addEventListener('click', function(event) {
    togglePopup();
});

exitButton.addEventListener('click', function(event) {
    togglePopup();
});

submitButton.addEventListener('click', function(event) {
    togglePopup();
    profileName.textContent = profileNameEdit.value;
    profileDescription.textContent = profileDescriptionEdit.value;
    event.preventDefault();
});

popup.addEventListener('click', function(event) {
    if(event.target == event.currentTarget){
        popup.classList.remove('popup_opened');
        page.classList.remove('page_active');
    }
});