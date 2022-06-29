export const page = document.querySelector(".page");

// определение постоянных
export const profile = page.querySelector(".profile");
export const profileInfo = profile.querySelector(".profile__info");
export const editButton = document.querySelector(".profile__edit-button");
export const addImageButton = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");

// всплывающее окно для изменения имени профиля
export const popupInformacion = page.querySelector(".popup_type_info");
export const popupFormInfo = popupInformacion.querySelector(".popup__form_type_info");
export const profileNameEdit = document.getElementById("edit-title");
export const profileDescriptionEdit = document.getElementById("edit-description");

// всплывающее окно для добавления картинок
export const popupImages = page.querySelector(".popup_type_images");
export const popupFormImages = popupImages.querySelector(".popup__form_type_images");
export const elementsTextEdit = document.getElementById("image-name");
export const elementsImageEdit = document.getElementById("image-link");

// чтобы не искать несколько раз секцию с картинками
export const elementsSection = page.querySelector(".elements");

// всплывающее окно для просмотра картинок
export const popupImageContainer = document.querySelector(".popup_type_image");
export const popupImageDescription = popupImageContainer.querySelector(
  ".popup__description"
);
export const popupImage = popupImageContainer.querySelector(".popup__image");

/* Шесть карточек «из коробки» */
export const initialCards = [
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
