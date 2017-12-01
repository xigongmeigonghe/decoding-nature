function setup()
{
  createCanvas(3000,700);
  m = new Mover();
}

function draw()
{
  background(0);
  fill(255,0,0);

  if (m.position.x > width/2){
    window.scrollTo(m.position.x - width/2, 0);
  }
}

function keyPressed(){
  if (key == 'H' || key == 'h'){
    console.log("in")
    window.scrollTo(width/2,0);
  }
}
