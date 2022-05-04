let page = document.querySelector('.page');

let profile = page.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let editButton = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');
let addButton = profile.querySelector('.profile__add-button');

let popup = page.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupForm = popupContainer.querySelector('.popup__form');
let submitButton = popupForm.querySelector('.popup__submit-button');
let profileNameEdit = popupForm.querySelector('.popup__info_value_name');
let profileDescriptionEdit = popupForm.querySelector('.popup__info_value_description');
let exitButton = popupContainer.querySelector('.popup__exit-button');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_active');
};

function formSubmitHandler() {
    togglePopup();
    profileName.textContent = profileNameEdit.value;
    profileDescription.textContent = profileDescriptionEdit.value;
    event.preventDefault();
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

popupForm.addEventListener('submit', formSubmitHandler);
submitButton.addEventListener('click', formSubmitHandler);

popup.addEventListener('click', function(event) {
    if(event.target == event.currentTarget){
        popup.classList.remove('popup_opened');
        page.classList.remove('page_active');
    }
});
