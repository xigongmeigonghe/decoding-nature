var angle = 0;
var angularAcceleration;
var angularVelocity = 0.1;
var radius = 100;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
}

function draw() {
  // background(220);
  angle+=angularVelocity;
  radius += 0.01;

  var x = cos(angle)*(radius);
  var y = sin(angle)*(radius);

  push();
  translate(width/2, height/2);
  rect(x,y,50,50);
  pop();
}
