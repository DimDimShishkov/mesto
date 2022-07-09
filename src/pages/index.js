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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
    popupFormInfo.renderLoading(true);
    api
      .handleUploadProfileInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormInfo.renderLoading(false);
      });
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

// создание попапа со сменой аватара профиля
const popupFormAvatar = new PopupWithForm(".popup_type_avatar", {
  submitHandler: (data) => {
    popupFormAvatar.renderLoading(true);
    api
      .handleUploadProfileAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormAvatar.renderLoading(false);
      });
  },
});

// установка слушателя на попап со сменой аватара профиля
popupFormAvatar.setEventListeners();

/* открытие попапа с загрузкой аватара профиля */
profileAvatarEditButton.addEventListener("click", () => {
  popupFormAvatar.open();
  formValidators["new-avatar"].resetValidation();
});

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
    popupFormImage.renderLoading(true);
    api
      .handleUploadCard(item)
      .then((res) => {
        cardList.addItemPrepend(handleCreateCard(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormImage.renderLoading(false);
      });
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

// установка слушателя на попап для просмотра картинок
popupWithImage.setEventListeners();

/* открытие попапа для просмотра изображений */
const handleCardClick = (link, title) => {
  popupWithImage.open(link, title);
};

// открытие попапа для удаления картинки
/* const handleCardDelete = (id, card) => {
  PopupDeleteCard.open()
} */

// создание попапа для удаления картинки
const PopupDeleteCard = new PopupWithConfirmation(".popup_type_delete-image", {
  submitHandler: (item) => {
    PopupDeleteCard.renderLoading(true)
    api.handleDeleteServerCard(item._id).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      PopupDeleteCard.renderLoading(false)
    })
  },
});

// установка слушателя на попап для удаления картинки
PopupDeleteCard.setEventListeners()

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
