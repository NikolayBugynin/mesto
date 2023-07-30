export default class UserInfo {
  constructor(profileSelectors) {
    this._name = document.querySelector(profileSelectors.name);
    this._job = document.querySelector(profileSelectors.job);
    this._profileAvatar = document.querySelector(profileSelectors.profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._profileAvatar.src = avatar;
  }

  changeUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  changeAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}
