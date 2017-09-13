'use strict';

let swarm = null;
const nBees = 20;

class Swarm extends Array {
    constructor(){
        super();
        this.position = createVector(0,0);
        this.noff = createVector(random(100), random(100));
    }

    update(){
        this.position.x = map(noise(this.noff.x),0,1,0,width);
        this.position.y = map(noise(this.noff.y),0,1,0,height);

        this.noff.add(0.003,0.003,0);

        this.forEach(function(bee) {
            bee.update(mouseX, mouseY);
        })
    }

    display() {
        this.forEach(function(bee) {
            bee.display();
        })
    }
}

class Bee {
    constructor() {
        this.position = createVector(random(width),random(height));
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.lastMouseX = createVector(0,0);
        this.lastPosition = createVector(0,0);
        this.noff = createVector(random(100), random(100));
    }

    update(mouseX, mouseY) {
        let mouse = createVector(mouseX, mouseY);
        if (mouseX == this.lastMouseX) { // Mouse stopped: move normally

            const newX = map(noise(this.noff.x),0,1,swarm.position.x-width/5,swarm.position.x+width/5);
            const newY = map(noise(this.noff.y),0,1,swarm.position.y-height/5,swarm.position.y+height/5);
            const newPos = createVector(newX, newY);

            newPos.sub(this.position);
            newPos.mult(0.1);
            this.acceleration = newPos;
            this.velocity.add(this.acceleration);
            this.velocity.limit(7);

            this.position.add(this.velocity);

            this.noff.add(0.018,0.018,0);

        } else { // Mouse moving: run away!
            mouse.sub(this.position);
            mouse.mult(-0.5);
            this.acceleration = mouse;
            this.velocity.add(this.acceleration);
            this.velocity.limit(7);

            // Hide just off screen
            if (this.position.x >= width+10 && this.velocity.x >= 0)
                this.velocity.x *= -1;
            else if (this.position.x <= -10 && this.velocity.x <= 0)
                this.velocity.x *= -1;
            else if (this.position.y >= height+10 && this.velocity.y >= 0)
                this.velocity.y *= -1;
            else if (this.position.y <= -10 && this.velocity.y <= 0)
                this.velocity.y *= -1;

            this.position.add(this.velocity);

        }
        this.lastMouseX = mouseX;
    }

    display() {
        stroke(255,255,100);
        strokeWeight(2);
        noFill();
        ellipse(this.position.x, this.position.y, 7, 7);
    }
}

function init() {
    swarm = new Swarm();
    for (let i = 0; i < nBees; i++) {
        swarm.push(new Bee());
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    init();
}

function draw() {
    background(150);
    swarm.update(mouseX, mouseY);
    swarm.display();
}
