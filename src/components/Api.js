export class Api {
  constructor(configApi) {
    this.url = configApi.url;
    this.headers = configApi.headers;
  }

  // Редактирование профиля
  handleUploadProfileInfo(data) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    });
  }

  // Редактирование аватара профиля
  handleUploadProfileAvatar(data) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data,
        
      }),
    });
  }

  // Загрузка информации о пользователе с сервера
  handleDownloadProfileInfo() {
    return fetch(`${this.url}users/me`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.json();
    });
  }

  // Загрузка карточек с сервера
  handleDownloadCards() {
    return fetch(`${this.url}cards`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => {
      return res.json();
    });
  }

  // Загрузка карточек на сервер
  handleUploadCard(item) {
    return fetch(`${this.url}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    });
  }

  // Добавление лайков  на картинки
  handleUploadLikes(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      return res.json();
    });
  }
}
