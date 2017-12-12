/************************************ GAME.JS **********************************
 *
 * This class demonstrates the standard API that the Main World depends upon.
 * setup() - set up the sketch, including the canvas
 * run() - do any application logic
 *
 *
 ********************************* INSTRUCTIONS ********************************
 *
 * To set up this class for your game follow the steps below:
 * 1) Change the class name to YournameGame (e.g. ZaneGame)
 * 2) Change the file name to match (e.g. ZaneGame.js)
 * 3) Put any set up code you need in the setup() method
 * 4) Put any code that should be called on every frame in the run() method
 * 5) Test in Firefox using the provided "index.html" file.
 * 6) Zip full "Game" folder and put the zip file in the following Google Drive
 *    folder: https://drive.google.com/drive/folders/1Ks5JdCDBZVofBWiKR4Qd2XQbeKFo05ig?usp=sharing.
 *    On MacOS you can zip a folder by right clicking on the folder and selecting
 *    "Compress <FolderName>".
 *
 ******************************************************************************/

var Game = function() {

  /* Change this.isGameOver to true when the game is complete */
  this.isGameOver= false;

  /*
   * This method is called once when the game is initialized. Set up the canvas here.
   * Remember that the canvas that the game is rendered on is NOT a laptop screen.
   * The projected canvas will be much bigger so don't rely on you laptop's
   * screen dimensions.
   */
  this.setup = function() {
    // Leave the canvas as this size unless absolutely necessary
    createCanvas(window.innerWidth, window.innerHeight);

    // Put your setup code here
  }

  /*
   * This method is called once for every frame. Do any logic required for the
   * game in this function.
   *
   * IMPORTANT: You MUST set "this.isGameOver" to true when the game is over.
   */
  this.run = function() {
    // Put your logic and display code here
    // Remember to set "this.isGameOver = true;" when the game is over
  }

}
