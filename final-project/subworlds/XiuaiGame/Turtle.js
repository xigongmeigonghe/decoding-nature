// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function XiuaiTurtle(s, l, t, _xiuai) {
  this.xiuai = _xiuai;

  this.todo = s;
  this.len = l;
  this.theta = random(PI/5, PI/6);

  this.makeBirds = true;
  this.birds = [];
  this.analyze=false;
  this.locations = [];
  this.madeBirds = false;
  this.init = false;
  this.render = function(pg) {
    stroke(255);
    
    var b = 0;
    for (var i = 0; i < this.todo.length; i++) {
      var c = this.todo.charAt(i);
      if (c === 'F') {
        if (this.init){
        line(0,0,this.len,0);
        translate(this.len,0);
        } else {pg.translate(this.len,0);
        }


      }
      else if (c === 'G') {
        if (this.init){
        translate(this.len,0);
        } else pg.translate(this.len,0);
      }
      else if (c === '+') {
        if (this.init){
        rotate(this.theta);
        } else pg.rotate(this.theta);
      }
      else if (c === '-') {
        if (this.init){
        rotate(-this.theta);
        } else pg.rotate(-this.theta);
      }
      else if (c === "B") {
        //ellipse(0, 0, 5, 5);
        if (this.init) this.madeBirds = true;
        if (this.makeBirds) {
          // make birds
          var theBird = new Xiuaibird(0, 0, this.xiuai);
          if(!this.init)
          theBird.display(pg);
          this.birds.push(theBird);
          this.madeBirds = true;
        } else {
          // apply force, update, and display birds
          var theBird = this.birds[b];
          //steering towards their destination
          //apply force of steeering
          //probably do some arriving
          // theBird.applyForce(createVector(0, 0.1));
          theBird.update();
          if(!this.init)
          theBird.display(pg);


          b++;
        }
      }
      else if (c === '[') {
        if (this.init)
        push();
         else pg.push();
      }
      else if (c === ']') {
        if (this.init) pop();
        else pg.pop();
      }
    }
    if (this.madeBirds) {
      this.makeBirds = false;

      // stuffff
      var angleIncrement= PI/this.birds.length;
      var angle = PI/2;
      var r = 300;
      for(var i=0;i<this.birds.length;i++){
        var x = cos(angle)*r + width/2-50;
        var y = sin(angle)*r + height/2;
        this.birds[i].target = createVector(x, y);
        //ellipse(x,y,20,20);
        angle+=angleIncrement;
      }
    }
  };

  this.updateBirdsPosition = function(){
    var angleIncrement= PI/this.birds.length;
    angle = PI/2;
    var r = 200;
    var center = createVector(width/2+100,height/2);
    for(var i = 0; i < this.birds.length; i++){
      this.birds[i].updatePosition(this.locations[i]);
      var x = cos(angle)*r + width/2;
      var y = sin(angle)*r + height/2;
    //ellipse(x,y,20,20);
      angle+=angleIncrement;
      this.birds[i].destination.x = x;
      this.birds[i].destination.y =  y;
      var birdPos = this.birds[i].position;
      if (!birdPos) {
        continue;
      }
      var vel = p5.Vector.sub(this.birds[i].position, center);
      vel.mult(.1);
      this.birds[i].velocity = vel;
    }


  }

  this.setLen = function(l) {
    this.len = l;
  };

  this.changeLen = function(percent) {
    this.len *= percent;
  };

  this.setToDo = function(s) {
    this.todo = s;
  };
}
