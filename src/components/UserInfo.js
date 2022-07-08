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