class World {
  constructor(_positionX, _positionY, _width, _height, _message, _game, _displayImage,_threeBool) {
    this.position = createVector(_positionX, _positionY);
    this.width = _width;
    this.textBox = new Textbox(this.position, _message);
    this.game = _game;
    this.displayImage = loadImage(_displayImage);
    this.imageHeight = _height;
    this.three = _threeBool;
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
