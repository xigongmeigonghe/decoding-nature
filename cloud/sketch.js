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
  ps = new ParticleSystem(createVector(width/2, height/2), img);
}

function draw() {
  background(15);

  if (frameCount % 10 == 0) ps.addParticle();
  ps.run();
}
