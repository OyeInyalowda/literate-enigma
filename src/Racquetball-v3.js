/**
 * Racquetball v3, now with more objects.
 * 
 * @author Mike Vance
 * @version 05MAR25
 */

/**
 * TODO List
 * 
 * Possible Features
 * 2. Increase ball speed with score
 * 3. Maybe change some colors on bounce or return
 */

// racquet and ball starting params
const MAX_LIVES = 5;
let startX;
let maxVel;
let diam;
let startWidth;
let startHeight;
let startSpeed;
let game;
//let started;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('game-container');

  // racquet and ball starting params
  startX = 0;
  maxVel = 10;
  diam = 15;
  startWidth = 10;
  startHeight = 75;
  startSpeed = 9;

  game = new Game();
  //started = false; // game not started by default

  // prevent default behavior
  window.addEventListener("keydown", function(e) {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  }, false);
}

function draw() {
  background('#2c3b52');
  game.play();
}

function keyPressed() {
  if(game.isOver() == true && keyCode == 27) {
    game.fullReset();
    console.log("Game over, reset.");
  } else if(keyCode == 27 && game.isPaused() == false) {
    game.pause();
  } else if(keyCode == 27 && game.isPaused() == true) {
    game.unpause();
  } else if(key == "`") {
    game.fullReset();
    console.log("Game reset.")
  }
}