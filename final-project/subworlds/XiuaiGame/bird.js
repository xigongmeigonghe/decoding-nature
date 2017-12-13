
function Xiuaibird(x_, y_, _xiuai){

  this.xiuai = _xiuai;
  this.mass = 1;
  this.position = createVector(x_, y_);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.destination = createVector(width/4,height/2);
  this.maxspeed = 4;
  this.maxforce = 0.1;
  this.target = createVector(100, 100);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

 this.display = function(pg)
     {
        // console.log(this.position.x);
        //console.log(this.position.x + " : " + this.position.y);
        fill(255);
        // pg.stroke(255);
        // pg.fill(255);
        // pg.ellipse(this.position.x, this.position.y, 1, 1);
        this.xiuai.pg.point(this.position.x, this.position.y);
        // big.image(img, random(0, big.width), random(0, big.height));
        image(XiuaiCuteImage, this.position.x, this.position.y, 7,7);
        // image(pg, 100, 100);

     }

  this.updatePosition = function(vector){
      this.position = vector;

  }

  this.arrive = function() {
    var desired = p5.Vector.sub(this.target,this.position);  // A vector pointing from the location to the target
    var d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (d < 100) {
      var m = map(d,0,100,0,this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  };


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