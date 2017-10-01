// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var ParticleSystem = function(position, img) {
	this.origin = position.copy();
  this.noff = createVector(random(100), random(100));
	this.particles = [];
  this.particleTexture = img;

  this.addParticle = function() {
  	this.particles.push(new Particle(this.origin, this.particleTexture));
  };

  this.run = function(){
    /* Move cloud */
    this.origin.x = map(noise(this.noff.x),0,1,0,width);
    this.origin.y = map(noise(this.noff.y),0,1,0,height);
    this.noff.add(0.002,0.002,0);

    // stroke(150);
    // strokeWeight(2);
    // fill(150);
    // ellipse(this.origin.x, this.origin.y, 8, 8);

  	for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  // A function to apply a force to all Particles
  this.applyForce = function(f){
    for(var i = 0; i < this.particles.length; i++){
      this.particles[i].applyForce(f);
    }
  };
};
