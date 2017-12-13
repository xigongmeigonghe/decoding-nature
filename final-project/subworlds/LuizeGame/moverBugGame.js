// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function LuizeMover() {
  this.position = createVector(width/5,height/5);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topspeed = 5;
  this.mass = 1;
  this.angle = 0;
  this.aVelocity = 0.;
  this.sineWaveSign =1;
  this.whichPic = false;

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };

  this.update = function() {

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  };


  this.display = function() {
    var amplitude = 200; //creates angle and oscillation for wings and colors
    this.angle += this.aVelocity;
    // print(this.velo)
    this.aVelocity = map(this.velocity.y, 5,-5,.2,0.9);

    var s = sin(this.angle);

    if (Math.sign(s)!=this.sineWaveSign){
      //then switch picture
      this.whichPic = !this.whichPic;
    }
    this.sineWaveSign = Math.sign(s);


    push();
    translate(this.position.x, this.position.y);
    imageMode(CENTER);
    if (this.whichPic){

      image(LuizeImageUp,0,0);
    } else {
      image(LuizeImageDown,0,0);
   }

    pop();

    // push(); //draws wings
    // rotate(sin(this.angle));
    // fill(0);
    // noStroke();
    // rect(0, 0, 100, 3.5);
    // pop();
    // push();
    // rotate(sin(-this.angle));
    // fill(0);
    // noStroke();
    // rect(0, 0, -100, 3.5);
    // pop();


    // push()
    // fill(0);
    // noStroke();
    // y = 30
    // rectMode(CENTER);
    // rect(0,0,18,y);
    // pop();


    // push(); //draws antennas and eyes
    // stroke(0);
    // fill(0);
    // line(0,-25,-20,-45);
    // line(0,-25,20,-45);
    // ellipse(-3,-25,4.5,4.5);
    // ellipse(3,-25,4.5,4.5);
    // pop();
    // pop();
    };

  this.checkEdges = function() {
    // if (this.position.x > width) {
    //   this.position.x = width;
    //   this.velocity.x *= -1;
    // } else if (this.position.x < 0) {
    //   this.velocity.x *= -1;
    //   this.position.x = 0;
    // }
    // if (this.position.y > height) {
    //   this.velocity.y *= -1;
    //   this.position.y = height;
    // }
    if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y = 0;
    }
  };




}
