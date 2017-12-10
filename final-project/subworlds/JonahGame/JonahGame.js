/************************************ GAME.JS **********************************
 *
 * This class demonstrates the standard API that the Main World depends upon.
 * setup() - set up the sketch, including the canvas
 * run() - do any application logic
 *
 *
 ********************************* INSTRUCTIONS ********************************
 *
 * To set up this class for your game follow the steps below:
 * 1) Change the class name to YournameGame (e.g. ZaneGame)
 * 2) Change the file name to match (e.g. ZaneGame.js)
 * 3) Put any set up code you need in the setup() method
 * 4) Put any code that should be called on every frame in the run() method
 * 5) Test in Firefox using the provided "index.html" file.
 * 6) Zip full "Game" folder and put the zip file in the following Google Drive
 *    folder: https://drive.google.com/drive/folders/1Ks5JdCDBZVofBWiKR4Qd2XQbeKFo05ig?usp=sharing.
 *    On MacOS you can zip a folder by right clicking on the folder and selecting
 *    "Compress <FolderName>".
 *
 ******************************************************************************/

var JonahGame = function() {

  /* Change this.isGameOver to true when the game is complete */
  this.isGameOver= false;
  /*
   * This method is called once when the game is initialized. Set up the canvas here.
   * Remember that the canvas that the game is rendered on is NOT a laptop screen.
   * The projected canvas will be much bigger so don't rely on you laptop's
   * screen dimensions.
   */
	var scene;
	var camera;
	var renderer;

	var planet;
	var player;
	var enemyGenerator;

	var gameState = {
		playerHasLost: false,
		startTime: new Date(),
		frameCount: 0,
	}

  this.setup = function() {
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xFFFFFF );
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		planet = new Planet(scene,300, new THREE.Vector3());
		player = new Player(scene, planet);
		enemyGenerator = new EnemyGenerator(gameState, scene, planet, player);

		document.addEventListener("keydown", (event) => player.handleKeys(event.code, "DOWN"), false);
		document.addEventListener("keyup", (event) => player.handleKeys(event.code, "UP"), false);

  }

	this.restart = function() {
		while(scene.children.length > 0){ scene.remove(scene.children[0]); }
		gameState.userHasLost = false;
		gameState.startTime = new Date();
		gameState.frameCount = 0;
		planet = new Planet(scene,300, new THREE.Vector3());
		player = new Player(scene, planet);
		enemyGenerator = new EnemyGenerator(gameState, scene, planet, player);
	}

  /*
   * This method is called once for every frame. Do any logic required for the
   * game in this function.
   *
   * IMPORTANT: You MUST set "this.isGameOver" to true when the game is over.
   */
  this.run = function() {
		if (gameState.userHasLost) this.restart();
    requestAnimationFrame( this.run.bind(this) );
    if (new Date() - gameState.startTime > 30000) this.isGameOver = true;
    else {
			gameState.frameCount+=1;
      player.run()
      enemyGenerator.run();

      camera.position.copy(player.pos).multiplyScalar(1.5)
      camera.up.copy(player.pos).add(player.velocity)
      camera.lookAt(player.pos.clone())
    }
    renderer.render( scene, camera );
  }
}
const game = new JonahGame();
game.setup();
game.run();
