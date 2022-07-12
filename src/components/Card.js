export class Card {
  constructor(
    { item, handleCardClick, handleCardDelete, handleCardLike },
    templateSelector,
    userID
  ) {
    this._link = item.link;
    this._title = item.name;
    this._likes = item.likes;
    this._id = item._id;
    this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._item = item;
    this._userID = userID; 
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  // проверка количества лайков
  handleAddLikesNumber(likes) {
    this._cardLikes.textContent = likes;
    if (this._cardLikes.textContent > 0) {
      this._cardLikes.classList.add("element__likes_active");
    } else {
      this._cardLikes.classList.remove("element__likes_active");
    }
  }

  // проверка наличия моих лайков
  _handleAddLikesActive() {
    if (this._likesCallback()) {
      this._cardLike.classList.add("element__like_active");
    } else {
      this._cardLike.classList.remove("element__like_active");
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
    this._handleHideDeleteButton();
    this.handleAddLikesNumber(this._likes.length);
    this._handleAddLikesActive();
    this._setEventListeners();
    return this._element;
  }

  toggleLike() {
    if (this._cardLike.classList.contains("element__like_active")) {
      this._handleCardLike(this._id, false, this._element);
       this._cardLikes.textContent--;
    } else {
      this._handleCardLike(this._id, true, this._element);
       this._cardLikes.textContent++;
    }
    this._cardLike.classList.toggle("element__like_active");
     this.handleAddLikesNumber(this._cardLikes.textContent);
  }

  // вывод иконки удаления карточки
  _handleHideDeleteButton() {
    if (this._item.owner._id == this._userID) {
      this._cardDelete.style.display = "block";
    } else {
      this._cardDelete.style.display = "none";
    }
  }

  // условие наличия среди лайков моих 
  _likesCallback() {
    return this._item.likes.some(like => like._id == this._userID)
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
       this.toggleLike();
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleCardDelete(this._id, this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._title);
    });
  }

  // удаление карточки
  deleteImage() {
    this._element.remove();
  }
}
