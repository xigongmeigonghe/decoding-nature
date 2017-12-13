
var KateGame = function(){

  this.isGameOver=false;
  //variables for defender movement
  this.a = 0;
  this.go=0;
  this.spaceBack;
  // this.backImg;
  this.alien;
  // this.planet;
  this.cartX;
  this.cartY;
  //particles and particle systems
  this.ps;
  this.particleCounter = 0;
  // this.defender;
  this.target;
  

  this.lasers=[];
  this.particles=[];
  this.x;
  this.y;





  this.setup=function() {
    createCanvas(innerWidth, innerHeight);
          fill(255);
    ellipse(width/2,height/2);
    this.ps = new KateParticleSystem(createVector(innerWidth), 0);
    this.lasers = [];
    this.target = createVector(width/2,height/2);
    var r = width/2+50;
    var alienAmount=30;
    var angle=0;
    var angleIncrement= TWO_PI/alienAmount;
    for(var i=0;i<alienAmount;i++){
      var pos =createVector(cos(angle)*r+this.target.x,sin(angle)*r+this.target.y);
      this.ps.addParticle(pos);
      angle+=angleIncrement;
    }
    // print(this.ps.particles.length)
  }
  this.run=function() {

    imageMode(CORNER);
    background(backImg);
    fill(255);
    
    this.a += 0.1*this.go;
    
     this.x = width/2 +(cos(this.a) *80);
     this.y = height/2 +(sin(this.a) *80);
     this.cartX=cos(this.a);
     this.cartY=sin(this.a);
    
    fill(255, 0 ,0);
    push();
    imageMode(CENTER);
    image(defender,this.x, this.y, 30, 30);		//this is the defender
    pop();
  
    imageMode(CENTER);
    image(planet,this.target.x,this.target.y,katesPlanetSize,katesPlanetSize);
    pop();
    

    
    //runs the particle system
    this.ps.run(this.alien);
    // var force= createVector(0,.01);
    // this.ps.applyForce(force);
 

  	for (var i = this.lasers.length - 1; i >= 0; i--) {
      for(var j=0;j<this.ps.particles.length;j++){
        this.lasers[i].hits(this.ps.particles[j]);
      }
    	this.lasers[i].render();
    }
    var ourScore=0;
    var theirScore=0;
    for(var j=0;j<this.ps.particles.length;j++){
        if(this.ps.particles[j].isDead()) theirScore++;
        if(this.ps.particles[j].isShot) ourScore++;
      }
      // print(ourScore+" "+theirScore);
      push();
      textSize(30);
      text("      Aliens killed: " + ourScore, 0, 90,1000)
      text("      Aliens invaded: " + theirScore, 0,120,1000)
      fill(255,255,255);
      pop();
      if (ourScore==10 || ourScore > 10){
        clear()
        // print("you win")
        // imageMode(CORNER);
        // background(this.backImg);
        // console.log("start printing the letter")
        textSize(50);
        textAlign(CENTER);
        fill(100,100,255);
        text("Your letter is W ", width/2, height/2);
        this.isGameOver=true;
        
      }
      if (theirScore == 10 || theirScore > 10){
        clear()
        // push();
        // console.log("start printing the ltter")
        push();
        textSize(50);
        textAlign(CENTER);
        text("Your letter is W ",width/2,height/2);
        fill(255,255,255);
        pop();

        // pop();
        // imageMode(CORNER);
        // background(this.backImg);
        // clear()
        this.isGameOver=true;
        // print("they won!")
      }

   //  	for (var j=0; j<ps.particles.length;j++){
   //  		if (lasers[i].hits(particles[j])){
   				// particles(i,1);
    			// particles[i].splice();
   //  	}

   //  	}
   //  }

  }



  //this is to move the defender around the planet
this.keyPressed=function(keyCode) { 
  if (keyCode == RIGHT_ARROW){
    // if(this.y>height/2)
    this.go = 1;
    // else
    //   this.go = 1;
  }else if(keyCode == LEFT_ARROW){
    // if(this.y>height/2)
    this.go = -1;
    // else
      // this.go = -1;}
    }
  else if (keyCode ==DOWN_ARROW){
    // if(this.x>width/2)
    this.go = 1;
    // else
      // this.go = -1;
  }else if (keyCode == UP_ARROW){
    // if(this.x>width/2)
    this.go = -1;
    console.log("up")
    // else
      // this.go = 1;
  }
  else if (keyCode == 65){
    this.lasers.push(new KateLaser(this.cartX,this.cartY));
    
    console.log("space is pressed")
  }
}



//stops the defender from moving around the planet
this.keyReleased=function(){
  this.go = 0;
}

}


 

