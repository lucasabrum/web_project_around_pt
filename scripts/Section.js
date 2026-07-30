export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza cada item da lista usando a funcao de callback renderer.
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Adiciona um elemento DOM ja pronto ao inicio do container.
  addItem(element) {
    this._container.prepend(element);
  }
}
