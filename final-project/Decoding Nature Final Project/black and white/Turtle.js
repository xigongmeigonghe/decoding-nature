// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function Turtle(s, l, t) {
  this.todo = s;
  this.len = l;
  this.theta = random(PI/5, PI/6);

  this.makeBirds = true;
  this.birds = [];

  this.render = function() {
    stroke(255);
    var madeBirds = false;
    var b = 0;
    for (var i = 0; i < this.todo.length; i++) {
      var c = this.todo.charAt(i);
      if (c === 'F') {
        line(0,0,this.len,0);
        translate(this.len,0);
      }
      else if (c === 'G') {
        translate(this.len,0);
      }
      else if (c === '+') {
        rotate(this.theta);
      }
      else if (c === '-') {
        rotate(-this.theta);
      }
      else if (c === "B") {
        //ellipse(0, 0, 5, 5);
        if (this.makeBirds) {
          // make birds
          var theBird = new bird(0, 0);
          theBird.display();
          this.birds.push(theBird);
          madeBirds = true;
        } else {
          // apply force, update, and display birds
          var theBird = this.birds[b];
          theBird.applyForce(createVector(0, -1));
          theBird.update();
          theBird.display();

          b++;
        }
      }
      else if (c === '[') {
        push();
      }
      else if (c === ']') {
        pop();
      }
    }
    if (madeBirds) {
      this.makeBirds = false;
    }
  };

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
