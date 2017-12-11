function Brick(x,y){
  this.x = x;
  this.y = y;
  
  this.radius = 16;
  this.centerX=x+this.radius;
  this.centerY=y+this.radius;
  this.show = function(){

    rect(this.x, this.y, 32, 32);
    noStroke();
    fill(50);
    
  }
}