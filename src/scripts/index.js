import { Card } from "./Card.js";
import { config, FormValidator } from "./FormValidator.js";
import {
  initialCards,
  editButton,
  addImageButton,
  profileName,
  profileDescription,
  profileNameEdit,
  profileDescriptionEdit,
} from "./constants";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";
import "../pages/index.css";
import PopupWithImage from "./PopupWithImage.js";
import { Section } from "./Section.js";

// создание профиля
const userInfo = new UserInfo({ profileName, profileDescription });

/* создание попапа с вводом инфо в блок профиля */
const popupFormInfo = new PopupWithForm(".popup_type_info", {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
  },
});

/* установка слушателя на попап с вводом инфо в блок профиля */
popupFormInfo.setEventListeners();

/* открытие попапа с вводом инфо в блок профиля */
editButton.addEventListener("click", () => {
  const userInfo = new UserInfo({ profileName, profileDescription });
  const userData = userInfo.getUserInfo();
  profileNameEdit.value = userData.title;
  profileDescriptionEdit.value = userData.description;
  popupFormInfo.open();
  formValidators["info"].resetValidation();
});

/* создание попапа для создания новой картинки */
const popupFormImage = new PopupWithForm(".popup_type_images", {
  submitHandler: (item) => {
    const userCard = new Card({ item, handleCardClick }, ".image-template");
    cardList.addItem(userCard.generateCard());
  },
});

/* установка слушателя для создания новой картинки */
popupFormImage.setEventListeners();

/* установка слушателя на попап для создания новой картинки */
addImageButton.addEventListener("click", () => {
  formValidators["images"].resetValidation();
  popupFormImage.open();
});

// всплывающее окно для просмотра картинок
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

/* открытие попапа для просмотра изображений */
const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

// определение секции, куда положить новые карточки
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({ item, handleCardClick }, ".image-template");
      cardList.addItem(card.generateCard());
    },
  },
  ".elements"
);

// заполнение секции карточками из коробки
cardList.renderItems();

// создание объекта для валидации
const formValidators = {};

// определение валидации
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

// запуск валидации
enableValidation(config);
