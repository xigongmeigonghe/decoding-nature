


var RobertGame = function(){

this.three = false;
this.ps;
this.count=0;
this.bounceAngle;
this.cannonBar,this.target,this.cannonBase, this.castle, this.flame;
 this.lastCopyI=0;
//this.flocking vars
 this.flock;
 this.flock2;
 this.drawflock=false;
 this.drawflockOnce=true;
this.drawtarget=true;

//this.path variables
 this.path;


//var this.castle hp
 this.castleHP=0;


//bacground
 this.backgroundImages=[];
 this.bgImagecount=0;
 this.bgImageScroll=0;

 this.gameFinished=false;
 // this.preload =function(){
	// base=loadImage("this.cannonBaseMid.png");
	// bar=loadImage("this.cannonBarMid.png");
	// this.target=loadImage("this.castle2.png");
	// this.castle=loadImage("this.castle2.png");
	// bg=loadImage("bg.jpg")
	// this.flame= loadImage("this.flame.png");
	// rock= loadImage("rock.png");
// }

this.setup = function()  {
	this.newpath();
  console.log("ender robert's game now")

	createCanvas(window.innerWidth,window.innerHeight);
	this.ps = new ParticleSystem(createVector(0,0));
	p = new Cannon();
	p.cannonSetup();
	p.cannonSetup();
    this.flock = new Flock();
    for(var i=0;i<3;i++){
    this.backgroundImages.push(bg);
    }


/*    var text = createP("Click Enter to launch the bullet, aim for the enemy this.castle");
	var text2 = createP(" Press R to reload the Cannon and shoot again. Use up and down arrow keys to change the cannon angle")
	var text3 = createP("A succesful shot will reveal a hidden clue")
*/
	/*text.position(10,25);
	text2.position(10,30);
	text3.position(10,45);*/

}
//
// function draw(){this.run();}

this.run = function(){
	//this.path.display();
	//background(bg);
	print(this.gameFinished)
	if(!this.drawflock){
	push();
	fill(255);
	this.bgImagecount++;
	this.bgImageScroll--;
	for(var i =0; i<3; i++){
		image(this.backgroundImages[i],this.bgImageScroll+width*i,height/4,width,height/2);
		this.lastCopyI=i;
	}

	pop();
	}
	if(this.drawflock){
		image(this.backgroundImages[this.lastCopyI],this.bgImageScroll+width*i,0,width,height/2);
	}
	if(this.drawflock && (this.flock.boids[1].position.x < 950 || this.flock.boids[1].position.x > 1330)){
	push();
	fill(255);
	image(bg,0,0,width,height/2);
	pop();
	}

	p.cannonSetup();
	p.barralSetup();
	image(castle,-width/10, height/2-height/24, 400, 200);



	//image(this.castle,-100, height/2-100, 400, 200);
	//health bar
	if(this.drawtarget==true){
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
	rect(950, height/2+100,100-this.castleHP,10);
	pop();
	}
	else{
		push()
		translate(900,height/2-80)
		image(rock, 0-50,0+50, 150,75)
		pop();
		//filter(GRAY)

		if(this.flock.boids[25].position.x>1340){
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
	this.ps.applyForce(grav);


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
		this.bounceAngle=true;*/
		p= new Cannon();
		shot=false;
	}
	if(p.cannonBallLocaiton.y>height/2+10){
		var frc=p.calculateFric();
		angleChange=angleChange-angleChangevalue;
		p.applyForce(frc);
	}

	if(p.cannonBallLocaiton.x>900-35 && p.cannonBallLocaiton.x<1120+35 && p.cannonBallLocaiton.y>height/2-120 && hit ==false){
		this.castleHP=this.castleHP+25;
		hit=true;
		shot=false;
		p= new Cannon();
	}

	if(this.castleHP==100 && this.drawflockOnce){
	this.drawflockOnce=false;
		for (var i = 0; i < 30; i++) {
			var b = new Boid(900, height/2+20);
			this.flock.addBoid(b);

		}
		this.drawflock=true;
		this.drawtarget=false;
	}


	this.ps.run();
//ONLY DRAW THE SHIT WHEN YOU NEED TO
/*	if((!this.drawflock && p.cannonBallLocaiton.x < 425) || angleBarraell != -0.6448214285714285){
	p.display();
	}

	if(!this.drawflock && p.cannonBallLocaiton.x>800){
		this.flock.run();
	}*/
	p.display();

	if(this.drawflock){

		// The boids follow the this.path
		for(var i=0;i<this.flock.boids.length;i++){
			this.flock.boids[i].follow(this.path);
		}
		this.flock.run();

	}
}



this.newpath = function() {
  // A this.path is a series of connected points
  // A more sophisticated this.path might be a curve
  this.path = new Path();

  this.path.addPoint(950,150);

  //M
  this.path.addPoint(952,300)
  this.path.addPoint(1050,150);
  this.path.addPoint(1150,300);
  this.path.addPoint(1250,150);
  this.path.addPoint(1330,300);
  this.path.addPoint(1437,height/2);

}

this.keyPressed=function(keyCode) {
	// print("HERE")
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
