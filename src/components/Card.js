export class Card {
  constructor(
    { item, handleCardClick, handleCardDelete, handleCardLike },
    templateSelector
  ) {
    this._link = item.link;
    this._title = item.name;
    this._likes = item.likes;
    this._id = item._id;
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    this._cardLikes = this._element.querySelector(".element__likes");
    this._cardImage.src = `${this._link}`;
    this._cardImage.alt = this._title;
    this._cardImage.id = this._id;
    this._cardText.textContent = this._title;

    this._cardLikes.textContent = this._likes.length;
    if (this._likes.length > 0) {
      this._cardLikes.classList.add("element__likes_active");
    } else {
      this._cardLikes.classList.remove("element__likes_active");
    }
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
      this._handleCardClick(this._link, this._title);
    });
  }
}
