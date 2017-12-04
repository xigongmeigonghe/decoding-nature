class Textbox {
  constructor(_positionX, _positionY, _message) {
    this.positionX = _positionX;
    this.positionY = _positionY;
    this.message = _message;
  }

  display() {
    textSize(20);
    fill(255);
    rect(this.postionX-170,this.postionY+20,330,130);
    fill(0);
    rect(this.postionX-160,this.postionY+30,310,110);
    fill(255);
    rect(this.postionY-150,this.postionY+40,290,90);
    fill(0);
    text(this.message, this.postionX-130, this.postionY+40);
  }

}
