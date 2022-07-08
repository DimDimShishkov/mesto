import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  editButton,
  addImageButton,
  profileName,
  profileDescription,
  profileAvatar,
  profileNameEdit,
  profileDescriptionEdit,
  profileAvatarEditButton,
  config,
  configApi,
  profileAvatarEdit,
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";

// запрос к серверу
const api = new Api(configApi);

// создание профиля
const userInfo = new UserInfo({
  profileName,
  profileDescription,
  profileAvatar,
});
api
  .handleDownloadProfileInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

// создание попапа с вводом инфо в блок профиля
const popupFormInfo = new PopupWithForm(".popup_type_info", {
  submitHandler: (data) => {
    api.handleUploadProfileInfo(data);
    userInfo.setUserInfo(data.title, data.description);
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
  api.handleDownloadProfileInfo().then((res) => {
    console.log(res);
  });
});

// создание попапа со сменой аватара профиля
const popupFormAvatar = new PopupWithForm(".popup_type_avatar", {
  submitHandler: (data) => {
    api.handleUploadProfileAvatar(data);
    userInfo.setUserAvatar(data.avatar);
    console.log(data.avatar);
  },
});

/* открытие попапа с загрузкой аватара профиля */
profileAvatarEditButton.addEventListener("click", () => {
  popupFormAvatar.open();
  formValidators["new-avatar"].resetValidation();
  api.handleDownloadProfileInfo().then((res) => {
    console.log(res.avatar);
  });
});

// установка слушателя на попап со сменой аватара профиля
popupFormAvatar.setEventListeners();

// функция создания новой карточки
const handleCreateCard = (item) => {
  const card = new Card({ item, handleCardClick }, ".image-template");
  return card.generateCard();
};

// Загрузка карточек с сервера
api.handleDownloadCards().then((res) => {
  console.log(res);
  res.forEach((item) => {
    cardList.addItemPrepend(handleCreateCard(item));
  });
});

/* создание попапа для загрузки новой картинки */
const popupFormImage = new PopupWithForm(".popup_type_images", {
  submitHandler: (item) => {
    cardList.addItemPrepend(handleCreateCard(item));
    api.handleUploadCard(item);
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

// создание попапа для удаления картинки
/* const popupDeleteImage = new PopupWithForm(".popup_type_delete-image", {
  submitHandler: (item) => {
    //  cardList.addItemPrepend(handleCreateCard(item));
    api.handleDeleteServerCard(item);
  },
}); */

// определение секции, куда положить новые карточки
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItemPrepend(handleCreateCard(item));
    },
  },
  ".elements"
);

// заполнение секции карточками из коробки
/* cardList.renderItems(); */

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
