'use strict';

class Path {
  constructor( scene ) {
  	this.geometry = new THREE.BoxGeometry( window.innerWidth/4, window.innerHeight/4, 250, 1, 1, 50 );
  	this.material = new THREE.MeshLambertMaterial({
  		color: 0xffffff,
  		wireframe: true
  	});

  	this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.set( 0, 0, 0 );

  	scene.add( this.mesh );
  }
}
