// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

var Particle = function(position, texture) {
  this.acceleration = createVector(0, 0.0);
  this.velocity = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
  this.position = position.copy();
  this.position.x = this.position.x + random(-width/10, width/10);
  this.position.y = this.position.y + random(-width/10, width/10);
  this.lifespan = 255.0;
  this.mass = 1; // Let's do something better here!
  this.texture = texture;

  this.run = function() {
    this.update();
    this.display();
  };

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  };

  // Method to update position
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 1.0;
  };

  // Method to display
  this.display = function() {

    imageMode(CENTER);

    if (this.lifespan >= 255/2) tint(255, 255-this.lifespan); //Fadin
    else tint(255, abs(0-this.lifespan)); //Fadout

    image(this.texture,this.position.x,this.position.y);
  };

   // Is the particle still useful?
  this.isDead = function() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  };
};
