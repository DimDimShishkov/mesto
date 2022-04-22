let editButton = document.querySelector('.profile__editButton');
let addButton = document.querySelector('.profile__addButton');
let page = document.querySelector('.page');
let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submitButton');
let exitButton = document.querySelector('.popup__exitButton');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_active');
};

editButton.addEventListener('click', function(event) {
    togglePopup();
});

popup.addEventListener('click', function(event) {
    if(event.target == event.currentTarget){
        popup.classList.remove('popup_opened');
        page.classList.remove('page_active');
    }
});

exitButton.addEventListener('click', function(event) {
    togglePopup();
});

submitButton.addEventListener('click', function(event) {
    togglePopup();
});

