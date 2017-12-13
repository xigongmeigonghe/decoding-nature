var KateLaser = function(x,y) {
	// this.position = createVector(this.position.x, this.position.y);
	this.position = createVector(this.x,this.y);
	this.velocity = createVector();
	this.startingPoint=80;
	this.lineLength=30;
	this.laserPosition=0;
	this.cartX=x;
	this.cartY=y;
	this.x1=0
	this.y1=0;
	this.x2=0;
	this.y2=0;

	this.update = function(){
		this.position.add(this.velocity);
		this.render();
	}

	this.render = function(){
  		 // ellipse(x, y, 20, 20);	
  		 this.x1= width/2 + this.cartX*(this.startingPoint+this.laserPosition);
		 this.y1= height /2 +this.cartY*(this.startingPoint+this.laserPosition);
		 this.x2= width/2 + this.cartX*(this.startingPoint+this.laserPosition+this.lineLength);
		 this.y2= height /2 +this.cartY*(this.startingPoint+this.laserPosition+this.lineLength);
		  stroke(255);
		  strokeWeight(4);
		 line(this.x1,this.y1,this.x2,this.y2);
			ellipse(this.x2,this.y2,5,5)
		

		 this.laserPosition +=10;
		 noStroke();


	// this.isDead = function(){
 //    if (this.lineLength < innerWidth && this.lineLength > innerWidth) {
     
 //      console.log("OFF SCREEN");
 //       return true;
 //    } else {
 //      return false;
 //    }
	//   }

	// if (this.lineLength.isDead()) { 
	//       this.lineLength.splice(i, 1);
	//       }
  
}   
	this.hits = function(particle){

	 	var endPoint = createVector(this.x2, this.y2)

	 	var d = p5.Vector.dist(particle.position, endPoint);
	 	// 
	    // var distance = p5.Vector.sub(laser.position, this.position);
	    // var length = distance.mag();
	    if (d < 30 && particle.position.x>0&&particle.position.x<width&&particle.position.y>0&&particle.position.y<height) {
	    	particle.isShot=true;
	    	// textSize(35);
	    	// text("One",10,30)
	      // return true;
	      // console.log('hit');
	    } else {
	       // return false;

	     }
	 }
		
		
		// // point(this.position.x, this.position.y);
		// point(this.x,this.y);
		// console.log("laser")
}
