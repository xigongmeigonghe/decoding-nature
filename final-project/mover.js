
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {
  constructor() {
    this.running = [run1,run2,run3,run2,run3,run2];
    this.position = createVector(30, 300);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.x = 0;
  }

  //Feed display image to show character running
  display(dis_img) {
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0);
    noStroke();
    imageMode(CENTER);
    //Kirby:
    // idle : 0,0,73,20
    // running
    image(dis_img, this.position.x,this.position.y-20,60,60);
    //ellipse(this.position.x,this.position.y,10,10);
  }

  //When moving change the character's sprite to show moving animation
  move(movement) {
    this.position.add(movement);
    this.display(this.running[this.x]);
    this.x++;
    if(this.x>5){
      this.x = 0;
    }
  }

}
