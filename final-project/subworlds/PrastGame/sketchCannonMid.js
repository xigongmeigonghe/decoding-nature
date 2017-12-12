


var RobertGame = function(){


var ps;
var count=0;
var bounceAngle;
var cannonBar,target,cannonBase, castle, flame;
var lastCopyI=0;
//flocking vars
var flock;
var flick2;
var drawFlock=false;
var drawFlockOnce=true;
var drawTarget=true;

//path variables
var path;


//var castle hp
var castleHP=0;


//bacground
var backgroundImages=[];
var bgImageCount=0;
var bgImageScroll=0;

 this.gameFinished=false;
 this.preload =function(){
	// base=loadImage("cannonBaseMid.png");
	// bar=loadImage("cannonBarMid.png");
	// target=loadImage("castle2.png");
	// castle=loadImage("castle2.png");
	// bg=loadImage("bg.jpg")
	// flame= loadImage("flame.png");
	// rock= loadImage("rock.png");
}

this.setup = function()  {
	newPath();
  console.log("ender robert's game now")

	createCanvas(window.innerWidth, window.innerHeight);
	ps = new ParticleSystem(createVector(0,0));
	p = new Cannon();
	p.cannonSetup();
	p.cannonSetup();
    flock = new Flock();
    for(var i=0;i<3;i++){
    backgroundImages.push(bg);
    }


/*    var text = createP("Click Enter to launch the bullet, aim for the enemy castle");
	var text2 = createP(" Press R to reload the Cannon and shoot again. Use up and down arrow keys to change the cannon angle")
	var text3 = createP("A succesful shot will reveal a hidden clue")
*/
	/*text.position(10,25);
	text2.position(10,30);
	text3.position(10,45);*/

}

function draw(){this.run();}

this.run = function(){
	//path.display();
	//background(bg);
	print(this.gameFinished)
	if(!drawFlock){
	push();
	fill(255);
	bgImageCount++;
	bgImageScroll--;
	for(var i =0; i<3; i++){
		image(backgroundImages[i],bgImageScroll+width*i,0,width,height/2);
		lastCopyI=i;
	}

	pop();
	}
	if(drawFlock){
		image(backgroundImages[lastCopyI],bgImageScroll+width*i,0,width,height/2);
	}
	if(drawFlock && (flock.boids[1].position.x < 950 || flock.boids[1].position.x > 1330)){
	push();
	fill(255);
	image(bg,0,0,width,height/2);
	pop();
	}

	p.cannonSetup();
	p.barralSetup();
	image(castle,-240, height/2-110, 400, 200);



	//image(castle,-100, height/2-100, 400, 200);
	//health bar
	if(drawTarget==true){
	push()
	rectMode(CORNER)
	image(target, 900, height/2-120, 220,165);
	pop()
	//filter(GRAY);
	push();
	fill(255,0,0);
	rect(950, height/2+100, 100, 10);
	pop();


	push();
	fill(255);
	rect(950, height/2+100,100-castleHP,10);
	pop();
	}
	else{
		push()
		translate(900,height/2-80)
		image(rock, 0-50,0+50, 150,75)
		pop();
		//filter(GRAY)

		if(flock.boids[25].position.x>1340){
			this.gameFinished=true
		}

	}

	//cannon power
	push();
	fill(255);
	rect(10, height/2+100, 100, 10);
	pop();

	powerIncrease=powerIncrease+2;
	if(powerIncrease==100){
		powerIncrease=0;
	}
	push();
	fill(0,255,0);
	rect(10, height/2+100, powerIncrease, 10);
	pop();



	var gravityVector=createVector(0,grav);
	//var gravity = createVector(.001*cos(random(0,180)), -0.1*sin(random(0,180)));
	ps.applyForce(grav);


	if(shot){
		var dragForce=p.calculateDrag(.0003)
		var ag=p.calculateAnglVel();
		p.applyForce(gravityVector);
		p.applyForce(dragForce);
		p.applyForce(ag);
		p.update();

		if(p.cannonBallLocaiton.x<100){

		push();
		translate(35+50,height/2-60);
		rotate(angleBarraell);
		image(flame,0,0,50,50);
		pop();
		}

	}
	if(p.cannonBallLocaiton.y>height/2+10){
		/*var bounceForce=createVector(0,-1*p.cannonBallVelocity.y*1.7);
		p.applyForce(bounceForce);
		bounceAngle=true;*/
		p= new Cannon();
		shot=false;
	}
	if(p.cannonBallLocaiton.y>height/2+10){
		var frc=p.calculateFric();
		angleChange=angleChange-angleChangevalue;
		p.applyForce(frc);
	}

	if(p.cannonBallLocaiton.x>900-35 && p.cannonBallLocaiton.x<1120+35 && p.cannonBallLocaiton.y>height/2-120 && hit ==false){
		castleHP=castleHP+25;
		hit=true;
		shot=false;
		p= new Cannon();
	}

	if(castleHP==100 && drawFlockOnce){
	drawFlockOnce=false;
		for (var i = 0; i < 30; i++) {
			var b = new Boid(900, height/2+20);
			flock.addBoid(b);

		}
		drawFlock=true;
		drawTarget=false;
	}


	ps.run();
//ONLY DRAW THE SHIT WHEN YOU NEED TO
/*	if((!drawFlock && p.cannonBallLocaiton.x < 425) || angleBarraell != -0.6448214285714285){
	p.display();
	}

	if(!drawFlock && p.cannonBallLocaiton.x>800){
		flock.run();
	}*/
	p.display();

	if(drawFlock){

		// The boids follow the path
		for(var i=0;i<flock.boids.length;i++){
			flock.boids[i].follow(path);
		}
		flock.run();

	}
}



function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();

  path.addPoint(950,150);

  //M
  path.addPoint(952,300)
  path.addPoint(1050,150);
  path.addPoint(1150,300);
  path.addPoint(1250,150);
  path.addPoint(1330,300);
  path.addPoint(1437,height/2);

}

}

function keyPressed() {
	print("HERE")
	if (keyCode === 13 && shot==false) {
		var forceVector=createVector(map(powerIncrease,0,100,4,20)*cos(angleBarraell),map(powerIncrease,0,100,3,15)*sin(angleBarraell));
		p.applyForce(forceVector);
		shot=true;
		grav=.08;
		hit=false;
	}
	if(keyCode == UP_ARROW){
		angleBarraell=angleBarraell -(3.14)/48;
		angleBarraell=constrain(angleBarraell,-.6,-.2);
	}
	if(keyCode == DOWN_ARROW){
		angleBarraell=angleBarraell +(3.14)/48;
		angleBarraell=constrain(angleBarraell,-.6,-.2);
	}

}








class Cannon {
	constructor(){
		this.cannonLocation=createVector(30,height/2);
		this.cannonBallLocaiton=createVector(30,height/2-1);
		this.cannonBallVelocity=createVector(0,0);
		this.cannonBallAccleration=createVector(0,0);
		this.angle=0;
	};


	barralSetup(){
		push();
		translate(this.cannonLocation.x,this.cannonLocation.y);
		rotate(angleBarraell);
		image(bar,30,-15,40,40);
		pop();
		push();
		rectMode(CORNER);
		fill(0);
		//image(base,this.cannonLocation.x-50,this.cannonLocation.y-100,120,150);
		//filter(GRAY)
		pop();
	}
	cannonSetup(){
		push();
		//image(grass,0,0,width,height);
		fill(0);
		rect(0,height/2, width, height);
		pop();
	}

	applyForce(force){
		var f = force.copy();
		this.cannonBallAccleration.add(f);
	}

	update(){
		this.cannonBallVelocity.add(this.cannonBallAccleration);
		this.cannonBallLocaiton.add(this.cannonBallVelocity);
		this.angle-=angleChange*(this.cannonBallVelocity.x);
		this.cannonBallAccleration.mult(0);

	}

	display(){
		push();
		fill(255);
		rectMode(CENTER);
		translate(this.cannonBallLocaiton.x+35,this.cannonBallLocaiton.y-10);
		rotate(this.angle);
		if(this.cannonBallLocaiton.x>=130*cos(angleBarraell)){
			rect(0,0,10,10);}
			pop();
		}

		calculateDrag(c_) {
			var c=c_;
			var speed = this.cannonBallVelocity.mag();
			var dragMagnitude = c * speed * speed;
			var dragForce = this.cannonBallVelocity.copy();
			dragForce.mult(-1);
			dragForce.normalize();
			dragForce.mult(dragMagnitude);
			return dragForce;
		}

		calculateFric() {
			var c = .01;
			var normal = 1;
			var frictionMagnitude = c * normal;
			var frictionForce = p.cannonBallVelocity.copy();
			frictionForce.mult(-1);
			frictionForce.normalize();
			frictionForce.mult(frictionMagnitude);
			return frictionForce;
		}

		calculateAnglVel(){
			var c=.001;
			var speed = this.cannonBallVelocity.mag();
			var Magnitude = c * speed ;
			var Force = this.cannonBallVelocity.copy();

			Force.normalize();
			Force.mult(Magnitude);
			return Force;

		}
	}
