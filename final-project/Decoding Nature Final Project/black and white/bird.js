
function bird(x_, y_){

  this.mass = 1;
  this.position = createVector(x_, y_);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

 this.display = function()
     {
        // ellipse(this.position.x, this.position.y, 7, 7);
        image(cute,this.position.x, this.position.y, 7,7);

     }

this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

     // this.update()
     // {
         

     // }

    //  this.applyForce(){
    //  	force(-0.5);
    // }


    // push();
    // lsys.ruleset[0] = birdRule;
    // lsys.generate();

    // turtle.setToDo(lsys.getSentence());
    // turtle.changeLen(0.5);
    
    // pop();



}