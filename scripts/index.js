import { Card } from "./Card.js";
import { config, FormValidator } from "./FormValidator.js";

const page = document.querySelector(".page");

// определение постоянных
const profile = page.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const addImageButton = profile.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileDescription = profileInfo.querySelector(".profile__description");

// всплывающее окно для изменения имени профиля
const popupInformacion = page.querySelector(".popup_type_info");
const popupFormInfo = popupInformacion.querySelector(".popup__form_type_info");
const profileNameEdit = document.getElementById("edit-name");
const profileDescriptionEdit = document.getElementById("edit-description");

// всплывающее окно для добавления картинок
const popupImages = page.querySelector(".popup_type_images");
const popupFormImages = popupImages.querySelector(".popup__form_type_images");
const elementsTextEdit = document.getElementById("image-name");
const elementsImageEdit = document.getElementById("image-link");

// чтобы не искать несколько раз секцию с картинками
const elementsSection = page.querySelector(".elements");

// всплывающее окно для просмотра картинок
const popupImageContainer = document.querySelector(".popup_type_image");
const popupImageDescription = popupImageContainer.querySelector(
  ".popup__description"
);
const popupImage = popupImageContainer.querySelector(".popup__image");

/* функция блокировки страницы при открытии любого попапа */
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  page.classList.add("page_active");
  document.addEventListener("keydown", handleEscape);
};

/* функция разблокировки страницы при закрытии любого попапа */
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  page.classList.remove("page_active");
  document.removeEventListener("keydown", handleEscape);
};

/* функция внесения информации с попапа инфо в блок профиля */
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  closePopup(popupInformacion);
  profileName.textContent = profileNameEdit.value;
  profileDescription.textContent = profileDescriptionEdit.value;
};

popupFormInfo.addEventListener("submit", handleProfileFormSubmit);

/* открытие попапа для редактирования информации профиля */
editButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupInformacion);
  profileNameEdit.value = profileName.textContent;
  profileDescriptionEdit.value = profileDescription.textContent;
  formValidators['info'].resetValidation()
  
});

/* закрытие любого попапа при клике на области кроме окна попапа и через крестик */
const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__exit-button')) {
      closePopup(popup)
    }
  });
});

/* закрытие любого попапа для при нажатии на кнопку Esc */
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

/* открытие попапа для загрузки изображений */
addImageButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupImages);
  formValidators['images'].resetValidation()

});

/* открытие попапа для просмотра изображений */
const handleCardClick = (imageValue, titleValue) => {
  popupImageDescription.textContent = titleValue;
  popupImage.src = imageValue;
  popupImage.alt = titleValue;
  openPopup(popupImageContainer);
};

/* функция создания новой картинки, установка лайка и удаления */
const createCard = (itemName, itemLink) => {
  const card = new Card(
    itemName,
    itemLink,
    ".image-template",
    handleCardClick
  );
  const cardElement = card.generateCard();
  return cardElement
}

/* функция внесения информации с попапа картинок */
const handleImagesFormSubmit = (evt) => {
  const cardElement = createCard(elementsTextEdit.value, elementsImageEdit.value)
  elementsSection.prepend(cardElement);
  evt.preventDefault();
  closePopup(popupImages);
  evt.target.reset();
};

popupFormImages.addEventListener("submit", handleImagesFormSubmit);

/* Шесть карточек «из коробки» */
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link)
  elementsSection.prepend(cardElement);
});

const formValidators = {}

const enableValidation = (config) => {
  const formsList = Array.from(document.querySelectorAll(`.${config.formSelector}`))
  formsList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name')

     formValidators[formName] = validator;
    validator.enableValidation();
   });
 };
 
 enableValidation(config);

