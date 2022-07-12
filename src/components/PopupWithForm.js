import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  /*     Кроме селектора попапа принимает в конструктор колбэк сабмита формы. */
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__submit-button");
    this._initialTextSubmitButton = this._submitButton.textContent;
    this._inputsList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
  }

  // уведомление о процессе загрузки
  renderLoading(isLoading, loadingMessage = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingMessage
    } else {
      this._submitButton.textContent = this._initialTextSubmitButton;
    }
  }

  /*   метод, который собирает данные всех полей формы */
  _getInputValues = () => {
    const values = {};
    this._inputsList.forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
  };

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  /* Метод setEventListeners с добавленным обработчиком сабмита формы*/
  setEventListeners() {
    this._popupForm.addEventListener(
      "submit",
      this._submitEvtHandler.bind(this)
    );
    super.setEventListeners();
  }

  /* публичный метод закрытия попапа */
  close() {
    super.close();
    this._popupForm.reset();
  }
}
