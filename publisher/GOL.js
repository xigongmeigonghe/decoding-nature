function GOL() {

  this.w = 10;
  this.columns = width / this.w;
  this.rows = height / this.w;
  this.scoreOrange = 0;
  this.scoreBlue = 0;
  this.gameRunning = false;
  this.orangeInit = [];
  this.blueInit = [];
  this.time = millis();
  this.initialized = false;
  console.log(this.columns, this.rows)
  // Game of life board
  this.board = new Array(this.columns);
  for (var i = 0; i < this.columns; i++) {
    this.board[i] = new Array(this.rows);
  }

  this.init = function(ri, bi) {
    this.orangeInit = JSON.parse(ri);
    this.blueInit = JSON.parse(bi);
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (i < this.columns / 2) {
          this.board[i][j] = new Cell(i * this.w, j * this.w, this.w, this.orangeInit[j][i], 1);
        } else {
          this.board[i][j] = new Cell(i * this.w, j * this.w, this.w, this.blueInit[j][i - this.columns / 2], 5);
        }
      }
    }
    this.gameRunning = true;
    this.initialized = true;
    this.time = millis();
  };

  // The process of creating the new generation
  this.generate = function() {
    this.scoreOrange = 0;
    this.scoreBlue = 0;
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (this.board[i][j].player == 1 && this.board[i][j].state == 1)
          this.scoreOrange++;
        else if (this.board[i][j].player == 5 && this.board[i][j].state == 1)
          this.scoreBlue++;
        this.board[i][j].savePrevious();

      }
    }

    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 0; x < this.columns; x++) {
      for (var y = 0; y < this.rows; y++) {

        // Add up all the states in a 3x3 surrounding grid
        var neighbors = 0;
        var group = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous;
            if (this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous == 1)
              group += this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].prevPlayer;
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= this.board[x][y].previous;

        // Rules of Life
        if ((this.board[x][y].state == 1) && (neighbors < 2)) this.board[x][y].newState(0, 0);
        else if ((this.board[x][y].state == 1) && (neighbors > 3)) this.board[x][y].newState(0, 0);
        else if ((this.board[x][y].state === 0) && (neighbors == 3)) {
          var newPlayer = 0;
          if (group == 3)
            newPlayer = 1;
          else if (group == 15)
            newPlayer = 5;
          else if (group == 7)
            newPlayer = 1;
          else if (group == 11)
            newPlayer = 5;
          this.board[x][y].newState(1, newPlayer);
        }
        // else do nothing!
      }
    }
    if (this.gameRunning) {
      if (this.scoreOrange > this.scoreBlue) {
        console.log("ORANGE SCORE:", this.scoreOrange)
        console.log("blue score: ", this.scoreBlue)
      } else if (this.scoreOrange < this.scoreBlue) {
        console.log("orange score:", this.scoreOrange)
        console.log("BLUE SCORE: ", this.scoreBlue)
      } else {
        console.log("SCORE EQUAL:", this.scoreOrange)
      }
      console.log("Time: " + floor((millis() - this.time) / 1000) + " seconds");
      console.log("");
    }
    if (this.scoreOrange == 0 || this.scoreBlue == 0)
      this.gameRunning = false;
  };

  this.display = function() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j].display();
      }
    }
  };

  this.addPattern = function(p, l, player) {
    var pattern = JSON.parse(p);
    var location = JSON.parse(l);
    if (pattern.length * pattern[0].length == 80) {
      var x = 0;
      for (var i = location[0]; i < location[0] + 10; i++) {
        var y = 0;
        for (var j = location[1]; j < location[1] + 8; j++) {
          if (player == "orange") {
            this.board[i % this.columns][j % this.rows].newState(pattern[y][x], 1);
          }
          if (player == "blue") {
            this.board[i % this.columns][j % this.rows].newState(pattern[y][x], 5);
          }
          y++
        }
        x++;
      }
    }

  };
}
