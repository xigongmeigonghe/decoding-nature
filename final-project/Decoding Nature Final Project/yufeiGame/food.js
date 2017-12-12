function Food(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius = 16;

    this.show = function(){
      imageMode(CENTER);
      image(yufeiGame.foodImg, this.x, this.y, 18, 18);
    }
}