/*
 * This class represents demonstrates the API that the Main World depends on.
 */

var FinalGame = function() {

  this.isGameOver = false;
  this.isCorrect = false;
  this.keysEntered = [];

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
    this.display();
  }

  /*
   * This method is also called once for every frame. Do any rendering here.
   */
  this.display = function() {
    if (this.isCorrect) {
      fill(50,205,50);
    } else {
      fill(51);
    }

    rect(0, 0, width, height);

    textSize(100);
    fill(255);
    text("Enter Passcode:", 200, 300);

    stroke(255)
    line(200, 500, 800, 500);
  }

  this.keyPressed = function(key) {
    this.keysEntered.push(key.toUpperCase());
    console.log(this.keysEntered);
  }
}
