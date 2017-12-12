'use strict';

class Target {
  constructor( scene ) {
  	this.geometry = new THREE.SphereGeometry( 25, 40, 40 );
  	this.material = new THREE.MeshLambertMaterial({
  		color: 0xE07B11,
  		wireframe: true
  	});

  	this.mesh = new THREE.Mesh( this.geometry, this.material );
  	this.mesh.receiveShadow = true;
  	this.mesh.castShadow = false;
    this.mesh.material.side = THREE.DoubleSide
    this.mesh.position.set( 0, 0, -350 );

  	scene.add( this.mesh );
  }

  isGameOver( player ) {
    // let t = new THREE.Box3().setFromObject( this.mesh );
    // let p = new THREE.Box3().setFromObject( player );
    if ( player.position.x >= -25  && player.position.x <= 25 &&
         player.position.y >= -25  && player.position.y <= 25 &&
         player.position.z >= -275 && player.position.z <= -225) {
      return true;
    }
    return false;
  }
}
