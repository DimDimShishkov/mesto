export class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._avatar = profileAvatar;
  }

  getUserInfo() {
    const data = {
      title: this._profileName.textContent,
      description: this._profileDescription.textContent,
      avatar: this._avatar.src
    };
    return data;
  }

  setUserInfo(title, description) {
    this._profileName.textContent = title;
    this._profileDescription.textContent = description;
  }

  setUserAvatar(item) {
    this._avatar.src = item
  }
}

/* 
Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе. + 
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. +
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии. +
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу. +
*/
