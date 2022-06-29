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
  }

  /*   метод, который собирает данные всех полей формы */
  _getInputValues = () => {
    const values = {};
    this._inputsList.forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
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