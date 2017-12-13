function Pacman(x, y, img) {
  this.x = x;
  this.y = y;
  this.radius = YufeiWorld.game.brickSize/2;
  this.img = img;
  this.velocity = YufeiWorld.game.brickSize;
  this.direction = 0;
  this.prevDirection;
  this.frame = 0;
  this.isHeld = 1;

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


  this.eats = function(food) {
    var distance = dist(this.x, this.y, food.x, food.y);
    if (distance < this.radius + food.radius) {
      return true;
    } else {
      return false;
    }
  };

  this.collision = function(enemy) {
    var distance = dist(this.x, this.y, enemy.x, enemy.y);
    if (distance < this.radius) {
      return true;
    } else {
      return false;
    }
  };

  this.brickcollision = function(enemy) {

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
    return direction;
  };

  this.show = function() {
    //ellipse(this.x, this.y, this.radius, this.radius);
    imageMode(CENTER);
    image(this.img,this.x,this.y, YufeiWorld.game.brickSize, YufeiWorld.game.brickSize);
    //fill(0);
  };
}
