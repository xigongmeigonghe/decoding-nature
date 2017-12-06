/*
 * This class represents demonstrates the API that the Main World depends on.
 */

var Game = function() {

  this.isGameOver = false;
  this.framesLeft = 300;

  /*
   * This method is called once when the game is initialized. Set up the canvas here.
   * Remember that the canvas the game is rendered on is NOT a computer screen,
   * it will be much bigger.
   */
  this.setup = function() {
    createCanvas(window.innerWidth, window.innerHeight);
  }

  /*
   * This method is called once for every frame. Do any logic required for the game
   * in this function.
   */
  this.run = function() {
    this.framesLeft--;
  }

  /*
   * This method is also called once for every frame. Do any rendering here.
   */
  this.display = function() {
    fill(51);
    rect(0, 0, width, height);

    textSize(100);
    fill(255);
    text("TEST GAME", 200, 300);

    textSize(30);
    fill(255);
    text("Frames left: " + this.framesLeft, 200, 500)

    // Game lasts for 300 frames
    if (this.framesLeft<=0) {
      this.isGameOver = true;
    }

  }
}
