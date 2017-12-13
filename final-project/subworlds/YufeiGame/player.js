function Player() {
  this.x = 12;
  this.y = YufeiWorld.game.brickSize*11;
  this.velocity = 4;
  this.w = YufeiWorld.game.brickSize*9/16;
  this.h = YufeiWorld.game.brickSize*2.5;
  this.points = 0;

  this.show = function() {
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  //this.move = function(ball) {
  //  if (ball.x < width/2) {
  //    if (player.y < mouseY) {
  //      player.y += player.velocity;
  //    }
  //    else if (player.y > mouseY) {
  //      player.y -= player.velocity;
  //    }
  //  }
  //}


}
