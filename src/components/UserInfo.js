
export default class UserInfo {
    constructor(profileSelectors) {
        this._name = document.querySelector(profileSelectors.name);
        this._job = document.querySelector(profileSelectors.job);
    }

    getUserInfo() {

        return {
            name: this._name.textContent,
            job: this._job.textContent
        }

    }

    setUserInfo(userInfo) {

        this._name.textContent = userInfo.name;
        this._job.textContent = userInfo.job;

    }

}

