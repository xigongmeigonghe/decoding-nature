// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var lsys;
var turtle;
var birdRule;
var cute;
var shu;
var cat;
var dog;
var mateo;

var numQuestion = 0;
var questions = ['q1', 'q2', 'q3', 'q4', 'q5',];
var answers = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i'],
  ['j', 'k', 'l'],
  ['m', 'n', 'o'],
];
var rightAnswers = [0, 1, 0, 2, 2];

function preload(){

  cute= loadImage("niao.png")
  shu= loadImage('shu.jpg')

}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight-50);
  /*
  // Create an empty ruleset
   Rule[] ruleset = new Rule[2];
   // Fill with two rules (These are rules for the Sierpinksi Gasket Triangle)
   ruleset[0] = new Rule('F',"F--F--F--G");
   ruleset[1] = new Rule('G',"GG");
   // Create LSystem with axiom and ruleset
   lsys = new LSystem("F--F--F",ruleset);
   turtle = new Turtle(lsys.getSentence(),width*2,TWO_PI/3);
   */

  /*Rule[] ruleset = new Rule[1];
   //ruleset[0] = new Rule('F',"F[F]-F+F[--F]+F-F");
   ruleset[0] = new Rule['F',"FF+[+F-F-F]-[-F+F+F]");
   lsys = new LSystem("F-F-F-F",ruleset);
   turtle = new Turtle(lsys.getSentence(),width-1,PI/2);
   */

  var ruleset = [];
  ruleset[0] = new Rule('F', "FF+[+F-F-F]-[-F+F+F]");
  ruleset[1] = new Rule('G', 'F')
  birdRule = new Rule('F', 'FF+[+F-F-GB]-[-F+F+GB]');
  lsys = new LSystem("G", ruleset);
  turtle = new Turtle(lsys.getSentence(), height*3/5, radians(25));

  cat = createButton(answers[numQuestion][0]);
  cat.mouseClicked(function() {
    if (0 == rightAnswers[numQuestion]) {
      growTree();
      if (numQuestion < questions.length-1) {
        numQuestion++;
      }
      updateAnswers();
    } else {
      alert('HAHAHAHA Wrong!');
    }
  });

  dog = createButton(answers[numQuestion][1]);
  dog.mouseClicked(function() {
    if (1 == rightAnswers[numQuestion]) {
      growTree();
       if (numQuestion < questions.length-1) {
        numQuestion++;
      }
      updateAnswers();
    } else {
      alert('HAHAHAHA Wrong!');
    }
  });

  mateo = createButton(answers[numQuestion][2]);
  mateo.mouseClicked(function() {
    if (2 == rightAnswers[numQuestion]) {
      growTree();
       if (numQuestion < questions.length-1) {
        numQuestion++;
      }
      updateAnswers();
    } else {
      alert('HAHAHAHA Wrong!');
    }
  });
}

function draw() {
  // imageMode(CORNER);

  background(0);
  fill(0);
  //text("Click mouse to generate", 10, height-10);
  push();
  translate(width/2, height);
  rotate(-PI/2);
  turtle.render();
  pop();
   fill(255);
  text(questions[numQuestion],20, height/4);

}

var counter = 0;

function growTree() {
  if (counter < 4) {
    push();
    lsys.generate();
    //println(lsys.getSentence());
    turtle.setToDo(lsys.getSentence());
    turtle.changeLen(0.5);
    pop();
    //redraw();
    counter++;
  } else if (counter == 4) {
    push();
    // lsys.save();
    lsys.ruleset[0] = birdRule;
    lsys.generate();

    turtle.setToDo(lsys.getSentence());
    turtle.changeLen(0.5);

    pop();
    counter ++;
  }
}

function updateAnswers() {
  cat.html(answers[numQuestion][0]);
  dog.html(answers[numQuestion][1]);
  mateo.html(answer[numQuestion][2]);
}
