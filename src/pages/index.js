import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
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
    userInfo.setUserID(res._id);
    // Загрузка карточек с сервера
    api
      .handleDownloadCards()
      .then((res) => {
        res.forEach((item) => {
          cardList.addItemAppend(handleCreateCard(item));
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        popupFormInfo.close();
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
        popupFormAvatar.close();
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
  const card = new Card(
    { item, handleCardClick, handleCardDelete, handleCardLike },
    ".image-template",
    userInfo._userID
  );
  return card.generateCard();
};

/* создание попапа для загрузки новой картинки */
const popupFormImage = new PopupWithForm(".popup_type_images", {
  submitHandler: (item) => {
    popupFormImage.renderLoading(true);
    api
      .handleUploadCard(item)
      .then((res) => {
        cardList.addItemPrepend(handleCreateCard(res));
        popupFormImage.close();
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
const handleCardDelete = (id, card) => {
  popupDeleteCard.submitEvtHandler(() => {
    handleDeleteConfirm(id, card);
  });
  popupDeleteCard.open();
};

// функция удаления картинки
const handleDeleteConfirm = (id, card) => {
  popupDeleteCard.renderLoading(true);
  api
    .handleDeleteServerCard(id)
    .then(() => {
      card.deleteImage();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDeleteCard.renderLoading(false);
    });
};

// функция установки лайка на картинку
const handleCardLike = (id, isLiked, card) => {
  if (isLiked) {
    // добавить лайк
    api
      .handleCardLikes(id, true)
      .then((res) => {
        card.handleAddLikesNumber(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // убрать лайк
    api
      .handleCardLikes(id, false)
      .then((res) => {
        card.handleAddLikesNumber(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// создание попапа для удаления картинки
const popupDeleteCard = new PopupWithConfirmation(".popup_type_delete-image");

// установка слушателя на попап для удаления картинки
popupDeleteCard.setEventListeners();

// определение секции, куда положить новые карточки
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItemPrepend(handleCreateCard(item));
    },
  },
  ".elements"
);

// заполнение секции карточками из коробки для теста адекватности
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
