function Player() {
  this.x = 12;
  this.y = 16*22;
  this.velocity = 4;
  this.w = 18;
  this.h = 80;
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