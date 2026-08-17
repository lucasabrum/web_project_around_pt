export default class Card {

  constructor(
    { _id, name, link, owner, isLiked },
    templateSelector,
    userId,
    { handleCardClick, handleLikeClick, handleDeleteClick }
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._isLiked = isLiked;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

   _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  // Adiciona todos os ouvintes de evento do cartão.
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._onLikeClick());
    this._removeButton.addEventListener("click", () => this._onRemoveClick());
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }


  _onLikeClick() {
    this._handleLikeClick(this._id, this._isLiked);
  }

   _onRemoveClick() {
    this._handleDeleteClick(this._id, this);
  }

  // Delega a abertura do pop-up de imagem para quem instanciou o cartão.
  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("element__button-like", isLiked);
  }

 
  removeFromDOM() {
    this._element.remove();
    this._element = null;
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

    // Mostra o estado de curtida vindo do servidor.
    this.setIsLiked(this._isLiked);

   
    if (this._owner !== this._userId) {
      this._removeButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }
}
