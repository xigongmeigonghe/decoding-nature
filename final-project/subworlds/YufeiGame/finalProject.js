// Variables for Pong
var player;
var computer;
var lastPosition;
var move = false;

// Variables for Pacman
var brick;
var bricks = [];
var platform;
var foods = [];
var foodImg;
var pacmans = [];
var pacman;
var pacmanImg;
var points;
var chances = 3;
var ghost;
var ghostImg;
var ghosts = [];
var activeGhosts = [];

function preload() {
  pacmanImg = loadImage("virus.png");
  ghostImg = loadImage("ghost.png");
  foodImg = loadImage("cell.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  platform = new Platform(21, 25);
  
  pacman = new Pacman(32,16*22, pacmanImg);
  for (var i = 0; i < platform.getRows(); i++) {
    for (var j = 0; j < platform.getColumns(); j++) {
      if(platform.getElement(i, j) === '*') {
        bricks.push(new Brick(j*32 + 32*8, i*32));
      }
      else if(platform.getElement(i, j) === '-') {
        foods.push(new Food(j*32 + 32*8, i*32, foodImg));
      }
      else if(platform.getElement(i, j) === 'p') {
        
        //pacmans.push(pacman);
      }
      else if(platform.getElement(i, j) === 'g') {
        ghosts.push(new Ghost(j*32 + 32*8, i*32, ghostImg));
      }
    }
    activateGhosts();
  }
  player = new Player();
  computer = new Computer();
  frameRate(10);
  
}

function draw() {
  background(255);
  textSize(32);
  fill(0);
  text("Cells killed: " + player.points, width - 220, 40);
  text("Kill 60 cells", 20, 40);
  //text("Life: " + chances, width - 115, 80);
  // Pong
  player.show();

  computer.show();
  computer.move();
  
  
  // Check collision between pacman and bricks
  for(i = 0; i < bricks.length; i++){
      pacman.direction = pacman.brickcollision(bricks[i]);//(pacman.direction + 3) % 4;
  }
  pacman.move(pacman.direction);
  // Check collision between pacman and food
  for (i = 0; i < foods.length; i++) {
      if (pacman.collision(foods[i])) {
        foods.splice(i, 1);
        if (pacman.direction !== 2) {
          player.points += 1;
        }
      }
  }
  
  if (pacman.isHeld === 0) {
    if (pacman.collision(player)) {
      pacman.Velocity = 0;
      pacman.isHeld = 1;
    }
  } else {
    pacman.x = 32;
    pacman.y = player.y;
  }
  
  if (pacman.collision(computer)) {
    pacman.Velocity = 5;
    pacman.direction = 2;
  }
  
  // Pacman
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].show();
  }
  for(var i = 0; i < foods.length; i++) {
    foods[i].show();
  }
  for(var i = 0; i < ghosts.length; i++) {
    ghosts[i].show();
  }
  pacman.show();
  
  for (var i = 0; i < activeGhosts.length; i++) {
    activeGhosts[i].move(bricks);
    activeGhosts[i].show();
    if (activeGhosts[i].collision(pacman)) {
      chances --;
    }
  }
  //checkWin();
  showWinner();
}

  function activateGhosts(){
    if(ghosts.length > 0){
      activeGhosts.push(ghosts[ghosts.length - 1])
      ghosts.splice(ghosts.length - 1, 1)
      activeGhosts[activeGhosts.length - 1].outOfBox(platform);
    }
    setTimeout(activateGhosts,7000);
  }

function showWinner() {
  if (chances === 0) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
  }
  if (player.points > 60) {
    text("YOU WIN!", 20, 80);
    fill(255, 0, 0);
    rect(32*16, 96, 160, 96);
    rect(32*24, 96, 160, 96);
    rect(32*13, 32*7, 96, 96);
    rect(32*27, 32*7, 96, 96);
    rect(32*13, 32*13, 96, 96);
    rect(32*27, 32*13, 96, 96);
    rect(32*16, 32*17, 160, 96);
    rect(32*24, 32*17, 160, 96);
  } 
  if (pacman.x < 0) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
  }
  if (pacman.y < 0 && pacman.x < width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
  }
  if (pacman.y > height && pacman.x < width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU LOSE", width/2 - 150, height/2);
  }
  if (pacman.x > width) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN!", width/2 - 150, height/2);
  }
  if (pacman.y < 0 && pacman.x > width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN!", width/2 - 150, height/2);
  }
  if (pacman.y > height && pacman.x > width/2) {
    background(255);
    textSize(80);
    fill(0);
    text("YOU WIN!", width/2 - 150, height/2);
  }
  
}

function keyPressed(){
  if (keyCode === ENTER) {
    if (pacman.isHeld == 1) {
      pacman.direction = 0;
      pacman.move(pacman.direction);
      pacman.isHeld = 0;
    }
  }
  if (keyCode === UP_ARROW) {
    player.y -= 32;
  }
  if (keyCode === DOWN_ARROW) {
    player.y += 32;  
  }
}