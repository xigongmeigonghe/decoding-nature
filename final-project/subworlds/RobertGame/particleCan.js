var Particle = function(position) {
  this.acceleration = createVector(0, 0.0);
  this.velocity = createVector(random(-1, 1), random(-2, 0));
  this.position = position.copy();
  this.lifespan = 100.0;
  this.mass = 1; // Let's do something better here!

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
    this.lifespan -= 2.0;
  };

  // Method to display
  this.display = function() {
    push()
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(155,0,0, this.lifespan);
    ellipse(this.position.x, this.position.y, 2, 2);
    pop();
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