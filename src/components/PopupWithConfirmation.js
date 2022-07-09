import { Popup } from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._submitHandler = submitHandler;
  }

  // уведомление о процессе загрузки
  renderLoading(isLoading, loadingMessage = 'Удаление...') {
    if (isLoading) {
      this._submitButton.textContent = loadingMessage
    } else {
      this._submitButton.textContent = this._initialTextSubmitButton;
    }
  }

/*   _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submitHandler();
  }

//  Метод setEventListeners с добавленным обработчиком сабмита формы
setEventListeners() {
  this._submitButton.addEventListener(
    "submit",
    this._submitEvtHandler.bind(this)
  );
  super.setEventListeners();
} */

  // тестовый вариант
  open(callback) {
    super.open();
    this.callback = callback;
    this._submitButton.onclick = this.callback;
  }
}
