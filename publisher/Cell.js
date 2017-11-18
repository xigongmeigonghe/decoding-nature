// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


function Cell(x_, y_, w_, s_, p_) {
  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.player = p_;
  if (this.player == 1)
    this.color = color(253, 138, 37);
  else if (this.player == 5)
    this.color = color(125, 206, 241);
  this.state = s_; //Math.floor(random(2));
  this.previous = this.state;
  this.prevPlayer = this.player;

  this.savePrevious = function() {
    this.previous = this.state;
    this.prevPlayer = this.player;
  };

  this.newState = function(s, g) {
    this.state = s;
    if (s == 1) {
      this.player = g;
      if (this.player == 1)
        this.color = color(253, 138, 37);
      else if (this.player == 5)
        this.color = color(125, 206, 241);
    }
  };

  this.display = function() {
    // if (this.previous === 0 && this.state == 1) fill(0,0,255);
    if (this.state == 1) fill(this.color);
    // else if (this.previous == 1 && this.state === 0) fill(255,0,0);
    else fill(57);
    stroke(10, 100);
    rect(this.x, this.y, this.w, this.w);
  };
}
