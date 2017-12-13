function Brick(x,y){
  this.x = x;
  this.y = y;

  this.radius = YufeiWorld.game.brickSize/2;
  this.centerX=x+this.radius;
  this.centerY=y+this.radius;
  this.show = function(){

    rect(this.x, this.y, YufeiWorld.game.brickSize, YufeiWorld.game.brickSize);
    noStroke();
    fill(50);

  }
}
