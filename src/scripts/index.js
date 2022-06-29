import { Card } from "./Card.js";
import { config, FormValidator } from "./FormValidator.js";
import { page, initialCards } from "./constants";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import "../pages/index.css";
import PopupWithImage from "./PopupWithImage.js";
import { Section } from "./Section.js";

// определение постоянных
const profile = page.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = page.querySelector(".profile__edit-button");
const addImageButton = page.querySelector(".profile__add-button");
/* const profileName = profileInfo.querySelector(".profile__name"); */
/* const profileDescription = profileInfo.querySelector(".profile__description"); */

// всплывающее окно для изменения имени профиля
/* const popupInformacion = page.querySelector(".popup_type_info"); */
/* const popupFormInfo = popupInformacion.querySelector(".popup__form_type_info"); */
const profileNameEdit = document.getElementById("edit-name");
const profileDescriptionEdit = document.getElementById("edit-description");

// всплывающее окно для добавления картинок
/* const popupImages = page.querySelector(".popup_type_images"); */
/* const popupFormImages = popupImages.querySelector(".popup__form_type_images"); */
const elementsTextEdit = document.getElementById("image-name");
const elementsImageEdit = document.getElementById("image-link");

// чтобы не искать несколько раз секцию с картинками
const elementsSection = page.querySelector(".elements");

// блок профиля пользователя
const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileDescription: ".profile__description",
});

/* функция внесения информации с попапа инфо в блок профиля */
const handleProfileFormSubmit = (inputsData) => {
  /*   profileName.textContent = profileNameEdit.value;
    profileDescription.textContent = profileDescriptionEdit.value; */
  userInfo.setUserInfo(inputsData);
  popupFormInfo.close();
};

/* создание попапа с вводом инфо в блок профиля */
const popupFormInfo = new PopupWithForm(
  ".popup_type_info",
  handleProfileFormSubmit
);

/* установка слушателя на попап с вводом инфо в блок профиля */
popupFormInfo.setEventListeners();

/* открытие попапа с вводом инфо в блок профиля */
editButton.addEventListener("click", () => {
  popupFormInfo.open(userInfo.getUserInfo());
  formValidators["info"].resetValidation();
});

/* открытие попапа для редактирования информации профиля */
/* editButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupInformacion);
  profileNameEdit.value = profileName.textContent;
  profileDescriptionEdit.value = profileDescription.textContent;
  formValidators['info'].resetValidation()
  
}); */

/* функция внесения информации в картинку с попапа */
const handleImagesFormSubmit = (evt) => {
  /*   const cardElement = createCard(
      elementsTextEdit.value,
      elementsImageEdit.value
    );
    elementsSection.prepend(cardElement);
    evt.preventDefault();
    closePopup(popupImages);
    evt.target.reset(); */
  popupFormImages.close();
};

/* создание попапа для загрузки изображений */
const popupFormImages = new PopupWithForm(
  ".popup_type_images",
  handleImagesFormSubmit
);

/* установка слушателя на попап для загрузки изображений */
popupFormImages.setEventListeners();

/* открытие попапа для загрузки изображений */
addImageButton.addEventListener("click", () => {
  popupFormImages.open();
  formValidators["info"].resetValidation();
});

// всплывающее окно для просмотра картинок
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

/* открытие попапа для просмотра изображений */
const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

/* функция создания новой картинки, установка лайка и удаления */
const createCard = (item) => {
  const card = new Card({ item, handleCardClick }, ".image-template");
  return card.generateCard();
};

/* const createCard = (itemName, itemLink) => {
  const card = new Card(
    itemName,
    itemLink,
    ".image-template",
    handleCardClick
  );
  const cardElement = card.generateCard();
  return cardElement
} */

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elementsSection.prepend(cardElement);
});

const formValidators = {};

const enableValidation = (config) => {
  const formsList = Array.from(
    document.querySelectorAll(`.${config.formSelector}`)
  );
  formsList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/*  const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({item}, handleCardClick)
  }
 }) */
