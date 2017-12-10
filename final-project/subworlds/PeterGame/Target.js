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
    this.mesh.position.set( 0, 0, -250 );

  	scene.add( this.mesh );
  }
}
