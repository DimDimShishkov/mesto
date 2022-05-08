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
const popupFormInfo = popupContainerInfo.querySelector(".popup__form_type_info");
const submitButtonInfo = popupFormInfo.querySelector(
  ".popup__submit-button_type_info"
);
const profileNameEdit = popupFormInfo.querySelector('[name="edit_name"]');
const profileDescriptionEdit = popupFormInfo.querySelector(
  '[name="edit_description"]'
);
const exitButtonInfo = popupContainerInfo.querySelector(
  ".popup__exit-button_type_info"
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
const exitButtonImages = popupContainerImages.querySelector(
  ".popup__exit-button_type_images"
);

const elements = page.querySelector(".elements");

/* функция открытия попапа и блокировки страницы */
const togglePopup = (popup) => {
  popup.classList.toggle("popup_opened");
  page.classList.toggle("page_active");
};

/* функция внесения информации с попапа инфо в блок профиля */
const formSubmitHandlerInfo = () => {
  togglePopup(popupInformacion);
  profileName.textContent = profileNameEdit.value;
  profileDescription.textContent = profileDescriptionEdit.value;
  event.preventDefault();
};

/* открытие попапа для редактирования информации профиля */
editButton.addEventListener("click", function (evt) {
  togglePopup(popupInformacion);
  profileNameEdit.value = profileName.textContent;
  profileDescriptionEdit.value = profileDescription.textContent;
  evt.preventDefault();
});

exitButtonInfo.addEventListener("click", function (evt) {
  togglePopup(popupInformacion);
});

popupFormInfo.addEventListener("submit", formSubmitHandlerInfo);
submitButtonInfo.addEventListener("click", formSubmitHandlerInfo);

/* убирает попап для редактирования профиля при клике на области кроме окна попапа */
popupInformacion.addEventListener("click", function (evt) {
  if (evt.target == evt.currentTarget) {
    popupInformacion.classList.remove("popup_opened");
    page.classList.remove("page_active");
  }
});

/* убирает попап для добавления изображений при клике на области кроме окна попапа */
popupImages.addEventListener("click", function (evt) {
  if (evt.target == evt.currentTarget) {
    popupImages.classList.remove("popup_opened");
    page.classList.remove("page_active");
  }
});

/* открытие попапа для загрузки изображений */
addImageButton.addEventListener("click", function (evt) {
  togglePopup(popupImages);
  evt.preventDefault();
});

/* закрытие попапа для загрузки изображений через крестик*/
exitButtonImages.addEventListener("click", function (evt) {
  togglePopup(popupImages);
});

/* функция добавления лайков на картинки */
const addLikeImage = (evt) => {
  evt.target.classList.toggle("element__like_active");
};

/* функция удаления картинки нажатием на корзину */
const deleteImage = (evt) => {
  evt.target.closest(".element").remove();
};

const imageTemplate = document.querySelector("#image-template").content;


/* функция добавления новой картинки, установка лайка и удаления */
const addImage = (imageValue, titleValue) => {
  const imageElement = imageTemplate.querySelector(".element").cloneNode(true);
  imageElement.querySelector(".element__image").src = imageValue;
  imageElement.querySelector(".element__text").textContent = titleValue;
  elements.prepend(imageElement);

  const likeImageButton = imageElement.querySelector(".element__like");
  likeImageButton.addEventListener("click", addLikeImage);

  const deleteImageButton = imageElement.querySelector(".element__remove");
  deleteImageButton.addEventListener("click", deleteImage);
};

/* функция внесения информации с попапа инфо в блок профиля */
const formSubmitHandlerImages = () => {
  addImage(elementsImageEdit.value, elementsTextEdit.value);
  event.preventDefault();
  togglePopup(popupImages);
  elementsTextEdit.value = "";
  elementsImageEdit.value = "";
};

popupFormImages.addEventListener("submit", formSubmitHandlerImages);
submitButtonImages.addEventListener("click", formSubmitHandlerImages);

/* Шесть карточек «из коробки» */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  addImage(element.link, element.name);
});
