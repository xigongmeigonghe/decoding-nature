
  var LuizeGame = function() {

  this.three = false;
  this.mover;
  this.coins = [];
  this.numberOfCoins = 1;
  this.reachedScore = false;
  this.c = 0;
  this.index = 0;
  this.xoff = 0.0;
  this.score = 0;
  this.scoreElem;
  this.isGameOver = false;
  this.letter;
  this.noKey=true;

  this.setup = function() {

    this.scoreElem = createDiv('Score = 0');
    this.scoreElem.position(20, 20);
    this.scoreElem.id = 'score';
    this.scoreElem.style('color', 'black');

    var p5_canvas = document.getElementById("defaultCanvas0");
    p5_canvas.parentNode.removeChild(p5_canvas);

    createCanvas(window.innerWidth, window.innerHeight);



    this.mover = new LuizeMover();


  }

  this.run = function() {

    background(255);

    push();
    textSize(16);
    textAlign(CENTER);
    text("/ 8",88,26.49);
    textSize(15);
    textAlign(CENTER);
    text("Press Button A to Fly Up",83,50);
    pop();

    if (luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose == false) {
      if(this.noKey&&!this.reachedScore)
        this.mover.position = createVector(width/5,height/2);

      if (keyIsDown(65)&&!this.reachedScore) {
        this.noKey=false;
        var up = createVector(0, -0.95);
        this.mover.velocity.add(up);
      }
      else {
        var gravity = createVector(0, 0.9);
        this.mover.velocity.add(gravity);
      }
      if(!this.reachedScore){
        for (var i = this.index; i < floor(frameCount/100); i++) {
        	this.index += 1;
        	this.coins[i] = new Coin();
        }
      }

      for (var q = 0; q < this.coins.length; q++) {
        if (this.coins[q].colorValue == 1) {
            if (! this.coins[q].hit ) {
              image(GoldCoin,this.coins[q].locationCoin.x, this.coins[q].locationCoin.y)
            }
          }

         else {
          if (! this.coins[q].hit ) {
              image(Devil,this.coins[q].locationCoin.x, this.coins[q].locationCoin.y);
            }
          }


         this.coins[q].locationCoin.x = this.coins[q].locationCoin.x - 2;


         var n = (noise(this.coins[q].yoff)-.5)*5;


          this.coins[q].locationCoin.y += n;


         this.coins[q].run();
         this.coins[q].yoff+=.05;
       }


      for (var j = 0; j < this.coins.length; j++) {

      	if (floor(this.coins[j].locationCoin.x) <= floor(this.mover.position.x + 85) && floor(this.coins[j].locationCoin.x) >= floor(this.mover.position.x - 85) && floor(this.coins[j].locationCoin.y) <= floor(this.mover.position.y + 20) && floor(this.coins[j].locationCoin.y) >= floor(this.mover.position.y - 20) && this.coins[j].hit == false) {
          this.coins[j].hit = true;
          if (this.coins[j].colorValue == 1) {
           this.score++
           if (this.score >= 2 && !this.reachedScore){
            this.scoreIsReached();
            setTimeout(function(){
              console.log("in timeout");
              LuizeGameOver = true;
            }, 2500);
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


    this.mover.update();
    this.mover.checkEdges();
    this.mover.display();



    if (this.mover.position.y + 30 >= height&&!this.reachedScore) {
     luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose = true;
     this.gameLost();

    }
  }


   if (luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose == true) {
     push();
     translate(random(-5,5),0);
     textSize(62);
     textAlign(CENTER);
     fill(255, 0, 0);
     text("YOU LOST!",width/2,height/2);
     pop();


    }

  this.letter = new Letter();



   if (this.reachedScore == true) {
    for (var u = 0; u < this.coins.length; u++) {
      this.coins[u].locationCoin.y = this.coins[u].locationCoin.y + 23;
      // this.mover
      this.mover.position.y = this.mover.position.y + 23 ;



    }
    this.letter.run();


  }
  if (LuizeGameOver){
    this.isGameOver = true;
  }


  } //end of draw function



  this.gameLost = function() {
   this.score = 0;
   this.scoreElem.html('Score = 0');
   this.mover = new LuizeMover();
   this.noKey=true;

   luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose = true;

   setTimeout(function(){
      luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose=false;
      }, 1500);
  }



  this.scoreIsReached = function() {
    this.reachedScore = true;

  }


   class Coin {
       constructor() {
        this.colorValue = floor(random(2));
        this.locationCoin = createVector(window.innerWidth, random(height));
        this.hit = false;
        this.yoff = random(10000);
      };

      run() {
        // if (! this.hit ) {
        push();
        //fill(c);
        //rect(this.locationCoin.x, this.locationCoin.y, 10, 10);
        pop();
    //  }
      }
    }


    class Letter {
      run() {
        push();
        translate(width/2,height/2)
        push();
        fill(0);
        rectMode(CENTER);
        noStroke();
        rect(0,0,20,200);
        noStroke();
        rect(50,110,120,20);
        textSize(24);
        textAlign(CENTER);
        text("YOUR LETTER IS",0,-150);
        pop();
        pop();

        // this.isGameOver = true;
        // for (var i = 0; i < 20; i++) {
        //   coins.push(new Coin(width/2, 100+5*i))}

        // for (var g = 0; g < 6; g++) {
        //   this.coins[g].push(new Coin(width/2 +5*i, 200))
        // }

        }
      }


}
