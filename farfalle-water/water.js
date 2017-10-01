// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

var cols, rows;
var scl = 20;
var w = window.innerWidth+10;
var h = window.innerHeight+10;
var amp = 0;
var centerX = 0;
var centerY = 0;

var flying = 0;

var terrain = [];
var speed = .1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);//, WEBGL
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {

  background(0);
  rotateX(0);
  translate(-w/2, -h/2);

  amp = 20;
  centerX = map(mouseX, 0, window.innerWidth/2, 0, scl);
  centerY = map(mouseY, 0, window.innerHeight/2, 0, scl);

  flying -= speed;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      r = abs(dist(centerX, centerY, x, y)); // Distance from origin to this vertex
      terrain[x][y] = map(sin(r+yoff), -1, 1, -amp, amp);
    }
    yoff += 0.001;
  }

  if (amp>=0.05) amp*=0.99;
  else amp = 0;

  for (var y = 0; y < rows; y++) {
    beginShape(LINES);
    fill(75,150,255,200);
    stroke(255);
    for (var x = 0; x < cols; x++) {
      //rows
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
      if(x>0) {//since x-1
        //columns
        vertex(x*scl, y*scl, terrain[x][y]);
        vertex((x-1)*scl, y*scl, terrain[x-1][y]);
      }
    }
    endShape();
  }
}
