function Ghost(x,y,img){
  this.x = x;
  this.y = y;
  this.radius = YufeiWorld.game.brickSize/2;
  this.img = img;
  this.velocity = YufeiWorld.game.brickSize;
  this.movement = false;
  this.direction = 1;

  this.show = function(){
    imageMode(CENTER);
    image(this.img,this.x,this.y,YufeiWorld.game.brickSize,YufeiWorld.game.brickSize);
  }

  this.move = function(d) {

    this.prevDirection = d;
    if (d === 0) {
      this.x += this.velocity;
      this.direction = d;
    }
    if (d === 1) {
      this.y += this.velocity;
      this.direction = d;
    }
    if (d === 2) {
      this.x -= this.velocity;
      this.direction = d;
    }
    if (d === 3) {
      this.y -= this.velocity;
      this.direction = d;
    }


  };

  // this.move = function(direction){
    // var newDirection = this.direction;
    //   newDirection = floor(random(4));
    //   if(this.movement === true) {
    //     newDirection = this.direction;
    //   }
    //   var lastX = this.x;
    //   var lastY = this.y;
      // if(newDirection === 0) {
      //   this.x += this.velocity;
      // }
      // if(newDirection === 1) {
      //   this.x -= this.velocity;
      // }
      // if(newDirection === 2) {
      //   this.y -= this.velocity;
      // }
      // if(newDirection === 3) {
      //   this.y += this.velocity;
      // }
      // for(var i = 0; i < bricks.length; i++){
      //   if(this.collision(bricks[i])){
      //     this.x = lastX;
      //     this.y = lastY;
      //     this.movement = false;
      //     //this.move(bricks);
      //   }
      // }
      // this.movement = true;
      // this.direction = newDirection;
      // if(this.x < 32 * 9) {

      //     this.direction = 0;
      // }
      // else if (this.x > 32 * 30) {
      //     this.direction = 1;
      // }

  // }

  this.brickCollision = function(enemy) {
    var position = createVector(this.x, this.y);
    var vectorBetween= createVector();
    vectorBetween.x = enemy.x - position.x;
    vectorBetween.y = enemy.y - position.y;
    var distance = vectorBetween.mag();
    var direction = this.direction;
    if (distance < this.radius + enemy.radius * 2) {
          switch(direction) {
        case 0:

          if (vectorBetween.x > 0 && enemy.y == position.y) {
            //move up or down
            var r = random(1);
            if (r < 0.5) {
              direction = 1;
            } else {
              direction = 3;
            }
          }
          break;
        case 1:
          if (vectorBetween.y > 0 && enemy.x == position.x) {
            //move right
              direction = 0;
          }
          break;
        case 3:
          if (vectorBetween.y < 0 && enemy.x == position.x) {
            //move right
              direction = 0;
          }
          break;
        }

      //}
    }

    if(this.x < YufeiWorld.game.brickSize * 9) {
      direction = 0;
    }
    else if (this.x > YufeiWorld.game.brickSize * 31) {
      direction = 2;
    }

    if (this.y == YufeiWorld.game.brickSize*5 && this.x == YufeiWorld.game.brickSize*13) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 3;
      }
    }

    if (this.y == YufeiWorld.game.brickSize*5 && this.x == YufeiWorld.game.brickSize*29) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 1;
      }
    }

    if (this.y == YufeiWorld.game.brickSize && this.x == YufeiWorld.game.brickSize*19) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 1;
      };
    }

    if (this.y == YufeiWorld.game.brickSize*15 && this.x == YufeiWorld.game.brickSize*13) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 1;
      };
    }

    if (this.y == YufeiWorld.game.brickSize*15 && this.x == YufeiWorld.game.brickSize*15) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 3;
      };
    }

    if (this.y == YufeiWorld.game.brickSize*15 && this.x == YufeiWorld.game.brickSize*27) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 1;
      };
    }

    if (this.y == YufeiWorld.game.brickSize*15 && this.x == YufeiWorld.game.brickSize*25) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 3;
      };
    }

    if (this.y == YufeiWorld.game.brickSize*19 && this.x == YufeiWorld.game.brickSize*21) {
      var a = random(1);
      if (a < 0.3) {
        direction = 0;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 3;
      }
    }

    if (this.y == YufeiWorld.game.brickSize*9 && this.x == YufeiWorld.game.brickSize*25) {
      var a = random(1);
      if (a < 0.3) {
        direction = 1;
      } else if (0.3 <= a < 0.6) {
        direction = 2;
      } else {
        direction = 3;
      };
    }

    return direction;

  }

  this.collision = function(obj){
    if(this.x == obj.x && this.y == obj.y) {
      return true;
    } else {
      return false;
    }
  }

}
