var XiuaiGame = new XiuaiGame();

function preload() {
  XiuaiGame.preload();
}

function setup() {
  XiuaiGame.setup();
  
}

function draw() {
  XiuaiGame.run();
  // stroke(255,0,0);
  // text('HAHAHAHA Wrong!',100,100);
}

function keyPressed(){
	XiuaiGame.keyPressed(keyCode);
}


