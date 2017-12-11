var yufeiGame = new Game();
var pacmanImg;
var ghostImg;
var foodImg;

function preload() {
  pacmanImg = loadImage("virus.png");
  ghostImg = loadImage("ghost.png");
  foodImg = loadImage("cell.png");
}

function setup() {
  yufeiGame.setup();
}

function draw() {
  yufeiGame.run();
}
