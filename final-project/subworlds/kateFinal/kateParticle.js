// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

var KateParticle = function(position) {
  this.target=createVector(width/2,height/2);
  this.mass= 1;
  this.acceleration = createVector();
  this.velocity = createVector(0,0);
  this.position = position.copy();
  this.direction= p5.Vector.fromAngle(0)
  this.startPosition = position.copy();
  this.topSpeed=5;

  this.triggered=false;

  this.force = p5.Vector.sub(this.target, this.startPosition);
  this.force.mult(.0001);
  this.isShot=false;

  this.run = function() {
    if(!this.isDead() && !this.isShot){
      this.update();

      this.display(); 

      this.isDead();
    }
    // this.applyForce();
  };

  this.applyForce = function(force) {
      var f = p5.Vector.div(force,this.mass);
      this.acceleration.add(f);
    };

  // Method to update position
  this.update = function(){
    this.applyForce(this.force);
  	
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed)
    this.position.add(this.velocity);
    this.acceleration.mult(0)

  };
  this.reset=function(){

  }

  // Method to display
  this.display = function() {
    fill(127, this.lifespan);
    image(alien,this.position.x, this.position.y, 60, 60);
    
  };

    // Is the particle still useful?


  this.isDead = function(){

  	var distance = p5.Vector.sub(this.target, this.position);
  	var length = distance.mag();
    if (length < katesPlanetSize/2 ) {
      return true;
    } else {
      return false;
    }
  }
 
}  
