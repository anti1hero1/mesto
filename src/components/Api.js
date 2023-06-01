class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    
    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    }

    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    getCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    addNewCard(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => 
        this._checkResponse(res)
      );
    }

    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    getCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    deleteCardLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    changeAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => {
        return this._checkResponse(res);
      });
    }

    changeUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => this._checkResponse(res)
      );
    }
}

export { Api }

