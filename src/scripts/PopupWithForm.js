import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._submitButton = this._form.querySelector("button[type='submit']");
    this._defaultButtonText = this._submitButton.textContent;
  }

  // Altera o texto do botão de submit para "Salvando..." enquanto a requisição
  // está em andamento, e volta ao texto original quando ela termina.
  setLoading(isLoading, loadingText = "Salvando...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._defaultButtonText;
  }

  // Coleta os valores de todos os campos do formulario em um objeto.
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Adiciona o handler de submit do formulario, alem dos listeners herdados de Popup.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Fecha o pop-up e reseta o formulario.
  close() {
    super.close();
    this._form.reset();
  }
}