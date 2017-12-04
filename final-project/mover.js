
class Mover {
  constructor(_run1, _run2, _run3, _displayImage, _worldHeight) {
    this.run1 = loadImage(_run1);
    this.run2 = loadImage(_run2);
    this.run3 = loadImage(_run3);

    this.displayImage = loadImage(_displayImage);
    this.running = [this.run1,this.run2,this.run3,this.run2,this.run3,this.run2];
    this.position = createVector(30, _worldHeight);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.x = 0;
    this.imageHeight = 60;
    this.imageWidth = 60;

    console.log(_worldHeight);
  }

  // Display idle character
  display() {
    this._render(this.displayImage);
  }

  // When moving change the character's sprite to show moving animation
  move(movement) {
    this.position.add(movement);

    this._render(this.running[this.x]);

    this.x++;
    if(this.x>5){
      this.x = 0;
    }
  }

  _render(imageToDisplay) {
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    noStroke();
    imageMode(CENTER);
    image(imageToDisplay,
      this.position.x,
      this.position.y-this.imageHeight/2+15,
      this.imageHeight,
      this.imageWidth);
  }

}
