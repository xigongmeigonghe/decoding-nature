// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

var queen;
var workerFlock;
var soldierFlock;
var boids = [];

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  queen = new Flock();
  workerFlock = new Flock();
  soldierFlock = new Flock();

  // Add just one queen to the system
  var q = new Boid(width/2, height/2, 0);
  queen.addBoid(q);
}

function draw() {
  console.log("Soldiers: ", soldierFlock.boids.length);
  console.log("Workers: ", workerFlock.boids.length);
  console.log("");
  background(25);

  if (frameCount % 50 == 0 &&
      soldierFlock.boids.length + workerFlock.boids.length < 70) { // Every 20 frames, produce ant of random type
    if (Math.random() < 0.8) { // Disproportionately generating workers
      // Add worker
      var w = new Boid(width/2, height/2, 2);
      workerFlock.addBoid(w);
      boids.push(w);
    } else {
      // Add soldier
      var s = new Boid(width/2, height/2, 1);
      soldierFlock.addBoid(s);
      boids.push(s);
    }
  }

  checkForCollision();

  queen.run(queen.boids);
  workerFlock.run(workerFlock.boids);
  soldierFlock.run(soldierFlock.boids);
}

function checkForCollision() {
  // Collisions between workers
  for (var i = 0; i < workerFlock.boids.length; i++) {
    for (var j = 0; j < workerFlock.boids.length; j++) {
      var dist = p5.Vector.dist(workerFlock.boids[i].position, workerFlock.boids[j].position);
      if (dist < 10 && dist > 0) {
        workerFlock.boids[i].antMet(2);
        workerFlock.boids[j].antMet(2);
      }
    }
  }

  // Collisions between soldiers
  for (var i = 0; i < soldierFlock.boids.length; i++) {
    for (var j = 0; j < soldierFlock.boids.length; j++) {
      var dist = p5.Vector.dist(soldierFlock.boids[i].position, soldierFlock.boids[j].position);
      if (dist < 10 && dist > 0) {
        soldierFlock.boids[i].antMet(1);
        soldierFlock.boids[j].antMet(1);
      }
    }
  }

  // Collisions between workers and soldiers
  for (var i = 0; i < soldierFlock.boids.length; i++) {
    for (var j = 0; j < workerFlock.boids.length; j++) {
      var dist = p5.Vector.dist(soldierFlock.boids[i].position, workerFlock.boids[j].position);
      if (dist < 10 && dist > 0) {
        soldierFlock.boids[i].antMet(2);
        workerFlock.boids[j].antMet(1);
      }
    }
  }

  // Remove from worker and add to soldier if needed
  for (var i = 0; i < workerFlock.boids.length; i++) {
    if (workerFlock.boids[i].checkForChange()) {
      var x = workerFlock.boids[i].position.x;
      var y = workerFlock.boids[i].position.y;

      var newBoid = new Boid(x, y, 1);
      soldierFlock.addBoid(newBoid);
      workerFlock.removeBoid(i);
    }
  }

  // Remove from soldier and add to worker if needed
  for (var i = 0; i < soldierFlock.boids.length; i++) {
    if (soldierFlock.boids[i].checkForChange()) {
      var x = soldierFlock.boids[i].position.x;
      var y = soldierFlock.boids[i].position.y;

      var newBoid = new Boid(x, y, 2);
      workerFlock.addBoid(newBoid);
      soldierFlock.removeBoid(i);
    }
  }
}
