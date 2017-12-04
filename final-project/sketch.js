//Main World -- Decoding Nature Fall 2017
//              Zane Mountcastle & Nick White

//var to see number of trees made in the scroller to represent the Forest for Xiu Ai's world
var numberOfTrees;
var tb1 = false;
var tb2 = false;

var serial;          // variable to hold an instance of the serialport library
var inData;
var portName = '/dev/cu.usbmodem1411';
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function setup()
{
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  var options = { baudrate: 115200};
  serial.list();                      // list the serial ports
  serial.open(portName,options);              // open a serial port
  numberOfTrees = 10;
  //loading idle Kirby & running Kirby images
  character = loadImage("media/idleK.png");
  run1 = loadImage("media/run1K.png");
  run2 = loadImage("media/run2K.png");
  run3 = loadImage("media/run3K.png");
  tree = loadImage("media/tree.png");
  createCanvas(3000,700);
  m = new Mover();

}

function draw()
{
  console.log("SD: " + inData);
  background(255);
  fill(0);
  //ground of world
  rect(0,300,3000,500);

  createCastle();
  createForest();
  checkTriggerZone();




  if (m.position.x > screen.width/2){
    window.scrollTo(m.position.x-screen.width/2, 0);
  }

  if (inData > 50){ // Right
    m.move(5);
  }
  else if (inData < 50) { // Left
    m.move(-5);
  }
  else{
    m.display(character);
  }
  if(tb1 || tb2){
    fill(255);
    rect(m.position.x-170,m.position.y+20,330,130);
    fill(0);
    rect(m.position.x-160,m.position.y+30,310,110);
    fill(255);
    rect(m.position.x-150,m.position.y+40,290,90);
  }

}

window.addEventListener("keydown", function(e) {
  // Stop arrow keys from moving window
  if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);


//creating the trees for the forest
function createForest(){

  for(var i=0;i<numberOfTrees;i++){
    image(tree,2500+i*25,250,100,100);
  }

}

//creating the trees for the forest
function createCastle(){

  rect(1050,100,30,30);
  rect(1090,100,30,30);
  rect(1130,100,30,30);
  for(var i=0;i<30*7;i+=30){
    rect(1060,110+i,30,30);
    rect(1090,110+i,30,30);
    rect(1120,110+i,30,30);
  }

  for(var j=0;j<30*7;j+=30){
    rect(1150+j,160,30,30);
    rect(1150+j,180,30,30);
    rect(1150+j,200,30,30);
    if(j!=4*30 && j!=3*30 && j!=2*30){
      rect(1150+j,230,30,30);
      rect(1150+j,260,30,30);
      rect(1150+j,290,30,30);
    }

    // rect(150+j,200+j,30,30);
  }

  rect(1350,100,30,30);
  rect(1390,100,30,30);
  rect(1430,100,30,30);
  for(var i=0;i<30*7;i+=30){
    rect(1360,110+i,30,30);
    rect(1390,110+i,30,30);
    rect(1420,110+i,30,30);
  }




}

//Function to see if character is before any level starts to jump to other's worlds
function checkTriggerZone(){
  //before forest is: x = 2375 y = 200
  if (m.position.x > 2375 && m.position.x < 2475 && m.position.y < 310){
    tb1 = true;
    console.log("XiuAiWorld.run()");
    //To push character past trigger zone when level is over
    // m.position.x += 200;
  }
  else if (m.position.x > 1210 && m.position.x < 1300 && m.position.y < 310){
    tb2 = true;
    console.log("RobertWorld.run()");
    //To push character past trigger zone when level is over
    // m.position.x += 200;
  }
  else{
    tb2 = false;
    tb1 = false;
  }

}

//Function to have the textbox appear
function textbox(){
  //before forest is: x = 2375 y = 200


}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
  // console.log("from serial event: "+ inData)
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

//For Serial to p5
//https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/


//
// function mousePressed(){
//   console.log(m.position.x)
//   console.log(m.position.y)
// }


// Can also be included with a regular script tag


// var options = {
//   strings: ["<i>First</i> sentence.", "&amp; a second sentence."],
//   typeSpeed: 40
// }
//
// var typed = new Typed(".element", options);
