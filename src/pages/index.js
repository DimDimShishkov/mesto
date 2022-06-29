import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  editButton,
  addImageButton,
  profileName,
  profileDescription,
  profileNameEdit,
  profileDescriptionEdit,
  config
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";

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
  const userData = userInfo.getUserInfo();
  profileNameEdit.value = userData.title;
  profileDescriptionEdit.value = userData.description;
  popupFormInfo.open();
  formValidators["info"].resetValidation();
});

// функция создания новой карточки
const handleCreateCard = (item) => {
  const card = new Card({ item, handleCardClick }, ".image-template");
  return cardList.addItem(card.generateCard());
}

/* создание попапа для загрузки новой картинки */
const popupFormImage = new PopupWithForm(".popup_type_images", {
  submitHandler: (item) => {
    handleCreateCard(item)
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
      handleCreateCard(item)
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
