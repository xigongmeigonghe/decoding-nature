//Setup

const startTime = new Date();
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const planet = new Planet(300, new THREE.Vector3());
const player = new Player(planet);
const enemyGenerator = new EnemyGenerator(planet, player);

function run() {
	requestAnimationFrame( run );
	if (new Date() - startTime > 30000) this.isGameOver = true;
	else {
		player.run()
		enemyGenerator.run();
		camera.position.copy(player.pos).multiplyScalar(1.5)
		camera.up.copy(player.pos).add(player.velocity)
		camera.lookAt(player.pos.clone())
	}
	renderer.render( scene, camera );
}

run();
