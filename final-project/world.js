class World {
  constructor(_positionX, _positionY, _width, _height, _message, _game, _displayImage, _letter) {
    this.position = createVector(_positionX, _positionY);
    this.width = _width;
    this.textBox = new Textbox(this.position, _message);
    this.game = _game;
    this.displayImage = loadImage(_displayImage);
    this.imageHeight = _height;
    this.letter = _letter;
    this.isWinner = false; // Used for final world
  }

  display() {
    if (this.isWinner) {
      this.textBox.message = "Winner, winner! You've collected all\nthe clues!\nPassword collected: WELCOME";
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
