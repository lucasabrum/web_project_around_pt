export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // Guarda uma unica referencia ligada a instancia para poder remover o listener depois.
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Abre o pop-up e ativa o fechamento pela tecla Esc.
  open() {
    this._popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Fecha o pop-up e remove o listener da tecla Esc.
  close() {
    this._popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Fecha o pop-up aberto quando o usuario pressiona Esc.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Adiciona os listeners de fechamento: clique no icone de fechar e clique na area sombreada.
  setEventListeners() {
    const closeButton = this._popup.querySelector('[class$="__button"]');
    closeButton.addEventListener("click", () => this.close());

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}