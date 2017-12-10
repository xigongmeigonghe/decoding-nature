class Enemy extends PlanetObject{
  constructor(gameState, target, ...args){
    super(...args)
    this.gameState = gameState;
    this.target = target;
    this.displayObject = this.getDisplayObject()
  }
  run = () => {

    if (this.pos.distanceTo(this.target.pos) < 10) {
      this.gameState.userHasLost = true
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
    const geometry = new THREE.SphereGeometry(3, 4, 4 );
    var material = new THREE.MeshBasicMaterial( { color: 0xFF0000} );
    return new THREE.Mesh( geometry, material );
  }
}

class EnemyGenerator {

  constructor(gameState, scene, planet, target) {
    this.gameState = gameState;
    this.scene = scene;
    this.planet = planet;
    this.target = target;
    this.position = planet.randomSurfacePos();
    this.frequency = 10;
    this.maxEnemies = 30;
    this.enemies = [];
  }
  run = () => {
    if (this.gameState.frameCount%this.frequency === 0) {
      this.createEnemy();
    }
    this.enemies.forEach(enemy => enemy.run());
  }
  createEnemy = () => {
    const enemy = new Enemy(this.gameState, this.target, this.scene, this.planet, this.planet.randomSurfacePos(), false, 4)
    if (this.enemies.length < this.maxEnemies) {
      this.enemies.push(enemy);
    }
    this.scene.add(enemy.displayObject);
  }
}
