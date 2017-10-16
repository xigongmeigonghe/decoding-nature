class Particle extends VerletParticle3D {

  Particle(float x, float y, float z) {
    super(x, y, z);
  }

  void display(int r, int g, int b, int alpha) {
    stroke(r, g, b, alpha);
    strokeWeight(2);
    point(x, y, z);
  }
}
