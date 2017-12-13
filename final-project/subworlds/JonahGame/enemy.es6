class JonahEnemy extends JonahPlanetObject{
  constructor(gameState, target, ...args){
    super(...args)
    this.gameState = gameState;
    this.target = target;
    this.displayObject = this.getDisplayObject()
  }
  run = () => {

    if (this.pos.distanceTo(this.target.pos) < 10) {
      this.gameState.lives-=1;
      if (this.gameState.lives === 0)this.gameState.userHasLost = true
      this.pos = this.planet.randomSurfacePos();
      this.velocity = this.getNewVelocity();
      this.velocity.setLength(this.maxVelocity);
      this.rotationAxis = this.getRotationAxis();
    }
    else {
      super.run();
      this.displayObject.position.copy(this.pos).setLength(this.planet.radius+20)
    }
  }
  getDisplayObject() {
    const geometry = new THREE.BoxGeometry( 5,5,5 );
    var material = new THREE.MeshPhongMaterial( { color: 0xFF0000} );
    var mesh = new THREE.Mesh( geometry, material );
    var wireframeGeometry = new THREE.EdgesGeometry( mesh.geometry );
    var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var wireframe = new THREE.LineSegments( wireframeGeometry,wireframeMaterial );
    mesh.add( wireframe );
    return mesh;

  }
}

class JonahEnemyGenerator {

  constructor(gameState, scene, planet, target) {
    this.gameState = gameState;
    this.scene = scene;
    this.planet = planet;
    this.target = target;
    this.position = planet.randomSurfacePos();
    this.frequency = 10;
    this.maxEnemies = 60;
    this.enemies = [];
  }
  run = () => {
    if (this.gameState.frameCount%this.frequency === 0) {
      this.createEnemy();
    }
    this.enemies.forEach(enemy => enemy.run());
  }
  createEnemy = () => {
    const enemy = new JonahEnemy(this.gameState, this.target, this.scene, this.planet, this.planet.randomSurfacePos(), false, 3)
    if (this.enemies.length < this.maxEnemies) {
      this.enemies.push(enemy);
    }
    this.scene.add(enemy.displayObject);
  }
}
