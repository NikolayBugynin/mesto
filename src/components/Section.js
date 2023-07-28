export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemAppend(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }


  renderItems(dataCard) {
    dataCard.map((element) => {
      this._renderer(element);
    });
  }
}
