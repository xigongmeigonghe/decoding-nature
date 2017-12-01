
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {
  constructor() {
    this.mass = 1;
    this.position = createVector(30, 30);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }


  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    ellipse(this.position.x,this.position.y,10,10);
  }


}
