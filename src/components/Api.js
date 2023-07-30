import { request } from '../utils/utils.js';

export default class Api {
  constructor({ baseUrl, headers }) {
    // urls
    this._url = baseUrl;
    this._getInfo = `${this._url}/users/me`;
    this._getCards = `${this._url}/cards`;
    this._editProfile = `${this._url}/users/me`;
    this._editAvatar = `${this._url}/users/me/avatar`;
    this._addCard = `${this._url}/cards`;
    this._deleteCard = `${this._url}/cards`; //--'/cardId'
    this._like = `${this._url}/cards/likes`; //-- 'cardId'

    // for requests
    this._headers = headers;
    this._get = { headers: this._headers, method: 'GET' };
    this._patch = ({ name, about, avatar }) => {
      let body;
      name && about ? (body = { name: name, about: about }) : (body = { avatar: avatar });
      return {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify(body),
      };
    };
    this._post = (img) => {
      return {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          name: img.name,
          link: img.link,
        }),
      };
    };

    this._delete = () => {
      return {
        headers: this._headers,
        method: 'DELETE',
      };
    };

    this._put = () => {
      return {
        headers: this._headers,
        method: 'PUT',
      };
    };
  }

  // requests
  getInfo() {
    return request(this._getInfo, this._get);
  }

  getCards() {
    return request(this._getCards, this._get);
  }

  editProfle(info) {
    return request(this._editProfile, this._patch(info));
  }

  addCard(img) {
    return request(this._addCard, this._post(img));
  }

  deleteCard(cardId) {
    return request(`${this._deleteCard}/${cardId}`, this._delete());
  }

  setLike(cardId) {
    return request(`${this._like}/${cardId}`, this._put());
  }

  removeLike(cardId) {
    return request(`${this._like}/${cardId}`, this._delete());
  }

  newAvatar(link) {
    return request(this._editAvatar, this._patch(link));
  }
}
