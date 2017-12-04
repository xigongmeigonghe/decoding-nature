//Main World -- Decoding Nature Fall 2017
//              Zane Mountcastle & Nick White

/* Constants */
var WORLD_WIDTH = 3000;
var WORLD_HEIGHT = null;
var portName = '/dev/cu.usbmodem1411';
var serial; // variable to hold an instance of the serialport library
var inData;
var worlds = [];

/* State */
var aPressed = false;
var subWorldInProgress = null; // Game being played
var isSubWorldInProgress = false; // Is the game active


function setup() {
  createCanvas(WORLD_WIDTH, 700);

  WORLD_HEIGHT = height-250;

  m = new Mover("media/run1K.png", "media/run2K.png", "media/run3K.png", "media/idleK.png", WORLD_HEIGHT);

  /* Set up the serial port */
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  var options = {baudrate: 115200};
  serial.list();                      // list the serial ports
  serial.open(portName,options);              // open a serial port

  /* Set up the world entrypoints in the main world */

  JonahWorld = new World(500, WORLD_HEIGHT, 300,
    "You've reached Jonah's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");
  YufeiWorld = new World(1000, WORLD_HEIGHT, 300,
    "You've reached Yufei's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");
  LuizeWorld = new World(1500, WORLD_HEIGHT, 300,
    "You've reached Luize's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");
  XiuaiWorld = new World(2000, WORLD_HEIGHT, 300,
      "You've reached Xiuai's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");
  RobertWorld = new World(2500, WORLD_HEIGHT, 300,
      "You've reached Robert's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");
  KateWorld = new World(3000, WORLD_HEIGHT, 300,
    "You've reached Kate's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");
  PeterWorld = new World(3500, WORLD_HEIGHT, 300,
      "You've reached Peter's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png");

  worlds = [
    JonahWorld,
    YufeiWorld,
    LuizeWorld,
    XiuaiWorld,
    RobertWorld,
    KateWorld,
    PeterWorld
  ];

}

function draw() {
  if (isSubWorldInProgress) { // Update and run the game
    subWorldInProgress.run()
    subWorldInProgress.display();

    if (subWorldInProgress.isFinished) {
      isSubWorldInProgress = false; // Continue on in the main world
    }

  } else {
    background(255);
    fill(0);

    //ground of world
    rect(0, WORLD_HEIGHT, WORLD_WIDTH, 500);

    if (m.position.x > screen.width/2){ // Move window with character
      window.scrollTo(m.position.x-screen.width/2, 0);
    }

    for (var i = 0; i < worlds.length; i++) {
      const world = worlds[i];

      world.display();

      if (m.position.x > world.position.x && m.position.x < world.position.x+world.width) {
        world.textBox.display();
        if (aPressed) {
          subWorldInProgress = world.game;
          isSubWorldInProgress = true;
        }
      }
    }

    if (inData > 50 || keyIsDown(RIGHT_ARROW)){ // Move right and display
      m.move(5);
    } else if (inData < 50 || keyIsDown(LEFT_ARROW)) { // Move left and display
      m.move(-5);
    } else { // And display
      m.display();
    }
  }

}

function keyPressed() {
  if (key == 'a' || key == 'A') aPressed = true;
}

function keyReleased() {
  if (key == 'a' || key == 'A') aPressed = false;
}

// Stop arrow keys from moving window
window.addEventListener("keydown", function(e) {
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
   // Display the list the console:
   print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

//
// //creating the trees for the forest
// function createCastle(){
//
//   rect(1050,100,30,30);
//   rect(1090,100,30,30);
//   rect(1130,100,30,30);
//   for(var i=0;i<30*7;i+=30){
//     rect(1060,110+i,30,30);
//     rect(1090,110+i,30,30);
//     rect(1120,110+i,30,30);
//   }
//
//   for(var j=0;j<30*7;j+=30){
//     rect(1150+j,160,30,30);
//     rect(1150+j,180,30,30);
//     rect(1150+j,200,30,30);
//     if(j!=4*30 && j!=3*30 && j!=2*30){
//       rect(1150+j,230,30,30);
//       rect(1150+j,260,30,30);
//       rect(1150+j,290,30,30);
//     }
//
//     // rect(150+j,200+j,30,30);
//   }
//
//   rect(1350,100,30,30);
//   rect(1390,100,30,30);
//   rect(1430,100,30,30);
//   for(var i=0;i<30*7;i+=30){
//     rect(1360,110+i,30,30);
//     rect(1390,110+i,30,30);
//     rect(1420,110+i,30,30);
//   }
//
//
//
//
// }
