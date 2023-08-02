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


    this._checkResponse = (response) => {
      if (response.ok) {
        const res = response.json();
        return res;
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    };

    this._request = async (url, { headers, body, method }) => {
      return await fetch(url, {
        headers: headers,
        body: body,
        method: method,
      })
        .then(this._checkResponse)
    };

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
    return this._request(this._getInfo, this._get);
  }

  getCards() {
    return this._request(this._getCards, this._get);
  }

  editProfile(info) {
    return this._request(this._editProfile, this._patch(info));
  }

  addCard(img) {
    return this._request(this._addCard, this._post(img));
  }

  deleteCard(cardId) {
    return this._request(`${this._deleteCard}/${cardId}`, this._delete());
  }

  setLike(cardId) {
    return this._request(`${this._like}/${cardId}`, this._put());
  }

  removeLike(cardId) {
    return this._request(`${this._like}/${cardId}`, this._delete());
  }

  newAvatar(link) {
    return this._request(this._editAvatar, this._patch(link));
  }

}

