const page = document.querySelector(".page");

const profile = page.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__edit-button");
const addImageButton = profile.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileDescription = profileInfo.querySelector(".profile__description");
const addButton = profile.querySelector(".profile__add-button");

/* всплывающее окно для изменения имени профиля */
const popupInformacion = page.querySelector(".popup_type_info");
const popupContainerInfo = popupInformacion.querySelector(
  ".popup__container_type_info"
);
const popupFormInfo = popupContainerInfo.querySelector(
  ".popup__form_type_info"
);
const submitButtonInfo = popupFormInfo.querySelector(
  ".popup__submit-button_type_info"
);
const profileNameEdit = popupFormInfo.querySelector('[name="edit_name"]');
const profileDescriptionEdit = popupFormInfo.querySelector(
  '[name="edit_description"]'
);

/* всплывающее окно для добавления картинок */
const popupImages = page.querySelector(".popup_type_images");
const popupContainerImages = popupImages.querySelector(
  ".popup__container_type_images"
);
const popupFormImages = popupContainerImages.querySelector(
  ".popup__form_type_images"
);
const submitButtonImages = popupFormImages.querySelector(
  ".popup__submit-button_type_images"
);
const elementsTextEdit = popupFormImages.querySelector('[name="edit_text"]');
const elementsImageEdit = popupFormImages.querySelector('[name="edit_image"]');

/* всплывающее окно для просмотра картинок */
const popupImageContainer = page.querySelector(".popup_type_image");
const popupImage = popupImageContainer.querySelector(".popup__image");
const popupImageText = popupImageContainer.querySelector(".popup__description");

const elements = page.querySelector(".elements");

/* функция открытия попапа и блокировки страницы */
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  page.classList.add("page_active");
};

/* функция закрытия попапа и разблокировки страницы */
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  page.classList.remove("page_active");
};

/* функция внесения информации с попапа инфо в блок профиля */
const handleProfileFormSubmit = (evt) => {
  closePopup(popupInformacion);
  profileName.textContent = profileNameEdit.value;
  profileDescription.textContent = profileDescriptionEdit.value;
  evt.preventDefault();
};

/* открытие попапа для редактирования информации профиля */
editButton.addEventListener("click", function (evt) {
  openPopup(popupInformacion);
  profileNameEdit.value = profileName.textContent;
  profileDescriptionEdit.value = profileDescription.textContent;
  evt.preventDefault();
});

/* закрытие любого попапа через крестик*/
const closePopupButton = document.querySelectorAll(".popup__exit-button");
closePopupButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

popupFormInfo.addEventListener("submit", handleProfileFormSubmit);

/* убирает попап для редактирования профиля при клике на области кроме окна попапа */
popupInformacion.addEventListener("click", function (evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(popupInformacion);
  }
});

/* убирает попап для добавления изображений при клике на области кроме окна попапа */
popupImages.addEventListener("click", function (evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(popupImages);
  }
});

/* убирает попап для просмотра изображений при клике на области кроме окна попапа */
popupImageContainer.addEventListener("click", function (evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(popupImageContainer);
  }
});

/* открытие попапа для загрузки изображений */
addImageButton.addEventListener("click", function (evt) {
  openPopup(popupImages);
  evt.preventDefault();
});

/* функция добавления лайков на картинки */
const toggleLike = (evt) => {
  evt.target.classList.toggle("element__like_active");
};

/* функция удаления картинки нажатием на корзину */
const deleteImage = (evt) => {
  evt.target.closest(".element").remove();
};

const imageTemplate = document.querySelector("#image-template").content;
const element = imageTemplate.querySelector(".element");

/* открытие попапа для просмотра изображений */
const handleCardClick = (imageValue, titleValue) => {
  openPopup(popupImageContainer);
  popupImageText.textContent = titleValue;
  popupImage.src = imageValue;
  popupImage.alt = titleValue;
};

/* функция создания новой картинки, установка лайка и удаления */
const createCard = (imageValue, titleValue) => {
  const elementClone = element.cloneNode(true);
  const elementImage = elementClone.querySelector(".element__image");
  const elementText = elementClone.querySelector(".element__text");
  elementImage.src = imageValue;
  elementText.textContent = titleValue;
  elementImage.alt = titleValue;
  const likeImageButton = elementClone.querySelector(".element__like");
  likeImageButton.addEventListener("click", toggleLike);
  const deleteImageButton = elementClone.querySelector(".element__remove");
  deleteImageButton.addEventListener("click", deleteImage);
  elementImage.addEventListener("click", () =>
    handleCardClick(imageValue, titleValue)
  );
  return elementClone;
};

/* функция добавления новой картинки */
const addImage = (imageValue, titleValue) => {
  const cardElement = createCard(imageValue, titleValue);
  elements.prepend(cardElement);
};

/* функция внесения информации с попапа картинок */
const handleImagesFormSubmit = (evt) => {
  addImage(elementsImageEdit.value, elementsTextEdit.value);
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

initialCards.forEach(function (element) {
  addImage(element.link, element.name);
});
