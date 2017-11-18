import java.util.Random;

class Ball {

  ArrayList<Particle> particles;
  ArrayList<Connection> springs;

  float xDir, yDir, zDir, x, y, z, r, radius;
  float xRadius, yRadius, zRadius, xCenter, yCenter, zCenter;
  float res;
  float strength, connectionRadius;
  boolean displayConnections, constrain, connections;
  SphereConstraint sphere;

  // Previous four particle positions
  ArrayList<Particle> particles1;
  ArrayList<Particle> particles2;
  ArrayList<Particle> particles3;
  ArrayList<Particle> particles4;


  /* Setup */
  Ball() {

    particles = new ArrayList<Particle>();
    springs = new ArrayList<Connection>();

    particles1 = new ArrayList<Particle>();
    particles2 = new ArrayList<Particle>();
    particles3 = new ArrayList<Particle>();
    particles4 = new ArrayList<Particle>();

    xCenter = width/2;
    yCenter = height/2;
    zCenter = 0;
    radius = yRadius = xRadius = zRadius = height/6;
    res = PI/32;
    displayConnections = false;
    constrain = true;
    connections = false;

    sphere = new SphereConstraint(new Vec3D(xCenter, yCenter, zCenter), radius, true);

    // Top half of sphere
    for (float i = 0; i <= PI; i += res) {
      for (float j = 0; j <= PI; j += res) {
        xDir = sin(i) * cos(j);
        yDir = sin(i) * sin(j);
        zDir = cos(i);
        x = xRadius * xDir + xCenter;
        y = yRadius * yDir + yCenter;
        z = zRadius * zDir + zCenter;

        Particle p = new Particle(x,y,z);
        p.addConstraint(sphere);
        p.addBehavior(new ConstantForceBehavior3D(new Vec3D(xDir, yDir, zDir)));

        particles.add(p);
        physics.addParticle(p);
      }
    }

    // Bottom half of sphere
    for (float i = -PI; i <= 0; i += res) {
      for (float j = 0; j <= PI; j += res) {
        xDir = sin(i) * cos(j);
        yDir = sin(i) * sin(j);
        zDir = cos(i);
        x = xRadius * xDir + xCenter;
        y = yRadius * yDir + yCenter;
        z = zRadius * zDir + zCenter;

        Particle p = new Particle(x,y,z);
        p.addConstraint(sphere);
        p.addBehavior(new ConstantForceBehavior3D(new Vec3D(xDir, yDir, zDir)));
        particles.add(p);
        physics.addParticle(p);
      }
    }
  }

  void display() {

    for (Particle p : particles4) {
      // p.display(0,81,255,20);
      p.display(255,255,255,15);
    }
    particles4 = new ArrayList<Particle>();

    for (Particle p : particles3) {
      // p.display(0,255,4,50);
      p.display(255,255,255,75);
      Vec3D pos = p.getPreviousPosition();
      particles4.add(new Particle(pos.x,pos.y,pos.z));
    }
    particles3 = new ArrayList<Particle>();

    for (Particle p : particles2) {
      // p.display(227,255,0,100);
      p.display(255,255,255,125);
      Vec3D pos = p.getPreviousPosition();
      particles3.add(new Particle(pos.x,pos.y,pos.z));
    }
    particles2 = new ArrayList<Particle>();

    for (Particle p : particles1) {
      // p.display(255,141,0,175);
      p.display(255,255,255,175);
      Vec3D pos = p.getPreviousPosition();
      particles2.add(new Particle(pos.x,pos.y,pos.z));
    }
    particles1 = new ArrayList<Particle>();

    for (Particle p : particles) {
      p.display(255,255,255,255);
      // p.display(255,26,0,255);
      Vec3D pos = p.getPreviousPosition();
      particles1.add(new Particle(pos.x,pos.y,pos.z));
    }

    if (displayConnections) {
      for(Connection c : springs) {
        c.display();
      }
    }

  }

  void showConnections() {
    displayConnections = !displayConnections;
  }

  void morph() {
    if (constrain) {
      for (Particle p : particles) {
        p.removeConstraint(sphere);
      }
    } else {
      for (Particle p : particles) {
        p.addConstraint(sphere);
      }
    }
    constrain = !constrain;
  }

  void manageConnections() {
    if (connections) { // Remove all connections
      for (Connection c : springs) {
        physics.removeSpring(c);
      }
      springs = new ArrayList<Connection>();
    } else {
      Random rand = new Random();
      strength = (rand.nextFloat() * (0.9 - 0.7) + 0.7);
      connectionRadius = radius * (rand.nextFloat() * (2.4 - 1.8) + 1.8);
      for (Particle p : particles) {
        for (int i = 0; i < 3; i++) {
          Particle p1 = particles.get(rand.nextInt(particles.size()));
          Connection c = new Connection(p,p1,connectionRadius,strength);
          physics.addSpring(c);
          springs.add(c);
        }
      }
    }
    connections = !connections;
  }
}