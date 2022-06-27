export class Card {
  constructor(itemName, itemLink, cardSelector, handleCardClick) {
    this._image = itemLink;
    this._title = itemName;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._cardLike = this._element.querySelector(".element__like");
    this._cardDelete = this._element.querySelector(".element__remove");

    this._cardImage.src = `${this._image}`;
    this._cardImage.alt = this._title;
    this._cardText.textContent = this._title;
    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._cardLike.classList.toggle("element__like_active");
  }

  _deleteImage() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._toggleLike();
    });

    this._cardDelete.addEventListener("click", () => {
      this._deleteImage();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });
  }
}