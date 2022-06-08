import { openPopup } from "./index.js";

const popupImageContainer = document.querySelector(".popup_type_image");

export class Card {
  constructor(itemName, itemLink, cardSelector) {
    this._image = itemLink;
    this._title = itemName;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__image").src = `${this._image}`;
    this._element.querySelector(".element__image").alt = this._title;
    this._element.querySelector(".element__text").textContent = this._title;

    return this._element;
  }

  _toggleLike() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _deleteImage() {
    this._element.remove();
  }

  _handleCardClick() {
    openPopup(popupImageContainer);
    popupImageContainer.querySelector(".popup__description").textContent =
      this._title;
    const popupImage = popupImageContainer.querySelector(".popup__image");
    popupImage.src = this._image;
    popupImage.alt = this._title;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._toggleLike();
      });
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", () => {
        this._deleteImage();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
