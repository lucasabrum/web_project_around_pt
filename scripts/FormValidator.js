export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Mostra a mensagem de erro padrao do navegador abaixo do campo.
  _showInputError(input) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
  }

  // Esconde a mensagem de erro e remove o estilo de erro do campo.
  _hideInputError(input) {
    const error = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.textContent = "";
    error.classList.remove(this._config.errorClass);
  }

  // Verifica se um campo esta valido e mostra ou esconde o erro.
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  // Indica se existe algum campo invalido no formulario.
  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  // Ativa ou desativa o botao de envio de acordo com a validade dos campos.
  _toggleButtonState() {
    const hasInvalidInput = this._hasInvalidInput();
    this._buttonElement.disabled = hasInvalidInput;
    this._buttonElement.classList.toggle(
      this._config.inactiveButtonClass,
      hasInvalidInput
    );
  }

  // Adiciona os eventos de validacao a cada input do formulario.
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Limpa os erros antigos e atualiza o estado do botao (util ao abrir o pop-up).
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  // Habilita a validacao do formulario.
  setEventListeners() {
    this._setEventListeners();
  }
}