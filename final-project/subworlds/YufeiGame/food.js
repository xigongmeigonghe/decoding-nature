function Food(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius = YufeiWorld.game.brickSize/2;

    this.show = function(){
      imageMode(CENTER);
      image(foodImg, this.x, this.y, YufeiWorld.game.brickSize*9/16, YufeiWorld.game.brickSize*9/16);
    }
}
