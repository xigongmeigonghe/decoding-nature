var dieOnce=false;

class PeterGame {
  constructor() {
    this.camera;
    this.scene;
    this.renderer;
    this.controls;
    this.three = true;

    this.path;
    this.target;

    this.raycaster;

    this.blocker = document.getElementById( 'blocker' );
    this.instructions = document.getElementById( 'instructions' );

    let havePointerLock = 'pointerLockElement' in document ||
                          'mozPointerLockElement' in document ||
                          'webkitPointerLockElement' in document;

    if ( havePointerLock ) {
      let element = document.body;

      let pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element ||
             document.mozPointerLockElement === element ||
             document.webkitPointerLockElement === element ) {
          this.controlsEnabled = true;
          this.controls.enabled = true;
          this.blocker.style.display = 'none';
        } else {
          this.controls.enabled = false;
          this.blocker.style.display = 'block';
          this.instructions.style.display = '';
        }
      };

      let pointerlockerror = function ( event ) {
        this.instructions.style.display = '';
      };

      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

      this.instructions.addEventListener( 'click', function ( event ) {
        this.instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock ||
                                     element.mozRequestPointerLock ||
                                     element.webkitRequestPointerLock;
        element.requestPointerLock();
      }, false );
    } else {
      this.instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }

    this.controlsEnabled = true; //false;

    peterMoveForward = 0;
    peterMoveBackwards = 0;
    peterMoveLeft = 0;
    peterMoveRight = 0;
    peterMoveUp = 0;
    peterMoveDown = 0;

    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    this.done = false;
    this.isGameOver = false;
    this.isDead = false;
  }

  setup() {
    var p5_canvas = document.getElementById("defaultCanvas0");
    p5_canvas.parentNode.removeChild(p5_canvas);
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 0;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x111111 );
    this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    let light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    this.scene.add( light );

    this.controls = new THREE.PointerLockControls( this.camera );
    this.scene.add( this.controls.getObject() );

    this.path = new PeterPath( this.scene );

    // create the stars fields
    for ( let i = 0; i < 10; i++ ) { //original 25
      let starField = new StarField( this.scene );
      peterStarFields.push( starField );
    }



    this.target = new Target( this.scene );

    let onKeyUp = function ( event ) {
      switch( event.keyCode ) {
        case 87: // w: moves up
          peterMoveUp = 0;
          break;

        case 83: // s: moves down
          peterMoveDown = 0;
          break;

        case 38: // up: moves forward
          peterMoveForward = 0;
          break;

        case 37: // left
          peterMoveLeft = 0;
          break;

        case 40: // down: moves backward
          peterMoveBackwards = 0;
          break;

        case 39: // right
          peterMoveRight = 0;
          break;
      }

    };

    let onKeyDown = function ( event ) {

      switch ( event.keyCode ) {
        case 87: // w
          peterMoveUp = 0.1;
          break;

        case 83: // s
          peterMoveDown = 0.1;
          break;

        case 38: // up: moves forward
          peterMoveForward = 0.1;
          break;

        case 37: // left
          peterMoveLeft = 0.1;
          break;

        case 40: // down
          peterMoveBackwards = 0.1;
          break;

        case 39: // right
          peterMoveRight = 0.1;
          break;
      }
      // console.log("Down fwd: " + peterMoveForward);
    };

    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'keydown', onKeyDown, false );


    this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, -1 ), 0, 10 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    // window.addEventListener( 'resize', this.onWindowResize, false );

  }

  // onWindowResize() {
  //   this.camera.aspect = window.innerWidth / window.innerHeight;
  //   this.camera.updateProjectionMatrix();
  //   this.renderer.setSize( window.innerWidth, window.innerHeight );
  // }

  restart() {
    console.log("restart");
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.set(0, 0, 0);

    let light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    this.scene.add( light );

    this.controls = new THREE.PointerLockControls( this.camera );
    this.controls.getObject().position.set(0, 0, 0);
    this.scene.add( this.controls.getObject() );

    this.path = new PeterPath( this.scene );

    // create the stars fields
    for ( let i = 0; i < 1; i++ ) { //original 25
      let starField = new StarField( this.scene );
      peterStarFields.push( starField );
    }

    this.target = new Target( this.scene );

    this.velocity = new THREE.Vector3(0, 0, 0);
  }

  run() {
    requestAnimationFrame( this.run.bind(this) );
    // console.log(this.camera.position.z+" "+this.controls.getObject().position.z);
    if ( this.controlsEnabled === true ) {

      let time = performance.now();
      let delta = ( time - this.prevTime ) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.y -= this.velocity.y * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.direction.x =  peterMoveLeft     -  peterMoveRight ;
      this.direction.y =  peterMoveDown     - peterMoveUp ;

      this.direction.z = peterMoveForward  - peterMoveBackwards ;
      // console.log("fwd: " + peterMoveForward + " + back: " + peterMoveBackwards, " = ", this.direction.z);
      this.direction.normalize(); // this ensures consistent this.movements in all directions

      // if ( peterMoveForward == 1 || peterMoveBackwards  == 1) {
        this.velocity.z -= this.direction.z * 200.0 * delta;
      // }
      if ( peterMoveLeft || peterMoveRight ) {
        this.velocity.x -= this.direction.x * 200.0 * delta;
      }
      if ( peterMoveUp || peterMoveDown ) {
        this.velocity.y -= this.direction.y * 200.0 * delta;
      }
      // this.velocity.y -= 100;

      this.controls.getObject().translateX( this.velocity.x * delta );
      this.controls.getObject().translateY( this.velocity.y * delta );
      this.controls.getObject().translateZ( this.velocity.z * delta );

      // console.log(peterStarFields)
      for ( let i = 0; i < peterStarFields.length; i++ ) {
        // console.log("1: "+this.isDead);

        this.isDead = peterStarFields[i].processPlayerDistance( this.controls.getObject() ||
                      this.path.playerOutOfBounds( this.controls.getObject() ));
                      // console.log("dead "+this.isDead);

        if ( this.isDead ) {
          // console.log("3: "+this.isDead);
          while(this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
          }
          // console.log("chilrden: "+this.scene.children.length);
          this.restart();
          // this.isDead = false;
          dieOnce=true;
          // console.log("4: "+this.isDead);
        };
      }

      this.done = this.target.isGameOver( this.controls.getObject() );
      if ( this.done ) {
        // console.log("Game Done");
        this.controls.enabled = false;
        this.blocker.style.display = 'block';
        this.instructions.style.display = '';
        this.instructions.innerHTML = "Your last clue is: E";
        // document.body.removeChild(scoreEl);
        document.body.removeChild(this.renderer.domElement);
        this.isGameOver = true;
      }

      this.prevTime = time;

    }
    this.renderer.render( this.scene, this.camera );
  }

}
