/* Coordinate calcuations inspired by Richard Wong's "Jelly Ball" (2010) */

import toxi.physics3d.*;
import toxi.physics3d.behaviors.*;
import toxi.geom.*;
import toxi.physics3d.constraints.*;

VerletPhysics3D physics;

Ball ball;

float xrotary, yrotary, zrotary, xCenter, yCenter, zCenter;
float x, y, z, r, radius, angle, a, b;
float xRadius, yRadius, zRadius;
float xLast, yLast, zLast;
float res, force;
boolean showVectors;
int count;
int time;

boolean smoothing;

void setup() {
  size(1200, 800, P3D);
  background(0);
  frameRate(60);

  physics = new VerletPhysics3D();

  xCenter = width/2;
  yCenter = height/2;
  zCenter = 0;
  count = 0;
  time = millis();

  ball = new Ball();
}

void draw() {
  background(20);
  smooth();
  camera();

  rotateDisplay();

  physics.update();
  ball.display();
}

void camera() {

  directionalLight(200, 200, 200, -1, 0, -1);
  lightSpecular(255, 100, 20);
  emissive(0, 64, 128);
  shininess(12);

  xrotary += float(mouseX - width/2)/(width/2) * 0.03;
  yrotary += float(mouseY - width/2)/(width/2) * 0.03;
  zrotary += float(mouseX - mouseY)/(width/2) * 0.03;

  translate(xCenter, yCenter, zCenter);
  rotateX(xrotary);
  rotateY(yrotary);
  rotateZ(zrotary);
  translate(-xCenter, -yCenter, zCenter);

}

void rotateDisplay() {
  if((millis()-time)>7500) {
    count = (count+1)%4;
    updateStatus();
    time = millis();
  }
}

void updateStatus() {
  if (count == 0) { // Shatter sphere
    ball.morph();
  } else if (count == 1) { // Generate particle system curve
    ball.manageConnections();
  } else if (count == 2) { // Explosion
    ball.morph();
  } else if (count == 3) {
    ball.manageConnections();
    ball.morph();
    count=0;
  }
}

void keyPressed(KeyEvent e) {
  if (e.getKeyCode() == 68) // "d"
    ball.showConnections();

  if (e.getKeyCode() == 10) { // "ENTER"
    count = (count+1)%4;
    updateStatus();
  }

  if (e.getKeyCode() == 67) // "c"
    ball.manageConnections();
}
