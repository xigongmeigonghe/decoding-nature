class Textbox {
  constructor(_position, _message) {
    this.position = createVector(_position.x, _position.y);
    this.position.x += -50;
    this.position.y += -400;
    this.width = 400;
    this.height = 120;
    this.message = _message;
  }

  display() {
    textSize(20);
    fill(255);
    rect(this.position.x-20,this.position.y-20,this.width+40,this.height+40);
    fill(0);
    rect(this.position.x-10,this.position.y-10,this.width+20,this.height+20);
    fill(255);
    rect(this.position.x-0,this.position.y-0, this.width, this.height);
    fill(0);
    text(this.message, this.position.x+20, this.position.y+40);
  }

}
