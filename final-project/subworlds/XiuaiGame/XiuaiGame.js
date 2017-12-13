

var XiuaiCuteImage;
 
var XiuaiGame = function() {

  this.gameOver = false;

  this.lsys;
  this.turtle;
  this.birdRule;

  this.shu;
  this.cat;
  this.dog;
  this.me;
  this.pg;
  this.firstRule;
  this.counter = 0;
  this.numQuestion = 0;
  this.questions = ['The elongation of root and stem forms what is known as the', 'do you love magic', 'Gas exchange through the bark occurs through', 'would you like to see some magic?', 'Fleshy fruits that are brightly colored are often dispersed by',];
  this.answers = [
    ['primary plant body', 'secondary growth', 'root'],
    [':)', 'Magic loves me', 'I dont kow magic'],
    ['lenticles', 'stomata', 'micropyles'],
    [':)', ':)', 'Yes'],
    ['water', 'me', 'birds'],
  ];
  this.rightAnswers = [0, 1, 0, 2, 2];

  // this.text=[];
  this.numText=0;
  this.wrong = false;

  // this.angle = PI/2;
  // this.angleIncrement= PI/1024;
  // this.r = 200;
  // this.x = cos(this.angle)*r + this.width/2;
  // this.y = sin(this.angle)*r + this.height/2;



// this.isGathis.meOver= false;


  this.preload = function(){

    XiuaiCuteImage= loadImage("niao.png")
    this.shu= loadImage('shu.jpg')
  } //end of preload

  this.keyPressed=function(keyCode){
    print(keyCode);
    // check answer
    if (keyCode==32) {
      //you have to change what selectedanswer is based on which text is highlighted
      if (this.numText == this.rightAnswers[this.numQuestion]) {
          this.growTree();
          if (this.numQuestion < this.questions.length-1) {
            this.numQuestion++;
          } else {
            setTimeout(function(){this.gameOver=true;}.bind(this), 15000);
          }


          //this.updateAnswers();
        } else {
          //trigger draw lost text
          this.wrong = true;
          setTimeout(function(){this.wrong = false;}.bind(this), 1000); //reset and start again }, 1000);
        }
    } else if (keyCode==38 && 0<this.numText) {
      this.numText-=1; 
    } else if (keyCode==40 && this.numText<2) {
      this.numText+=1;
    }

    // move down

    // this.cat.mouseClicked(function() {
    //   if (0 == this.rightAnswers[this.numQuestion]) {
    //     this.growTree();
    //     if (this.numQuestion < this.questions.length-1) {
    //       this.numQuestion++;
    //     }
    //     this.updateAnswers();
    //   } else {
    //     alert('HAHAHAHA Wrong!');
    //   }
    // });

    // this.dog = createButton(this.answers[this.numQuestion][1]);
    // this.dog.mouseClicked(function() {
    //   if (1 == this.rightAnswers[this.numQuestion]) {
    //     growTree();
    //      if (this.numQuestion < this.questions.length-1) {
    //       this.numQuestion++;
    //     }
    //     updateAnswers();
    //   } else {
    //     alert('HAHAHAHA Wrong!');
    //   }
    // });

    // this.me = createButton(this.answers[this.numQuestion][2]);
    // this.me.mouseClicked(function() {
    //   if (2 == rightAnswers[this.numQuestion]) {
    //     growTree();
    //      if (this.numQuestion < this.questions.length-1) {
    //       this.numQuestion++;
    //     }
    //     updateAnswers();
    //   } else {
    //     alert('HAHAHAHA Wrong!');
    //   }
    // });
  }

  this.setup = function() {

    createCanvas(window.innerWidth, window.innerHeight);
    pixelDensity(1);


    var ruleset = [];
    this.firstRule = new XiuaiRule('F', "FF+[+F-F-F]-[-F+F+F]")
    ruleset[0] = this.firstRule;
    ruleset[1] = new XiuaiRule('G', 'F')
    this.birdRule = new XiuaiRule('F', 'FF+[+F-F-GB]-[-F+F+GB]');
    this.lsys = new XiuaiLSystem("G", ruleset);
    this.turtle = new XiuaiTurtle(this.lsys.getSentence(), height*3/5, radians(25), this);
    print(this.lsys.getSentence()+ " first sentance")
    // this.cat = createButton(this.answers[this.numQuestion][0]);
    


    this.pg = createGraphics(window.innerWidth, window.innerHeight);
    this.pg.background(0);
    this.pg.stroke(255);
    this.pg.push();
    this.pg.translate(width/2, height);
    this.pg.rotate(-PI/2);

  for(var i=0;i<5;i++){
    this.growTree();

  }

  this.turtle.render(this.pg);

  this.pg.pop();
     // analyze the pixels once 

    
     this.checkPixels();
     this.turtle.init=true;


   
    this.lsys.sentence="G";
    this.lsys.ruleset[0] = this.firstRule;
    this.turtle.setToDo(this.lsys.getSentence());
    this.turtle.len = height*3/5;
    this.turtle.madeBirds=false;
    this.counter = 0;

  // image(this.pg,0,0);

  }//end of setup

  this.run= function () {
    // imageMode(CORNER);

    background(0);
  //   fill(0);

  //   background(51);
   noFill();
   stroke(255);
    

    // text('q1','q2', 'q3', 'q4', 'q5');
    push();
    translate(width/2, height);
    rotate(-PI/2);

    this.turtle.render();

    
    pop();

  //   //do here
  //   // var theBird = this.birds[b];
  //   //loop through all this.turtle.birds && do
  //   //this.turtle.birds[i].applyForce....
  //   //         theBird.applyForce(createVector(0, -1)); !!!!!!! vector away from middle of screen
  //   //         theBird.update();
  //   //         theBird.display();
  //   // maybe keep them on screen using perlin noise
  //   // then have them seek their destination of C (follow the thing)
  //    fill(255);
  //   text(this.questions[this.numQuestion],20, height/4);
  //   fill(255);
  //   text(stringToWrite,x, y);


  text(this.questions[this.numQuestion], 20, height/4);

  for(var i = 0; i < this.answers[this.numQuestion].length; ++i) {
    if (this.numText == i) {
      fill(241,49,180);
    } else {
      fill(255);
    }
    noStroke();

    text(this.answers[this.numQuestion][i], 40, height/4 + 30*(1+i));
  }

  if (this.wrong == true) {
    fill(0,204,0)
    text("hahahaha Wrong :)", 20, height/4 + 120);
  }


  if (this.turtle.madeBirds){
    for (var i=0;i<this.turtle.birds.length;i++){
      this.turtle.birds[i].arrive();
      this.turtle.birds[i].update();


      this.turtle.birds[i].display();
    
    }


  }
  // image(this.pg,0,0);

  // fill(255);
  // noStroke();
  // var angleIncrement= PI/1024;
  // var angle = PI/2;
  // var r = 200;
  // for(var i=0;i<1024;i++){
  //   var x = cos(angle)*r + width/2;
  //   var y = sin(angle)*r + height/2;
  //   ellipse(x,y,20,20);
  //   angle+=angleIncrement;
  // }
  }//end of run





  this.checkPixels=function(){
    console.log("Checking Pixels")
   
    print(this.turtle.locations.length+ " initial length")
    if(this.turtle.madeBirds){
      this.pg.loadPixels();
      var index = 0;
      for (var y=0;y<this.pg.height;y++){
        for (var x=0;x<this.pg.width;x++){
            // console.log("Looping through width and height")
            
            index++;
          var loc = (x+y*width)*4;
          var col = this.pg.pixels[loc];
          // print(col);
          // pixels[loc+1]=0;
          if (col>125){

            // console.log("UPDATING LOthis.catIONS")
            var pos = createVector(x,y);
            this.turtle.locations.push(pos);
            

          }
        }

      }
      print(index);
    }
      this.pg.updatePixels();
      this.turtle.updateBirdsPosition();
      print("done checking");
      print(this.turtle.locations.length+ " final length")
      // this.analyze=true;


  }//end of check pixels



  this.growTree=function() {
    if (this.counter < 4) {
      push();
      this.pg.push();
      this.lsys.generate();
      //println(this.lsys.getSentence());
      this.turtle.setToDo(this.lsys.getSentence());
      this.turtle.changeLen(0.5);
      this.pg.pop();
      pop();
      //redraw();
      this.counter++;
    } else if (this.counter == 4) {
      this.pg.push();
      push();
      // this.lsys.save();
      this.lsys.ruleset[0] = this.birdRule;
      this.lsys.generate();

      this.turtle.setToDo(this.lsys.getSentence());
      this.turtle.changeLen(0.5);
      this.pg.pop();
      pop();
      
      this.counter ++;
    }
  } //end of grow tree

  this.updateAnswers=function() {
    this.cat.html(this.answers[this.numQuestion][0]);
    this.dog.html(this.answers[this.numQuestion][1]);
    this.me.html(this.answers[this.numQuestion][2]);
  } //end of updateanswers
} //end of Xiuai Game
