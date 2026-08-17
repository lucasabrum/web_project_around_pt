// Classe responsável por TODA a comunicação com o servidor da API.
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl; 
    this._headers = options.headers;  
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  // 1. Busca os dados do usuário logado.
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // 2. Busca a lista de cartões já existentes no servidor.
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // 3. Roda getUserInfo() e getInitialCards() em paralelo.
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // 4. Atualiza name e about do perfil (rota separada da atualização de avatar).
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  // 5. Atualiza a foto de perfil (rota separada da edição de name/about).
  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink }),
    }).then(this._checkResponse);
  }

  // 6. Cria um novo cartão.
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  // 7. Exclui um cartão pelo seu _id.
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // 8a. Curtir um cartão (mesma URL, mas com PUT).
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // 8b. Descurtir um cartão (mesma URL, mas com DELETE).
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // 9. Muda o status de like de um cartão, dependendo do estado atual (isLiked).
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.dislikeCard(cardId);
    }
    return this.likeCard(cardId);
  }
}

// Instancia a classe Api com a URL base e o token de autorização.
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "bdcd0c87-277f-4866-b342-7cc739caef72",
    "Content-Type": "application/json",
  },
});

export default api;

//{
 // "user": {
  //  "name": "Jacques Cousteau",
  //  "about": "Explorador",
  //  "avatar": "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
 //   "_id": "13067fae02e09e0be66790d6"
 // },
 // "token": "bdcd0c87-277f-4866-b342-7cc739caef72"
//}