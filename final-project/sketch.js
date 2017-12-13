//Main World -- Decoding Nature Fall 2017
//              Zane Mountcastle & Nick White

/* Constants */
const WORLD_WIDTH = 7900;
let WORLD_HEIGHT = null; // Set on setup()
const portName = '/dev/cu.usbmodem1411';
let serial; // variable to hold an instance of the serialport library
let inData;
let worlds = [];

/* State */
let aPressed = false;
let subWorldInProgress = null; // Game being played
let isSubWorldInProgress = false; // Is the game active
let firstFrameInSubworld = false;
let firstFrameInMainWorld = false;

var dataInX = 0;
var dataInY = 0;
var microscope;
var jar;
var bug;
// var gif;

//Robert's vars
var angleBarraell=-(3.14)/7;
var shot=false;
//power level cannon
var powerIncrease= 0;
var angleChange=.1;
var grav=.01;
var angleChangevalue=.01;
var hit=false;

//Luize's
var luizesCrazyGlobalVariableHAHAHAHA_butreally_gameLose= false;
var LuizeImageUp;
var LuizeImageDown;
var GoldCoin;
var Devil;
var LuizeGameOver = false;

// Preload Variable
var base;
var bar;
var target;
var castle;
var bg;
var flame;
var rock;
var pacmanImg;
var ghostImg;
var foodImg;
var boomImg;
var runOnce = true;

var peterMoveForward;
var peterMoveBackwards;
var peterMoveLeft;
var peterMoveRight;
var peterMoveUp;
var peterMoveDown;
var peterStarFields = [];

var XiuaiCuteImage;
var shu;

function preload(){
  base=loadImage("subworlds/PrastGame/cannonBaseMid.png");
  bar=loadImage("subworlds/PrastGame/cannonBarMid.png");
  target=loadImage("subworlds/PrastGame/castle2.png");
  castle=loadImage("subworlds/PrastGame/castle2.png");
  bg=loadImage("subworlds/PrastGame/bg.jpg")
  flame= loadImage("subworlds/PrastGame/flame.png");
  rock= loadImage("subworlds/PrastGame/rock.png");
  pacmanImg = loadImage("subworlds/yufeiGame/virus.png");
  ghostImg = loadImage("subworlds/yufeiGame/ghost.png");
  foodImg = loadImage("subworlds/yufeiGame/cell.png");
  boomImg = loadImage("subworlds/yufeiGame/boom.png");
  LuizeImageUp = loadImage("subworlds/LuizeGame/data/dragonFlyUp.png");
  LuizeImageDown = loadImage("subworlds/LuizeGame/data/dragonFlyDown.png");
  GoldCoin = loadImage("subworlds/LuizeGame/data/strawberry3.png");
  Devil = loadImage("subworlds/LuizeGame/data/beewasp.png");
  XiuaiCuteImage = loadImage("subworlds/XiuaiGame/niao.png");
  shu = loadImage('subworlds/XiuaiGame/shu.jpg');


}


function setup() {
  createCanvas(WORLD_WIDTH, screen.height);
   // gif = loadGif('atomgif.gif');

  WORLD_HEIGHT = height-250;
  var atom  = createImg("media/atomgif.gif");
  atom.position(1325,WORLD_HEIGHT-75);
  atom.size(20,20);
  microscope = loadImage("media/microscope.png");
  jar = loadImage("media/jar.png");
  bug = loadImage("media/bug.png");


  m = new Mover("media/run1K.png", "media/run2K.png",
  "media/run3K.png", "media/run4K.png", "media/run2K.png", WORLD_HEIGHT);

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

  StartHome = new World(100, WORLD_HEIGHT, 600, 500,
     "Locked out of your own home! \nGo explore the world to try to\nremember your password!",
      new Game(), "media/house.png",false);

  JonahWorld = new World(1290, WORLD_HEIGHT, 100, 50,
    "What hints can you find in the atomic\nworld? Press 'A' to Enter!",
    new JonahGame(), "media/table.png",true);
  YufeiWorld = new World(1900, WORLD_HEIGHT, 100,50,
    "The atomic world helped, but now its\ntime to think a little bigger.\nPress 'A' to Enter!",
    new YufeisGame(), "media/table.png",false);
  LuizeWorld = new World(2900, WORLD_HEIGHT, 100, 50,
    "Maybe putting multiple cells together\nwill lead you to another clue!\nPress 'A' to Enter!",
    new LuizeGame(), "media/table.png",false);
  XiuaiWorld = new World(3900, WORLD_HEIGHT, 400,600,
      "This tree seems like a place you\nwould rest. Maybe you left a clue here.\nPress 'A' to Enter!",
    new XiuaiGame(), "media/tree.png",false);
  RobertWorld = new World(4960, WORLD_HEIGHT, 800,600,
      "This castle looks like the perfect place\nto hide a clue! Press 'A' to Enter!",
    new RobertGame(), "media/castle.png",false);
  KateWorld = new World(6500, WORLD_HEIGHT, 300,400,
    "You've found all the clues here on Earth,\nbut that isn't enough! Press 'A' to Enter!",
    new Game(), "media/rocket.png",false);
  PeterWorld = new World(7000, WORLD_HEIGHT, 300,200,
      "Looks like you need to travel some more\nto find the final clue! Press 'A' to Enter!",
    new PeterGame(), "media/blank.png",true);

  EndHome = new World(7400, WORLD_HEIGHT, 600, 500,
     "Home sweet home! You remembered\nyour code, and you have successfully\nmade it back! Congrats!",
     new Game(), "media/house.png");

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
  // console.log("in data: " + inData)
  if (isSubWorldInProgress) { // Update and run the game
    if (firstFrameInSubworld) { // Execute on transition from main world
      console.log(subWorldInProgress)
      // console.log
      subWorldInProgress.setup();
      firstFrameInSubworld = false;
      window.scrollTo(0, 0);
    }

    if (subWorldInProgress.three && runOnce){
      subWorldInProgress.run();
      print("yo")
      runOnce = false;
    }
    else if (!subWorldInProgress.three){
      subWorldInProgress.run();
    }

    if (subWorldInProgress.isGameOver) {
      isSubWorldInProgress = false; // Continue on in the main world
      firstFrameInMainWorld = true; // Indicate transition to main world
    }

  } else {
    if (firstFrameInMainWorld) { // Execute on transition from subworld
      // var p5_canvas = document.getElementById("defaultCanvas0");
      // p5_canvas.parentNode.removeChild(p5_canvas);
      // context.clearRect(0, 0, canvas.width, canvas.height);
      createCanvas(WORLD_WIDTH, screen.height); // Reset to main world canvas
      frameRate(60);
      firstFrameInMainWorld = false; // Done with transition
    }
    runOnce = true;

    background(255);
    rectMode(CORNER);
    fill(0);
    image(microscope,1930,WORLD_HEIGHT-70,40,45);
    image(bug,2920,WORLD_HEIGHT-70,35,40);
    image(jar,2920,WORLD_HEIGHT-70,50,60);

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
        // console.log("displaying" + world)
        if (aPressed) {
          console.log("aaaa")
          console.log(world.game)
          subWorldInProgress = world.game;
          isSubWorldInProgress = true; // True until `isFinished` is set to true in game
          firstFrameInSubworld = true; // Indicate transition to subworld
        }
      }
    }

      // if(dataInX){
      //
      // }
      if (dataInX >750  || keyIsDown(RIGHT_ARROW)){ // Move right and display
        m.move(8);
      }
      // else if (dataInX < 400 || keyIsDown(LEFT_ARROW)) { // Move left and display
      //   m.move(-5);
      // }
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
  // RobertWorld.game.keyPressed(keyCode);
  // YufeiWorld.game.keyPressed(keyCode);
  XiuaiWorld.game.keyPressed(keyCode);
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
