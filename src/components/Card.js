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
    this._item = item
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleAddLikesNumber() {
    if (this._cardLikes.textContent > 0) {
      this._cardLikes.classList.add("element__likes_active");
    } else {
      this._cardLikes.classList.remove("element__likes_active");
    }
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
    this._handleAddLikesNumber()
    this._setEventListeners();
    return this._element;
  }

  toggleLike() {
    this._cardLike.classList.toggle("element__like_active");
    if (this._cardLike.classList.contains("element__like_active")) {
      this._cardLikes.textContent ++
      this._handleCardLike(this._id, true)
    } else {
      this._cardLikes.textContent --
      this._handleCardLike(this._id, false)
    }
    this._handleAddLikesNumber()
  }

  setLike(data) {
    this._element.querySelector('.element__likes').textContent = data.likes.length;
  }

  _deleteImage() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this.toggleLike();
      console.log(this._item.owner._id)
    //  this._handleCardLike(this)
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleCardDelete(this._id, this)
    //  this._deleteImage();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._title);
    });
  }

  // вывод иконки удаления карточки 
  _cardDeleteCan() {

  }

  // удаление карточки
  deleteImage() {
    this._element.remove();
  }
}
