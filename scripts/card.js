export default class Card {
  constructor({ name, link }, templateSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Busca o template no DOM e devolve uma cópia pronta para ser preenchida.
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  // Adiciona todos os ouvintes de evento do cartão.
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._removeButton.addEventListener("click", () =>
      this._handleRemoveClick()
    );
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }

  // Alterna o estado "curtido" do cartão.
  _handleLikeClick() {
    this._likeButton.classList.toggle("element__button-like");
  }

  // Remove o cartão da página.
  _handleRemoveClick() {
    this._element.remove();
    this._element = null;
  }

  // Delega a abertura do pop-up de imagem para quem instanciou o cartão.
  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  // Monta o cartão preenchido e com os eventos já configurados.
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__text");
    this._likeButton = this._element.querySelector(".element__button");
    this._removeButton = this._element.querySelector(".element__remove-btn");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}