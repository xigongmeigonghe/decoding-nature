function Defender(){
	// a = 0;

	var go=0;//bool for defender to determine if


	this.show = function() {
	  this.x = width /2 +cos(a) *80;
	  this.y = height /2 +sin(a) *80;

	  ellipse(x, y, 20, 20);		//this is the defender

	  // a = a + 0.1*go;		
	}

	  function keyPressed() { //how to move the defenfer around the planet
		if (keyCode == 39){
			go = -1;
		}else if(keyCode == 37){
			go = 1;
		}

	}

	function keyReleased(){
		go = 0;
		

	}
}