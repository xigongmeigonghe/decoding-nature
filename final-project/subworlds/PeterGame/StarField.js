'use strict';

class StarField {
  constructor( scene ) {
    // set a random position
    this.position = new THREE.Vector3(
      THREE.Math.randInt( -window.innerWidth/8, window.innerWidth/8 ),
      THREE.Math.randInt( -window.innerHeight/8, window.innerHeight/8 ),
      THREE.Math.randInt( -325, -150 )
    );

    // this.position = new THREE.Vector3( 0, 0, -200 );

    this.width  = THREE.Math.randInt( 10, 100 );
    this.height = THREE.Math.randInt( 10, 100 );
    this.depth  = THREE.Math.randInt( 10, 100 );

    this.stars = []; // this stars all the stars

    for ( let i = 0; i < this.width; i += 4 ) {
      for ( let j = 0; j < this.height; j += 4 ) {
        for ( let k = 0; k < this.depth; k += 4 ) {
          let geometry = new THREE.Geometry();
          let pos = new THREE.Vector3(
            this.position.x + i,
            this.position.y + j,
            this.position.z + k
          );
          geometry.vertices.push( pos );
          geometry.computeBoundingBox();

          let material = new THREE.PointsMaterial( {color: 0xefefef} );
          let star = new THREE.Points( geometry, material );

          scene.add( star );

          this.stars.push( star );
        }
      }
    }
  }

  // display the points if the user gets close enough to them
  processPlayerDistance( player ) {
    let distance;

    for ( let i = 0; i < this.stars.length; i++ ) {
      distance = player.position.distanceTo( this.stars[i].geometry.vertices[0] );
      // console.log(distance);
      if ( distance <= 5 ) {
        return true;
      }
      else if ( distance < 25 && distance > 5 ) {
        this.stars[i].visible = true;
      }
      else {
        this.stars[i].visible = false;
      }
    }

    return false;
  }
}
