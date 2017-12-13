function Computer(pacman) {
  this.x = width;
  this.y = height/2;
  this.velocity = 10;
  this.w = YufeiWorld.game.brickSize*5/8;
  this.h = YufeiWorld.game.brickSize*2.5;
  this.points = 0;
  this.pacman = pacman;


  this.show = function() {
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  this.move = function() {
    if (this.pacman.x >= width/2) {
      if (this.pacman.y < this.y) {
        this.y -= 0.3 * abs(this.y - this.pacman.y);
      }
      else if (this.pacman.y > this.y) {
        this.y += 0.3 * abs(this.y - this.pacman.y);
      }
    }
  }


}
