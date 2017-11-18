// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

var preyFlock;
var predatorFlock;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  preyFlock = new Flock();
  predatorFlock = new Flock();

  // Add predators to the system
  for (var i = 0; i < 3; i++) {
    var b = new Boid(random(0, width), random(0,height), true);
    predatorFlock.addBoid(b);
  }

  // Add prey to the system
  for (var i = 0; i < 60; i++) {
    var b = new Boid(width/2,height/2, false);
    preyFlock.addBoid(b);
  }
}

function draw() {
  background(51);
  checkForCollision();
  preyFlock.run(preyFlock.boids, predatorFlock.boids);
  predatorFlock.run(preyFlock.boids, predatorFlock.boids);
}

function checkForCollision() {
  for (var i = 0; i < predatorFlock.boids.length; i++) {
    for (var j = 0; j < preyFlock.boids.length; j++) {
      var dist = p5.Vector.dist(predatorFlock.boids[i].position, preyFlock.boids[j].position);
      if (dist < 7) { // It has been attacked, becomes a zombie
        var x = predatorFlock.boids[i].position.x;
        var y = predatorFlock.boids[i].position.y;
        predatorFlock.addBoid(new Boid(x, y, true));
        preyFlock.removeBoid(j)
      }
    }
  }
}
