// ****************** http://spacebrew.github.io/spacebrew/admin/admin.html?server=sandbox.spacebrew.cc ****************** \\

// ****************** SET TO TRUE FOR TOURNAMENT ****************** \\
var tournament = false;

var gol;
var redInitialPattern;
var blueInitialPattern;
var spaceBrewPattern;
var sb;
var initSent = false;

function setup() {
  createCanvas(1280, 720);
  gol = new GOL();
  if (tournament) {
    sb = new Spacebrew.Client({
      reconnect: true
    });
    // set the base description
    sb.name("GOL Team " + teamName);
    sb.description("GAME of life yo.");

    // connect to spacebrew
    sb.addPublish(teamName + "Init", "string");
    sb.addPublish(teamName + "PatternLocation", "string");
    sb.addPublish(teamName + "Pattern", "string");

    sb.connect();
    spaceBrewPattern = JSON.stringify(oi); // ****************** FOR TOURNAMENT PLAY send your initial pattern into the JSON.stringify here ****************** \\

  } else {
    //use during testing
    orangeInitialPattern = JSON.stringify(oi);
    blueInitialPattern = JSON.stringify(bi);
    gol.init(orangeInitialPattern, blueInitialPattern);
  }
}

function draw() {
  background(255);
  if (tournament) {
    if (!initSent && sb.isConnected()) {
      sb.send(teamName + "Init", "string", spaceBrewPattern);
      var zeroPattern = JSON.stringify(zero);
      gol.init(zeroPattern, zeroPattern);
      initSent = true;
    } else if (initSent) {
      gol.display();
    }
  } else {
    if (gol.gameRunning)
      gol.generate();
    gol.display();
  }
}

function mousePressed() {
  //location can be anywhere on board
  var x = Math.round((mouseX - (gol.w / 2)) / gol.w);
  x = constrain(x, 0, gol.columns - 1);
  var y = Math.round((mouseY - (gol.w / 2)) / gol.w);
  y = constrain(y, 0, gol.rows - 1);
  var location = [x, y];

  var pattern = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  var pl = JSON.stringify(location);
  // ******************  You can have multiple patterns set up and choose which one to send through ****************** \\
  // ****************** Essentially, you will change the pattern by sending different 10x8 arrays into the following JSON.stringify ****************** \\
  var p = JSON.stringify(pattern);

  if (!tournament) {
    gol.addPattern(p, pl, teamName);
  } else {
    if (initSent && sb.isConnected()) {
      console.log("sending")
      sb.send(teamName + "PatternLocation", "string", pl);
      sb.send(teamName + "Pattern", "string", p);
    }
  }
}
