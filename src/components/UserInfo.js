
export default class UserInfo {
    constructor(profileSelectors) {
        this._name = document.querySelector(profileSelectors.name);
        this._job = document.querySelector(profileSelectors.job);
        this._profileAvatar = document.querySelector(profileSelectors.profileAvatar)
    }

    getUserInfo() {

        return {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._profileAvatar.src,
        }

    }

    setUserInfo({ username, job, avatar }) {
        this._name.textContent = username;
        this._job.textContent = job;
        this._profileAvatar.src = avatar;
    }

}

