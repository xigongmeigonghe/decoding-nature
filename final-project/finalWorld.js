class FinalWorld {
  constructor(_positionX, _positionY, _width, _height, _message, _game, _displayImage, _letter, _isWinner) {
    this.position = createVector(_positionX, _positionY);
    this.width = _width;
    this.textBox = new Textbox(this.position, _message);
    this.textBox = new Textbox(this.position, _message);
    this.game = _game;
    this.displayImage = loadImage(_displayImage);
    this.imageHeight = _height;
    this.letter = _letter;
  }

  display() {
    if (_isWinner) {
      this.textBox = new Textbox(this.position, "Winner!");
    }
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
