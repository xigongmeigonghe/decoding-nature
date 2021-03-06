class JonahPlayer extends JonahPlanetObject{
  constructor(scene, planet){
    super(scene, planet)
    this.scene = scene;
    this.displayObject = this.getDisplayObject()
    scene.add(this.displayObject)
    this.keys = {left: false, right: false, up: false}
    this.raycaster = new THREE.Raycaster(this.pos, this.pos.clone().negate().normalize())
    this.raycaster.far = 100
  }
  run = () => {
    this.checkKeys()
    super.run()
    this.raycaster.set(this.pos, this.pos.clone().negate().normalize())
    const intersection = this.raycaster.intersectObject(this.planet.displayObject)[0]
    if (intersection) {
      const surfaceNormal = intersection.face.normal;
      const len = intersection.point.length();
      this.displayObject.position.copy(intersection.point).setLength(len+25);
      this.displayObject.lookAt(new THREE.Vector3());
      //this.displayObject.lookAt(this.displayObject.position.clone().sub(surfaceNormal));
    }
  }
  checkKeys = () => {
    if (this.keys.left) this.rotationalAcceleration=0.006;
    else if (this.keys.right) this.rotationalAcceleration=-0.006;
    else {
      if (this.rotationalVelocity > 0) this.rotationalAcceleration = -0.012
      else if (this.rotationalVelocity < 0) this.rotationalAcceleration = 0.012
      if (Math.abs(this.rotationalVelocity) < 0.012) {
          this.rotationalAcceleration = 0
          this.rotationalVelocity = 0
      }
    }
    if (this.keys.up) this.acceleration = 0.05;
    else this.acceleration = -0.01;
  }
  getDisplayObject() {
    const geometry = new THREE.OctahedronGeometry( 8,0 );
    var material = new THREE.MeshPhongMaterial( { color: 0x4488FF} );
    var mesh = new THREE.Mesh( geometry, material );
    var wireframeGeometry = new THREE.EdgesGeometry( mesh.geometry );
    var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var wireframe = new THREE.LineSegments( wireframeGeometry,wireframeMaterial );
    mesh.add( wireframe );
    return mesh;
  }

  /*

   ********************************* JOYSTICK HANDLER ********************************
   * Thresholds not properly set yet
  */
  handleJoystick = (joystickX, joystickY) => {

    const upThreshold = 50;
    const leftThreshold = 25;
    const rightThreshold = 75;

    if (joystickX < leftThreshold) this.keys.left = true;
    else this.keys.left = right;
    if (joystickX > rightThreshold) this.keys.right = true;
    else this.keys.right = false;
    if (joystickY > upThreshold) this.keys.up = true;
    else this.keys.up = false;

  }

  handleKeys = (key, direction) => {
    if (direction === "UP") {
      if (key === "ArrowUp") this.keys.up = false;
      else if (key === "ArrowLeft") this.keys.left = false;
      else if (key === "ArrowRight") this.keys.right = false;
    }
    else if (direction === "DOWN") {
      if (key === "ArrowUp") this.keys.up = true;
      else if (key === "ArrowLeft") this.keys.left = true;
      else if (key === "ArrowRight") this.keys.right = true;
    }
  }
}
