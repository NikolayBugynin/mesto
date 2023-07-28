import { request } from '../utils/utils.js';

export default class Api {
  constructor({ baseUrl, headers }) {
    // urls
    this._url = baseUrl;
    this._getInfo = `${this._url}/users/me`
    this._getCards = `${this._url}/cards`
    this._editProfile = `${this._url}/users/me`
    this._addCard = `${this._url}/cards`

    // requests
    this._get = { headers: headers, method: 'GET' };
    this._patch = function (info) {
      return {
        headers: headers, method: 'PATCH', body: JSON.stringify({
          name: info.name,
          about: info.about
        })
      };
    };
    this._post = function (img) {
      return {
        headers: headers, method: 'POST', body: JSON.stringify({
          name: img.name,
          link: img.link
        })
      }
    }
  }

  getInfo() {
    return request(this._getInfo, this._get);
  }

  getCards() {
    return request(this._getCards, this._get);
  }

  editProfle(info) {
    return request(this._editProfile, this._patch(info))
  }

  addCard(img) {
    return request(this._addCard, this._post(img))
  }
}

