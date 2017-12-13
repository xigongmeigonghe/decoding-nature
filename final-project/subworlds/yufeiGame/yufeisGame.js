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


var YufeisGame = function() {
  // Variables for Pong
  this.three = false;
  this.player;
  this.computer;
  this.move = false;

  // Variables for Pacman
  this.brickSize;
  this.brick;
  this.bricks = [];
  this.platformMaze;
  this.foods = [];
  // var foodImg;
  this.pacman;
  // var pacmanImg;
  this.points;
  this.ghost1;
  this.ghost2;
  // var ghostImg;
  //this.ghosts = [];
  //this.activeGhosts = [];
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
    // var canvas = createCanvas(1280,701);
    var p5_canvas = document.getElementById("defaultCanvas0");
    p5_canvas.parentNode.removeChild(p5_canvas);
    createCanvas(window.innerWidth,window.innerHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
    // canvas.parent('yufei-center');

    print("width" + width, height);
    this.brickSize = width / 40;


    // Put your setup code here
    this.platformMaze = new Platform(21, 25);

    this.pacman = new Pacman(this.brickSize, this.brickSize * 11, pacmanImg);

    for (var i = 0; i < this.platformMaze.getRows(); i++) {
      for (var j = 0; j < this.platformMaze.getColumns(); j++) {
        if(this.platformMaze.getElement(i, j) === '*') {
          this.bricks.push(new Brick(j*this.brickSize + this.brickSize*8, i*this.brickSize));
        }
        else if(this.platformMaze.getElement(i, j) === '-') {
          this.foods.push(new Food(j*this.brickSize + this.brickSize*8, i*this.brickSize, foodImg));
        }
        else if(this.platformMaze.getElement(i, j) === 'g') {
          this.ghost1 = new Ghost(j*this.brickSize + this.brickSize*8, i*this.brickSize, ghostImg);
        }
        else if(this.platformMaze.getElement(i, j) === 'h') {
          this.ghost2 = new Ghost(j*this.brickSize + this.brickSize*8, i*this.brickSize, ghostImg);
        }
      }
      // this.activateGhosts();
    }
    this.player = new Player();
    this.computer = new Computer(this.pacman);
    frameRate(10);
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
    background(255);
    textSize(32);
    fill(0);
    text("Cells killed: " + this.player.points, width - 220, 40);
    text("Kill 60 cells", 20, 40);
    textSize(20);
    text("PRESS A TO LAUNCH", 20, 80);
    //text("Life: " + chances, width - 115, 80);
    // Pong

    this.player.show();
    //
    this.computer.show();
    this.computer.move();

    // Check collision between ghost and bricks
    for(i = 0; i < this.bricks.length; i++){
        this.ghost1.direction = this.ghost1.brickCollision(this.bricks[i]);//(pacman.direction + 3) % 4;
    }
    this.ghost1.move(this.ghost1.direction);

    for(i = 0; i < this.bricks.length; i++){
        this.ghost2.direction = this.ghost2.brickCollision(this.bricks[i]);//(pacman.direction + 3) % 4;
    }
    this.ghost2.move(this.ghost2.direction);


    // Check collision between pacman and bricks
    for(i = 0; i < this.bricks.length; i++){
        this.pacman.direction = this.pacman.brickcollision(this.bricks[i]);//(pacman.direction + 3) % 4;
    }
    this.pacman.move(this.pacman.direction);
    // Check collision between pacman and food
    for (i = 0; i < this.foods.length; i++) {
        if (this.pacman.collision(this.foods[i])) {
          this.foods.splice(i, 1);
          if (this.pacman.direction !== 2) {
            this.player.points += 1;
          }
        }
    }

    if (this.pacman.isHeld === 0) {
      if (this.pacman.collision(this.player)) {
        this.pacman.Velocity = 0;
        this.pacman.isHeld = 1;
      }
    } else {
      this.pacman.x = this.brickSize;
      this.pacman.y = this.player.y;
    }

    if (this.pacman.collision(this.computer)) {
      this.pacman.Velocity = 5;
      this.pacman.direction = 2;
    }

    // Pacman
    for (var i = 0; i < this.bricks.length; i++) {
      this.bricks[i].show();
    }
    for(var i = 0; i < this.foods.length; i++) {
      this.foods[i].show();
    }
    this.ghost1.show();
    this.ghost2.show();
    this.pacman.show();

    // for (j = 0; j < this.bricks.length; j++){
    //   for(i = 0; i < this.activeGhosts.length; i++){
    //     this.activeGhosts[i].direction = this.activeGhosts[i].brickCollision(this.bricks[j]);//(pacman.direction + 3) % 4;
    //     this.activeGhosts[i].move(this.activeGhosts[i].direction);
    //     this.activeGhosts[i].show();
    //     if (this.activeGhosts[i].collision(this.pacman)) {
    //       this.chances --;
    //     }
    //   }

    // }




    // for (var i = 0; i < this.activeGhosts.length; i++) {
    //   this.activeGhosts[i].move(this.bricks);
    //   this.activeGhosts[i].show();
    //   if (this.activeGhosts[i].collision(this.pacman)) {
    //     this.chances --;
    //   }
    // }
    //checkWin();
    this.showWinner();
  }

 // this.activateGhosts = function(){
 //    if (this.ghosts.length > 0) {
 //      this.activeGhosts.push(this.ghosts[this.ghosts.length - 1])
 //      this.ghosts.splice(this.ghosts.length - 1, 1)
 //      // this.activeGhosts[this.activeGhosts.length - 1].outOfBox(this.platformMaze);
 //    }
 //    setTimeout(this.activateGhosts,7000);
 //  }

this.showWinner = function() {
  if (this.chances === 0) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
    textSize(48);
    text("PRESS B TO RESTART", width/2 - 250, height/2 + 100);
  }

  if (this.player.points > 60) {
    text("YOU WIN!", 20, 80);
    fill(255, 0, 0);
    rect(this.brickSize*16, this.brickSize*3, this.brickSize*5, this.brickSize*3);
    rect(this.brickSize*20, this.brickSize*3, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*24, this.brickSize*3, this.brickSize*5, this.brickSize*3);
    rect(this.brickSize*13, this.brickSize*7, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*13, this.brickSize*10, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*27, this.brickSize*7, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*13, this.brickSize*13, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*27, this.brickSize*10, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*27, this.brickSize*13, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*16, this.brickSize*17, this.brickSize*5, this.brickSize*3);
    rect(this.brickSize*20, this.brickSize*17, this.brickSize*3, this.brickSize*3);
    rect(this.brickSize*24, this.brickSize*17, this.brickSize*5, this.brickSize*3);
    // rectMode(CORNER);
    // imageMode(CORNER);
    this.isGameOver = true;
  
  }

  if (this.pacman.x < 0) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
    textSize(48);
    text("PRESS B TO RESTART", width/2 - 250, height/2 + 100);
  }

  if (this.ghost1.collision(this.pacman) || this.ghost2.collision(this.pacman)) {
    background(255);
    imageMode(CENTER);
    image(boomImg,width/2,height/2);
  }

  // if (this.ghost2.collision(this.pacman)) {
  //   background(255);
  //   imageMode(CENTER);
  //   image(this.boomImg,width/2,height/2);
  // }

  if (this.pacman.y < 0 && this.pacman.x < width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
    textSize(48);
    text("PRESS B TO RESTART", width/2 - 250, height/2 + 100);
  }

  if (this.pacman.y > height && this.pacman.x < width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
    textSize(48);
    text("PRESS B TO RESTART", width/2 - 250, height/2 + 100);
  }

  if (this.pacman.x > width) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN!", width/2 - 150, height/2);
  }

  if (this.pacman.y < 0 && this.pacman.x > width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN!", width/2 - 150, height/2);
  }

  if (this.pacman.y > height && this.pacman.x > width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN!", width/2 - 150, height/2);
  }

};



this.keyPressed = function(keyCode){
  if (keyCode === 65) {
    if (this.pacman.isHeld == 1) {
      this.pacman.direction = 0;
      this.pacman.move(this.pacman.direction);
      this.pacman.isHeld = 0;
    }
  }
  if (keyCode === SHIFT) {
    this.setup();
    this.run();
    // window.location.reload();
  }
  if (keyCode === UP_ARROW) {
    this.player.y -= this.brickSize;
  }
  if (keyCode === DOWN_ARROW) {
    this.player.y += this.brickSize;
  }
}



}
