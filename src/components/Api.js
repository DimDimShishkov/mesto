export class Api {
  constructor(configApi) {
    this._url = configApi.url;
    this._headers = configApi.headers;
  }

  // обработчик ответа сервера
  _handleReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // уведомление о процессе загрузки (test)
  /*   _renderLoading(button, isLoading) {
    if (isLoading) {
    }
  }
 */

  // Редактирование профиля
  handleUploadProfileInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }

  // Редактирование аватара профиля
  handleUploadProfileAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }

  // Загрузка информации о пользователе с сервера
  handleDownloadProfileInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }

  // Загрузка карточек с сервера
  handleDownloadCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }

  // Загрузка карточек на сервер
  handleUploadCard(item) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление картинки
  handleDeleteServerCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }

  // Добавление лайков  на картинки
  handleCardLikes(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._handleReturn(res))
      .catch((err) => {
        console.log(err);
      });
  }
}
