// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function Mover() {
  this.position = createVector(width/5,height/5);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topspeed = 5;
  this.mass = 1;
  

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };

  this.update = function() {

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    print(this.velocity)
  };


  this.display = function() {
    var amplitude = 200; //creates angle and oscillation for wings and colors
    angle += aVelocity;
    // aVelocity = map(sin(frameCount*.005), -1,1,.02,.6);
    //aVelocity = map(mouseX, 0,width,.02,.6);
    aVelocity = map(this.velocity.y, 5,-5,.02,.6);
    push();
    translate(this.position.x, this.position.y);
 

    push(); //draws wings
    rotate(sin(angle));
    fill(0);
    noStroke();
    rect(0, 0, 100, 3.5);
    pop();
    push();
    rotate(sin(-angle));
    fill(0);
    noStroke();
    rect(0, 0, -100, 3.5);
    pop();


    push()
    fill(0);
    noStroke();
    y = 30
    rectMode(CENTER);
    rect(0,0,18,y);
    pop();
  

    push(); //draws antennas and eyes
    stroke(0);
    fill(0);
    line(0,-25,-20,-45);
    line(0,-25,20,-45);
    ellipse(-3,-25,4.5,4.5);
    ellipse(3,-25,4.5,4.5);
    pop();
    pop();
    };

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
    if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y = 0;
    }
  };




}
