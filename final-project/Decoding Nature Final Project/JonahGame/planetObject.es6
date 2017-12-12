class JonahPlanetObject {
  constructor(scene, planet,pos,vel, maxVelocity){
    this.planet = planet,
    this.maxVelocity = maxVelocity || 5
    this.pos = pos || planet.randomSurfacePos()
    this.nextPos = new THREE.Vector3()
    this.velocity = vel || this.getNewVelocity()
    this.acceleration = 0
    this.rotationalAcceleration = 0
    this.rotationalVelocity = 0
    this.rotationAxis = this.getRotationAxis()
  }
  run() {
    if (this.rotationalAcceleration != 0) {
      this.rotationalVelocity += this.rotationalAcceleration
      if (this.rotationalVelocity>0.15) this.rotationalVelocity = 0.15
      else if (this.rotationalVelocity<-0.15) this.rotationalVelocity = -0.15
      this.updateRotationAxis()
    }
    this.velocity.applyAxisAngle(this.pos,this.rotationalVelocity/1000);
    this.velocity.multiplyScalar(1+this.acceleration)
    this.velocity.clampLength(0.1,this.maxVelocity)
    this.nextPos.addVectors(this.pos,this.velocity)
    this.planet.bindToSurface(this.nextPos)
    this.rotateVelocity()
    this.pos.copy(this.nextPos)
  }
  getRotationAngle = () => this.pos.angleTo(this.nextPos)
  rotateVelocity = () => {
    const _velocity = this.velocity.clone().add(this.pos)
    this.velocity.applyAxisAngle(this.rotationAxis,-this.getRotationAngle())
  }
  getRotationAxis = () => (
    this.pos.clone()
      .add(this.velocity)
      .cross(this.pos)
      .normalize()
  )
  updateRotationAxis = () => this.rotationAxis.copy(this.getRotationAxis())
  getNewVelocity = () => {
    const x = Math.random()
    const y = Math.random()
    const z = -(x*this.pos.x+y*this.pos.y)/this.pos.z
    const vel = new THREE.Vector3(x,y,z)
    vel.setLength(this.maxVelocity)
    return vel
  }
}
