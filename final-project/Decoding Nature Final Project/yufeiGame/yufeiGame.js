var yufeiGame = new YufeisGame();

function preload() {
  yufeiGame.preload();
}

function setup() {
  yufeiGame.setup();
}

function draw() {
  yufeiGame.run();
}

function keyPressed(){
  if (keyCode === ENTER) {
    if (yufeiGame.pacman.isHeld == 1) {
      yufeiGame.pacman.direction = 0;
      yufeiGame.pacman.move(yufeiGame.pacman.direction);
      yufeiGame.pacman.isHeld = 0;
    }
  }
  if (keyCode === SHIFT) {
    // yufeiGame.setup();
    // yufeiGame.run();
    window.location.reload();
  }
  if (keyCode === UP_ARROW) {
    yufeiGame.player.y -= 32;
  }
  if (keyCode === DOWN_ARROW) {
    yufeiGame.player.y += 32;  
  }
}
