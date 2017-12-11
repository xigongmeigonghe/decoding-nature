//Main World -- Decoding Nature Fall 2017
//              Zane Mountcastle & Nick White

/* Constants */
const WORLD_WIDTH = 7500;
let WORLD_HEIGHT = null; // Set on setup()
const portName = '/dev/cu.usbmodem1411';
let serial; // variable to hold an instance of the serialport library
let inData;
let worlds = [];

/* State */
let aPressed = false;
let subWorldInProgress = null; // Game being played
let letterInProgress = null;
let isSubWorldInProgress = false; // Is the game active
let firstFrameInSubworld = false;
let firstFrameInMainWorld = false;
let lettersFound = [];

var dataInX = 0;
var dataInY = 0;


function setup() {
  createCanvas(WORLD_WIDTH, window.innerHeight);

  WORLD_HEIGHT = height-200;

  m = new Mover("media/run1K.png", "media/run2K.png", "media/run3K.png", "media/run4K.png", "media/run2K.png", WORLD_HEIGHT);

  /* Set up the serial port */
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);           // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  let options = {baudrate: 115200};
  serial.list();                      // list the serial ports
  serial.open(portName,options);      // open a serial port

  /* Set up the world entrypoints in the main world */

  StartHome = new World(100, WORLD_HEIGHT, 400, 270,
     "Welcome to the Decoding Nature world!\nCollect the passcode letters in each\nworld to complete the game.",
    new Game(), "media/house.png", '');

  JonahWorld = new World(900, WORLD_HEIGHT, 250, 200,
    "You've reached Jonah's world!\nPress 'a' to enter.",
    new Game(), "media/atom.png", "a");
  YufeiWorld = new World(1900, WORLD_HEIGHT, 200,200,
    "You've reached Yufei's world!\nPress 'a' to enter.",
    new Game(), "media/microscope.png", 'b');
  LuizeWorld = new World(2900, WORLD_HEIGHT, 250, 200,
    "You've reached Luize's world!\nPress 'a' to enter.",
    new Game(), "media/bug.png", 'c');
  XiuaiWorld = new World(3900, WORLD_HEIGHT, 300,200,
      "You've reached Xiuai's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png", 'd');
  RobertWorld = new World(4960, WORLD_HEIGHT, 300,200,
      "You've reached Robert's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png", 'e');
  KateWorld = new World(5900, WORLD_HEIGHT, 300,400,
    "You've reached Kate's world!\nPress 'a' to enter.",
    new Game(), "media/rocket.png", 'f');
  PeterWorld = new World(6900, WORLD_HEIGHT, 300,200,
      "You've reached Peter's world!\nPress 'a' to enter.",
    new Game(), "media/tree.png", 'g');

  EndHome = new World(8400, WORLD_HEIGHT, 400, 300,
     "End game..", new Game(), "media/house.png", '');

  worlds = [
    StartHome,
    JonahWorld,
    YufeiWorld,
    LuizeWorld,
    XiuaiWorld,
    RobertWorld,
    KateWorld,
    PeterWorld,
    EndHome
  ];

}

function draw() {
  if (isSubWorldInProgress) { // Update and run the game
    if (firstFrameInSubworld) { // Execute on transition from main world
      subWorldInProgress.setup();
      firstFrameInSubworld = false;
      window.scrollTo(0, 0);
    }

    subWorldInProgress.run();

    if (subWorldInProgress.isGameOver) {
      lettersFound.push(letterInProgress);
      isSubWorldInProgress = false; // Continue on in the main world
      firstFrameInMainWorld = true; // Indicate transition to main world
    }

  } else {
    if (firstFrameInMainWorld) { // Execute on transition from subworld
      createCanvas(WORLD_WIDTH, screen.height); // Reset to main world canvas
      firstFrameInMainWorld = false; // Done with transition
    }

    background(255);
    fill(0);

    //ground of world
    rect(0, WORLD_HEIGHT, WORLD_WIDTH, 500);

    // Passcode box
    fill(255);
    rect(m.position.x-150, WORLD_HEIGHT+40, 300, 100);

    textSize(20);
    fill(0);
    text("Letters Collected:", m.position.x-130, WORLD_HEIGHT+70);

    for (let i = 0; i < lettersFound.length; i++) {
      textSize(20);
      fill(0);
      text(lettersFound[i]+", ", m.position.x-130+i*20, WORLD_HEIGHT+100);
    }

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
          letterInProgress = world.letter;
          isSubWorldInProgress = true; // True until `isFinished` is set to true in game
          firstFrameInSubworld = true; // Indicate transition to subworld
        }
      }
    }

      // if(dataInX){
      //
      // }
      if (dataInX >750  || keyIsDown(RIGHT_ARROW)){ // Move right and display
        m.move(5);
      }
      else if (dataInX < 400 || keyIsDown(LEFT_ARROW)) { // Move left and display
        m.move(-5);
      }
      else{
        m.display();
      }


     // if (dataInY > 520 || keyIsDown(UP_ARROW)) { // Move left and display
     //    m.moveY(-5);
     //  } else if (dataInY < 520 || keyIsDown(DOWN_ARROW)) { // Move left and display
     //    m.moveY(5);
     //  }


  }

}

function keyPressed() {
  if (key == 'a' || key == 'A') aPressed = true;
}

function keyReleased() {
  if (key == 'a' || key == 'A') aPressed = false;
  if (isSubWorldInProgress) {
    subWorldInProgress.keyPressed(key);
  }
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
  // inData = Number(serial.readStringUntil('\n'));

    // read the serial buffer:
   var myString = serial.readStringUntil('\n');
 // if you got any bytes other than the linefeed:
   console.log("myString1: " + myString)
 // split the string at the commas
   myString = trim(myString);
   // console.log("myString: " + myString)
   // split the string at the commas

   // and convert the sections into integers:
   var sensors = int(split(myString, ','));
   if(!isNaN(sensors[0]) ){
     dataInX = sensors[0];
     dataInY = sensors[1];
  }
  // console.log("dataX: "+ dataInX + " dataY: " + dataInY);
   // print out the values you got:
   // for (var sensorNum = 0; sensorNum < sensors.length; sensorNum++) {
     // console.log("Sensor " + sensorNum + ": " + sensors[sensorNum] + "\t");

   // add a linefeed after all the sensor values are printed:
   // println();
   // if (sensors.length > 1) {
   //   xpos = map(sensors[0], 0,1023,0,width);
   //   ypos = map(sensors[1], 0,1023,0,height);
   //   fgcolor = sensors[2];
   // }
   // send a byte to ask for more data:
   serial.write("A");
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
