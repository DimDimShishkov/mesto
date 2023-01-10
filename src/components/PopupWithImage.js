import { Popup } from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDescription = this._popup.querySelector(".popup__description");
    this._popupImage = this._popup.querySelector(".popup__image");
  }

  /* публичный метод открытия попапа */
  open(link, title) {
    /* перезапись родительского метода */
    this._popupDescription.textContent = title;
    this._popupImage.src = link;
    this._popupImage.alt = title;

    super.open();
  }
}

/* 
Создайте класс PopupWithImage, который наследует от Popup. +
Этот класс должен перезаписывать родительский метод open. +
В методе open класса PopupWithImage нужно вставлять в попап 
картинку с src изображения и подписью к картинке.+
  */
