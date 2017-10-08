// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

int cols, rows;
int scl = 20;
int w = 2000;
int h = 1600;
float amp = 0;
float centerX = 0;
float centerY = 0;

float flying = 0;

float[][] terrain;

void setup() {
  size(600, 600, P3D);
  cols = w / scl;
  rows = h/ scl;
  terrain = new float[cols][rows];
}

void mousePressed() {
  amp = 20;
  centerX = (mouseX-width/2+50)/scl+width/scl*2-width/2/scl;
  centerY = (mouseY-height/2+50)/scl+height/scl/2+height/2/scl;
}

void draw() {

  flying -= 0.1;

  float yoff = flying;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      terrain[x][y] = map(sin(abs(dist(centerX, centerY, x, y))+yoff), -1, 1, -amp, amp);
      xoff += 0.2;
    }
    yoff += 0.001;
  }

  if (amp>=5) amp*=0.99;
  else amp = 5;

  background(0);
  stroke(255);
  noFill();

  translate(width/2, height/2+50);
  rotateX(PI/3);
  translate(-w/2, -h/2);

  stroke(30,144,255);
  strokeWeight(2);
  for (int y = 0; y < rows-1; y++) {
    beginShape(POINTS);
    for (int x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}
