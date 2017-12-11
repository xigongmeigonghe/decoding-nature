'use strict';

class StarField {
  constructor( scene ) {
    this.position = new THREE.Vector3(
      THREE.Math.randInt( -window.innerWidth/4, window.innerWidth/4 ),
      THREE.Math.randInt( -window.innerHeight/4, window.innerHeight/4 ),
      THREE.Math.randInt( -225, -100 )
    );

    this.width  = THREE.Math.randInt( 10, 100 );
    this.height = THREE.Math.randInt( 10, 100 );
    this.depth  = THREE.Math.randInt( 10, 100 );

    this.starsGeometry = new THREE.Geometry();
    for ( let i = 0; i < this.width; i += 2 ) {
      for ( let j = 0; j < this.height; j += 2 ) {
        for ( let k = 0; k < this.depth; k += 2 ) {
          let star = new THREE.Vector3(
            this.position.x + i,
            this.position.y + j,
            this.position.z + k
          );
          this.starsGeometry.vertices.push( star );
        }
      }
    }
    this.starsGeometry.computeBoundingBox();

    this.starsMaterial = new THREE.PointsMaterial( {color: 0xefefef /*E07B11*/} );

    this.starField = new THREE.Points( this.starsGeometry, this.starsMaterial );

    scene.add( this.starField );
  }
  //
  // rotate( axis, theta ) {
  //   console.log("Rotating starfield!");
  //
  //   for ( let i = 0; i < this.starField.geometry.vertices.length; i++ ) {
  //     this.starField.geometry.vertices[i].applyAxisAngle( axis, theta );
  //   }
  //
  //   this.starField.geometry.verticesNeedUpdate = true;
  // }
  //
  // move( forward ) {
  //   console.log("Moving starfield!");
  //
  //   for ( let i = 0; i < this.starField.geometry.vertices.length; i++ ) {
  //     if ( forward ) {
  //       this.starField.geometry.vertices[i].z += 1;
  //     }
  //     else {
  //       this.starField.geometry.vertices[i].z -= 1;
  //     }
  //   }
  //
  //   this.starField.geometry.verticesNeedUpdate = true;
  // }
  //
  // collide( spaceship ) {
  //
  // }
}
