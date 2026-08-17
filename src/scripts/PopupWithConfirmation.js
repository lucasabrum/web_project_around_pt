import Popup from "./Popup.js";

// pop-up de confirmação de exclusão.
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._submitButton = this._popup.querySelector("button[type='submit']");
  }
    setLoading(isLoading) {
  this._submitButton.textContent = isLoading
    ? "Excluindo..."
    : "Sim";
}
  setSubmitAction(action) {
    this._handleConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector("form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    });
  }}