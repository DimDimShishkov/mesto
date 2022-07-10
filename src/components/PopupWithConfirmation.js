import { Popup } from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._initialTextSubmitButton = this._submitButton.textContent;
  }

  // уведомление о процессе загрузки
  renderLoading(isLoading, loadingMessage = "Удаление...") {
    if (isLoading) {
      this._submitButton.textContent = loadingMessage;
    } else {
      this._submitButton.textContent = this._initialTextSubmitButton;
    }
  }

  submitEvtHandler(submitHandler) {
    this._submitHandler = submitHandler;
  }

  //  Метод setEventListeners с добавленным обработчиком сабмита формы
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
    super.setEventListeners();
  }
}
