// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var ps;

function preload() {
  img = loadImage("smoke.png");
}

function setup() {
  image(img, 0, 0);
  filter(THRESHOLD)
  filter(BLUR,3);
  createCanvas(window.innerWidth-10,window.innerHeight-10);
  ps1 = new ParticleSystem(createVector(width/2, height/2), img);
  ps2 = new ParticleSystem(createVector(width/2, height/2), img);
  ps3 = new ParticleSystem(createVector(width/2, height/2), img);
}

function draw() {
  background(15);

  if (frameCount % 20 == 0) {
    ps1.addParticle();
    ps2.addParticle();
    ps3.addParticle();
  }
  ps1.run();
  ps2.run();
  ps3.run();
}
