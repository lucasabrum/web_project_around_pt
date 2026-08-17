import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-image__photo");
    this._caption = this._popup.querySelector(".popup-image__title");
  }

  // Preenche a imagem e a legenda antes de abrir o pop-up.
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
