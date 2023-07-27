import { request } from '../utils/utils.js';

export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._get = { headers: headers, method: 'GET' };
    this._patch = function (body) {
      return { headers: headers, method: 'PATCH', body: body };
    };
  }

  getInfo() {
    return request(`${this._url}/users/me`, this._get);
  }

  getCards() {
    return request(`${this._url}/cards`, this._get);
  }

  editProfle(body) {
    return request(`${this._url}/users/me`, this._patch(body));
  }
}
