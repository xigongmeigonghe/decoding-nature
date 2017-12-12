
  // var bugmover;
  // var letter
  // var angle = 0;
  // var aVelocity = 0.;
  // var coins = [];
  // var numberOfCoins = 1 ;

  // var gameLose = false;
  // var reachedScore = false;
  // var c;
  // var index = 0;

  // var xoff = 0.0;

  // var score = 0;
  // var scoreElem;
// var luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose= false;
  var LuizeGame = function() {

  this.bugbugmover;
  // this.angle = 0;
  // this.aVelocity = 0.;
  this.coins = [];
  this.numberOfCoins = 1;
    this.reachedScore = false;
  this.c = 0;
  this.index = 0;
  this.xoff = 0.0;
  this.score = 0;
  this.scoreElem;


  this.isGameOver = false;

  this.setup = function() {

    this.scoreElem = createDiv('Score = 0');
    this.scoreElem.position(20, 20);
    this.scoreElem.id = 'score';
    this.scoreElem.style('color', 'black');

    createCanvas(window.innerWidth, window.innerHeight);
    this.bugmover = new BugMover();


  }

  this.run = function() {

    background(255);
    if (luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose == false) {

      if (keyIsDown(65)) {
        var up = createVector(0, -0.95);
        this.bugmover.velocity.add(up);
      }
      else {
        var gravity = createVector(0, 0.9);
        this.bugmover.velocity.add(gravity);
      }
      for (var i = this.index; i < floor(frameCount/100); i++) {
      	this.index += 1;
      	this.coins[i] = new Coin();
      }

      for (var q = 0; q < this.coins.length; q++) {
        if (this.coins[q].colorValue == 1) {
         this.c = 255;
         }

         else {
           this.c = 0;
         }
         this.coins[q].locationCoin.x = this.coins[q].locationCoin.x - 2;
         var r = random(3);
         this.xoff = this.xoff + .000001;
         var n = noise(this.xoff)*10;
         if (r >=2 && r < 3) {
          this.coins[q].locationCoin.y = this.coins[q].locationCoin.y + n;
         }
         else if (r >= 1 && r < 2) {
          this.coins[q].locationCoin.y = this.coins[q].locationCoin.y - n;
         }

         this.coins[q].run(this.c);
       }

      //print(coins.length)

      for (var j = 0; j < this.coins.length; j++) {

      	if (floor(this.coins[j].locationCoin.x) <= floor(this.bugmover.position.x + 18) && floor(this.coins[j].locationCoin.x) >= floor(this.bugmover.position.x - 18) && floor(this.coins[j].locationCoin.y) <= floor(this.bugmover.position.y + 30) && floor(this.coins[j].locationCoin.y) >= floor(this.bugmover.position.y - 30) && this.coins[j].hit == false) {
          this.coins[j].hit = true;
          if (this.coins[j].colorValue == 1) {
           this.score++
           if (this.score >= 8){
            this.scoreIsReached();
           }
           //print(score);
           var prevScore = parseInt(this.scoreElem.html().substring(8));
           this.scoreElem.html('Score = ' + (prevScore + 1));
         }

         if (this.coins[j].colorValue == 0) {
          luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose = true;
          this.gameLost();

        }
      }
    }


    this.bugmover.update();
    this.bugmover.checkEdges();
    this.bugmover.display();



    if (this.bugmover.position.y + 30 >= height) {
     luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose = true;
     this.gameLost();

    }
  }


   if (luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose == true) {
     translate(random(-5,5),0);
     textSize(62);
     textAlign(CENTER);
     fill(255, 0, 0);
     text("YOU LOST!",width/2,height/2);


    }



   if (this.reachedScore == true) {
    this.letter.run();
  }


  } //end of draw function




  this.gameLost=function() {
   this.score = 0;
   this.scoreElem.html('Score = 0');
   this.bugmover = new BugMover();

   luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose = true;

   setTimeout(function(){
      luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose=false;
      }, 1500);
  }

  this.scoreIsReached=function() {
    this.reachedScore = true;
    // setTimeout(function(){
    //   reachedScore = true;
    // }, 3000);

  }


// this.hit = false;
// this.colorValue = 1;



  // class coin() = function(){
  //   colorValue = floor(random(2));
  //     this.locationCoin = createVector(window.innerWidth, random(height));


  //     if (! this.hit ) {
  //       push();
  //       fill(this.c);
  //       rect(this.locationCoin.x, this.locationCoin.y, 10, 10);
  //       pop();
  //     }
  // }

   class Coin {
       constructor() {
        this.colorValue = floor(random(2));
        this.locationCoin = createVector(window.innerWidth, random(height));
        this.hit = false;
      };

      run(c) {
        if (! this.hit ) {
        push();
        fill(c);
        rect(this.locationCoin.x, this.locationCoin.y, 10, 10);
        pop();
      }
      }
    }


    this.letter = function() {

        fill(0);
        rect(200,200,20,20);
        this.isGameOver = true;
        // for (var i = 0; i < 20; i++) {
        //   coins.push(new Coin(width/2, 100+5*i))}

        // for (var i = 0; i < 6; i++) {
        //   coins.push(new Coin(width/2 +5*i, 200))

    }


}
