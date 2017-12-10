class maze3D {
  constructor() {
    this.camera;
    this.scene;
    this.renderer;
    this.controls;

    this.starFields = [];
    this.target;

    this.raycaster;

    let blocker = document.getElementById( 'blocker' );
    let instructions = document.getElementById( 'instructions' );

    let havePointerLock = 'pointerLockElement' in document ||
                          'mozPointerLockElement' in document ||
                          'webkitPointerLockElement' in document;

    if ( havePointerLock ) {
      let element = document.body;

      let pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element ||
             document.mozPointerLockElement === element ||
             document.webkitPointerLockElement === element ) {
          controlsEnabled = true;
          this.controls.enabled = true;
          blocker.style.display = 'none';
        } else {
          this.controls.enabled = false;
          blocker.style.display = 'block';
          instructions.style.display = '';
        }
      };

      let pointerlockerror = function ( event ) {
        instructions.style.display = '';
      };

      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

      instructions.addEventListener( 'click', function ( event ) {
        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock ||
                                     element.mozRequestPointerLock ||
                                     element.webkitRequestPointerLock;
        element.requestPointerLock();
      }, false );
    } else {
      instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }

    this.controlsEnabled = false;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;

    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
  }

  setup() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 100;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x111111 );
    this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    let light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    this.scene.add( light );

    this.controls = new THREE.PointerLockControls( camera );
    this.scene.add( controls.getObject() );

    new Path( scene );

    // create the stars fields
    for ( let i = 0; i < 25; i++ ) {
      let starField = new StarField( scene );
      this.starFields.push( starField.starField );
    }

    this.target = new Target( scene );


    let onKeyDown = function ( event ) {
      switch ( event.keyCode ) {
        case 87: // w
          this.moveUp = true;
          break;

        case 83: // s
          this.moveDown = true;
          break;

        case 38: // up: moves forward
          this.moveForward = true;
          break;

        case 37: // left
          this.moveLeft = true;
          break;

        case 40: // down
          this.moveBackward = true;
          break;

        case 39: // right
          this.moveRight = true;
          break;
      }
    };

    let onKeyUp = function ( event ) {
      switch( event.keyCode ) {
        case 87: // w: moves up
          this.moveUp = false;
          break;

        case 83: // s: moves down
          this.moveDown = false;
          break;

        case 38: // up: moves forward
          this.moveForward = false;
          break;

        case 37: // left
          this.moveLeft = false;
          break;

        case 40: // down: moves backward
          this.moveBackward = false;
          break;

        case 39: // right
          this.moveRight = false;
          break;
      }
    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, -1 ), 0, 10 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  run() {
    requestAnimationFrame( this.run );

    if ( controlsEnabled === true ) {
      this.raycaster.ray.origin.copy( controls.getObject().position );

      let time = performance.now();
      let delta = ( time - prevTime ) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.y -= this.velocity.y * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.direction.x = Number( this.moveLeft )    - Number( this.moveRight );
      this.direction.y = Number( this.moveDown )    - Number( this.moveUp );
      this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
      this.direction.normalize(); // this ensures consistent movements in all directions

      if ( this.moveForward || this.moveBackward ) {
        this.velocity.z -= this.direction.z * 400.0 * delta;
      }
      if ( this.moveLeft || this.moveRight ) {
        this.velocity.x -= this.direction.x * 400.0 * delta;
      }
      if ( this.moveUp || this.moveDown ) {
        this.velocity.y -= this.direction.y * 400.0 * delta;
      }

      this.controls.getObject().translateX( this.velocity.x * delta );
      this.controls.getObject().translateY( this.velocity.y * delta );
      this.controls.getObject().translateZ( this.velocity.z * delta );

      this.prevTime = time;

    }
    this.renderer.render( scene, camera );
  }

}
