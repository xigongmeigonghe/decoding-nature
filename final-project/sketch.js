function setup()
{
  createCanvas(3000,700);
  m = new Mover();

}

function draw()
{
  background(0);
  fill(255,0,0);
  m.display();

  if (m.position.x > width/2){
    window.scrollTo(m.position.x - width/2, 0);
  }

  if (keyIsDown('39')){ // Right
    m.move(5);
  }

  if (keyIsDown('37')) { // Left
    m.move(-5);
  }
}

window.addEventListener("keydown", function(e) {
  // Stop arrow keys from moving window
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
