/**
 * Racquetball v3, now with more objects.
 * 
 * @author Mike Vance
 * @version 01MAR25
 */

/**
 * TODO List
 * 1. Pause functionality - DONE
 * 2. Game does not start until the player moves - DONE
 * 4. Increase frame size - DONE
 * 5. Add 'guide' for the racquet - DONE
 * 
 * Possible Features
 * 1. Implement lives and game over mechanic
 * 2. Increase ball speed with score
 * 3. Maybe change some colors on bounce or return
 */

// racquet and ball starting params
let startX;
let maxVel;
let diam;
let startWidth;
let startHeight;
let startSpeed;
let game;
let started;

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
  started = false; // game not started by default

  // prevent default behavior
  window.addEventListener("keydown", function(e) {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  }, false);
}

function draw() {
  background('#3F4C4E');
  game.play();

  if(!started) {
    game.pause();
  }

}

function keyPressed() {
  if(keyCode == 27 && game.isPaused() == false) {
    game.pause();
  } else if(keyCode == 27 && game.isPaused() == true) {
    game.unpause();
  } else if(key == "`" && game.isPaused() == false) {
    game.fullReset();
    console.log("Game reset.")
  }
}