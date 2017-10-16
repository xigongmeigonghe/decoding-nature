class Connection extends VerletSpring3D {

  Connection(Particle a, Particle b, float len, float strength) {
    super(a, b, len, strength);
  }

  void display() {
    stroke(255);
    strokeWeight(1);
    line(a.x, a.y, a.z, b.x, b.y, b.z);
  }
}
