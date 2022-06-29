import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  /*     Кроме селектора попапа принимает в конструктор колбэк сабмита формы. */
  constructor(popupSelector, {submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    /* this._getterCallBack = getterCallBack; */
  }

  /*   метод, который собирает данные всех полей формы */
  _getInputValues = () => {
    const values = {};
    this._inputsList.forEach((input) => {
      values[input.id.slice(5)] = input.value;
    });
    return values;
  };

  _setInputValues (values) {
    this._inputsList.forEach((input) => {
      input.value = values[input.id.slice(5)];
    });
  };

  _submitEvtHandler (evt) {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this.close();
  }

  /* Метод setEventListeners с добавленным обработчиком сабмита формы*/
  setEventListeners() {
    this._popupForm.addEventListener("submit", this._submitEvtHandler.bind(this));
    super.setEventListeners();
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
