import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit-button')
  }
// тестовый вариант 
  open(callback) {
super.open();
this.callback = callback;
this._submitButton.onclick = this.callback
  }
}