export class Popup {
  constructor(popupSelector) {
    this._page = document.querySelector(".page");
    this._popup = this._page.querySelector(popupSelector);
  }

  /* приватный метод с логикой закрытия попапа клавишей Esc */
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  /* закрытие любого попапа при клике на области кроме окна попапа и через крестик */
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__exit-button")) {
        this.close();
      }
    });
  }

  /* публичный метод открытия попапа */
  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
    this._page.classList.add("page_active");
  }

  /* публичный метод закрытия попапа */
  close() {
    this._popup.classList.remove("popup_opened");
    this._page.classList.remove("page_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

/* 
Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа. + 
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа. + 
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc. + 
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. + 
Модальное окно также закрывается при клике на затемнённую область вокруг формы. + */
