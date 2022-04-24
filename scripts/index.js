let page = document.querySelector('.page');

let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popup = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submit-button');
let exitButton = document.querySelector('.popup__exit-button');
let profileNameEdit = document.querySelector('.popup__info_value_name');
let profileDescriptionEdit = document.querySelector('.popup__info_value_description');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_active');
};

editButton.addEventListener('click', function(event) {
    togglePopup();
    profileNameEdit.value = profileName.textContent;
    profileDescriptionEdit.value = profileDescription.textContent;
    event.preventDefault();
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
/* Функция закрытия окна через нажатие на область вне всплывающего popup окна 
(было на лайв-кодинге от Тиграна)
popup.addEventListener('click', function(event) {
    if(event.target == event.currentTarget){
        popup.classList.remove('popup_opened');
        page.classList.remove('page_active');
    }
}); 
*/