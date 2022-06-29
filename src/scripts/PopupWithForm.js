import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  /*     Кроме селектора попапа принимает в конструктор колбэк сабмита формы. */
  constructor(popupSelector, submitHandler, getterCallBack = null) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = Array.from(
      this._popup.querySelectorAll(".popup__input")
    );
    this._getterCallBack = getterCallBack;
  }

  /*   метод, который собирает данные всех полей формы */
  _getInputValues = () => {
    const values = {};
    this._inputsList.forEach((input) => {
      values[input.id.slice(5)] = input.value;
      console.log(values)
    });
    return values;
  };

  _setInputValues = (values) => {
    this._inputsList.forEach((input) => {
      input.value = values[input.id.slice(5)];
    });
  };

  /* Метод setEventListeners с добавленным обработчиком сабмита формы*/
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  open() {
    if (this._getterCallBack) {
      this._setInputValues(this._getterCallBack);
    } else {
      this._popupForm.reset();
    }
    super.open();
  }

  /* публичный метод закрытия попапа */
  close() {
    super.close();
    this._popupForm.reset();
  }
}

/* Создайте класс PopupWithForm, который наследует от Popup. +

Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы. +
Содержит приватный метод _getInputValues, который собирает данные всех полей формы. + 

Перезаписывает родительский метод setEventListeners. +
Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
но и добавлять обработчик сабмита формы. +

Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться. +
Для каждого попапа создавайте свой экземпляр класса PopupWithForm. 
*/

/* функция внесения информации с попапа инфо в блок профиля */
/* const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  closePopup(popupInformacion);
  profileName.textContent = profileNameEdit.value;
  profileDescription.textContent = profileDescriptionEdit.value;
};

popupFormInfo.addEventListener("submit", handleProfileFormSubmit); */

/* функция внесения информации с попапа картинок */
/* const handleImagesFormSubmit = (evt) => {
  const cardElement = createCard(elementsTextEdit.value, elementsImageEdit.value)
  elementsSection.prepend(cardElement);
  evt.preventDefault();
  closePopup(popupImages);
  evt.target.reset();
};

popupFormImages.addEventListener("submit", handleImagesFormSubmit);
 */
