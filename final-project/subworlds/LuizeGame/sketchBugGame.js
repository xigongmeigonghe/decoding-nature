
  var mover;
  var letter
  var angle = 0;
  var aVelocity = 0.;
  var coins = [];
  var numberOfCoins = 1 ;

  var gameLose = false;
  var reachedScore = false;
  var c;
  var index = 0;

  var xoff = 0.0;

  var score = 0;
  var scoreElem;

var sketchBugGame = function() {
  this.isGameOver = false;

  this.setup = function() {

    scoreElem = createDiv('Score = 0');
    scoreElem.position(20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'black');

    createCanvas(window.innerWidth, window.innerHeight);
    mover = new Mover(); 
    

  }

  this.run = function() {

    //background(14,18,100);
    background(255);
    if (gameLose == false) {
     
    if (keyIsDown(13)) {
      var up = createVector(0, -0.95);
      mover.velocity.add(up);
    }
    else {
      var gravity = createVector(0, 0.9);
      mover.velocity.add(gravity);
    }
    //print("FRAME")
    //print(floor(frameCount/100))
    for (var i = index; i < floor(frameCount/100); i++) {
    	index += 1;
    	coins[i] = new Coin();
    }
    
    for (var q = 0; q < coins.length; q++) {
      if (coins[q].colorValue == 1) {
       c = 255;
     }

     else {
       c = 0;
     }
     coins[q].locationCoin.x = coins[q].locationCoin.x - 2;
     var r = random(3);
     xoff = xoff + .000001;
     var n = noise(xoff)*10;
     if (r >=2 && r < 3) {
      coins[q].locationCoin.y = coins[q].locationCoin.y + n;
     }
     else if (r >= 1 && r < 2) {
      coins[q].locationCoin.y = coins[q].locationCoin.y - n;
     }
     
     coins[q].run();
   }

    //print(coins.length)

    for (var j = 0; j < coins.length; j++) {

    	if (floor(coins[j].locationCoin.x) <= floor(mover.position.x + 18) && floor(coins[j].locationCoin.x) >= floor(mover.position.x - 18) && floor(coins[j].locationCoin.y) <= floor(mover.position.y + 30) && floor(coins[j].locationCoin.y) >= floor(mover.position.y - 30) && coins[j].hit == false) {
        coins[j].hit = true;
        if (coins[j].colorValue == 1) {
         score++
         if (score >= 8){
          scoreIsReached();
         }
         print(score);
         var prevScore = parseInt(scoreElem.html().substring(8));
         scoreElem.html('Score = ' + (prevScore + 1));
       }

       if (coins[j].colorValue == 0) {
        gameLose = true;
        gameLost();
      }
    } 
  }


  mover.update();
  mover.checkEdges();
  mover.display(); 



  if (mover.position.y + 30 >= height) {
   gameLose = true;
   gameLost();
  }
  }


   if (gameLose == true) {
   translate(random(-5,5),0);
   textSize(62);
   textAlign(CENTER);
   fill(255, 0, 0);
   text("LOSER",width/2,height/2);

    
  }

  letter = new Letter();

   if (reachedScore == true) {
    letter.run();
  }


  } //end of draw function

  function gameLost() {
   score = 0;
   scoreElem.html('Score = 0');


   mover = new Mover();
   gameLose = true;
   setTimeout(function(){ 
      gameLose=false;
      }, 3000);
  }

  function scoreIsReached() {
    reachedScore = true;
    // setTimeout(function(){ 
    //   reachedScore = true;
    // }, 3000);

  }




  class Coin {
   constructor() {
    this.colorValue = floor(random(2));
    this.locationCoin = createVector(window.innerWidth, random(height));
    this.hit = false;
  };

  run() {
    if (! this.hit ) {
    push();
    //xoff = xoff + 0.0001;
    //var n = noise(xoff) * width;
    fill(c);
    rect(this.locationCoin.x, this.locationCoin.y, 10, 10);
    pop();
  }
  }
  }


    class Letter {
      run() {
        fill(0);
        rect(200,200,20,20);
        this.isGameOver = true;
        // for (var i = 0; i < 20; i++) {
        //   coins.push(new Coin(width/2, 100+5*i))}
        
        // for (var i = 0; i < 6; i++) {
        //   coins.push(new Coin(width/2 +5*i, 200))

        }
      }


}