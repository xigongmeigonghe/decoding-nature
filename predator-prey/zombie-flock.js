// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array

  this.run = function(preyFlock, predatorFlock) {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].run(preyFlock, predatorFlock);  // Passing the entire list of boids to each boid individually
    }
  };

  this.addBoid = function(b) {
    this.boids.push(b);
  };

  this.removeBoid = function(index) {
    this.boids.splice(index, 1);
  };
}
