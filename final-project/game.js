class Game {
  constructor() {
    this.isFinished = false;
    this.framesLeft = 300;
  }

  run() {
    this.framesLeft--;
  }

  display() {
    fill(51);
    rect(0,0,width,height);

    textSize(100);
    fill(255);
    text("A GAME WITH\nHARD MATH!!!", 200, 300);

    textSize(30);
    fill(255);
    text("Frames left: "+this.framesLeft, 200, 500)

    // Game lasts for 300 frames
    if (this.framesLeft<=0) {
      this.isFinished = true;
    }

  }
}
