var kateGame = new KateGame();
function preload(){
	kateGame.preload();
}

function setup() {
  kateGame.setup();
}

function draw() {
  kateGame.run();
}

function keyPressed(){
	kateGame.keyPressed(keyCode);
}

function keyReleased(){
	kateGame.keyReleased();
}
