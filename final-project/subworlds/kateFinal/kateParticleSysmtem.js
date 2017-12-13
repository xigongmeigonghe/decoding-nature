// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
var kateRand = 0;


var KateParticleSystem = function(position) {
	this.origin = position.copy();
	this.particles = [];

	this.start = 0;
	this.changeStart=0;
  // this.triggered=false;
  this.noEnemies = true;


  this.addParticle = function(pos) {
    this.particles.push(new KateParticle(pos, createVector(random)));

  
  
  }



  this.run = function(alien) {
    var p = this.particles[floor(kateRand)];
    // console.log(rand)
    p.run(alien);
    if(p.isDead()||p.isShot){
      kateRand = random(30);
  }
 
  }
  
}