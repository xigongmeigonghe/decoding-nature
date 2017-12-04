class World {
  constructor(_positionX, _positionY, _width, _message, _game, _displayImage) {
    this.position = createVector(_positionX, _positionY);
    this.width = _width;
    this.textBox = new Textbox(this.position, _message);
    this.game = _game;
    this.displayImage = loadImage(_displayImage);
    this.imageHeight = 200;
  }

  display() {
    imageMode(CORNER);
    image(this.displayImage,
      this.position.x,
      this.position.y-this.imageHeight,
      this.width,
      this.imageHeight);
  }

  run() {
    this.game.run();
  }
}
