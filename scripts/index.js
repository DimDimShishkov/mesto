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

/* функция блокировки страницы при открытии любого попапа */
export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  page.classList.add("page_active");
  document.addEventListener("keydown", setClosePopupListener);
};

/* функция разблокировки страницы при закрытии любого попапа */
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  page.classList.remove("page_active");
  document.removeEventListener("keydown", setClosePopupListener);
};

/* функция внесения информации с попапа инфо в блок профиля */
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  closePopup(popupInformacion);
  profileName.textContent = profileNameEdit.value;
  profileDescription.textContent = profileDescriptionEdit.value;
};

/* открытие попапа для редактирования информации профиля */
editButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupInformacion);
  profileNameEdit.value = profileName.textContent;
  profileDescriptionEdit.value = profileDescription.textContent;
  const form = new FormValidator(config, popupFormInfo);
  form.enableValidation();
});

/* закрытие любого попапа через крестик*/
const closePopupButton = document.querySelectorAll(".popup__exit-button");
closePopupButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

popupFormInfo.addEventListener("submit", handleProfileFormSubmit);

/* закрытие любого попапа для при клике на области кроме окна попапа */
const popupWindow = Array.from(document.querySelectorAll(".popup"));
popupWindow.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target == evt.currentTarget) {
      closePopup(popup);
    }
  });
});

/* закрытие любого попапа для при нажатии на кнопку Esc */
const setClosePopupListener = (evt) => {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
};

/* открытие попапа для загрузки изображений */
addImageButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupImages);
  const form = new FormValidator(config, popupFormImages);
  form.enableValidation();
});

/* функция внесения информации с попапа картинок */
const handleImagesFormSubmit = (evt) => {
  const card = new Card(
    elementsTextEdit.value,
    elementsImageEdit.value,
    ".image-template"
  );
  const cardElement = card.generateCard();
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
  const card = new Card(item.name, item.link, ".image-template", openPopup);
  const cardElement = card.generateCard();
  elementsSection.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(`.popup__form`));
formList.forEach((formElement) => {
  const form = new FormValidator(config, formElement);
  form.enableValidation();
});
