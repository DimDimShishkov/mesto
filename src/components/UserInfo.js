export class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    const data = {
      title: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return data
  }

  setUserInfo(data) {
    this._profileName.textContent = data.title;
    this._profileDescription.textContent = data.description;
  }
}

/* 
Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе. + 
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. +
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии. +
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу. +
*/

