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
}

function draw() {
  background('#3F4C4E');
  game.play();

  if(!started) {
    game.pause();
  }

}

/**
 * Class representing a racquet for the Racquetball game.
 */
class Racquet {
  /**
   * Explicit value constructor.
   * @param {number} racY starting y-value
   * @param {number} racWidth racquet width
   * @param {number} racHeight racquet height
   * @param {number} speed racquet speed
   */
  constructor(racY, racWidth, racHeight, speed) {
    this.racY = racY;
    this.racWidth = racWidth;
    this.racHeight = racHeight;
    this.speed = speed;
    rectMode(CENTER); // mode: CENTER to make calculations easier
  }

  /**
   * Displays the racquet.
   */
  show() {
    noStroke();
    // racquet guide
    fill('#A19F9E');
    rect((width - this.racWidth / 2), (height / 2), this.racWidth, height)

    // racquet
    stroke(0);
    fill('#623543');
    rect((width - this.racWidth / 2), this.racY, this.racWidth, this.racHeight);
  }

  /**
   * Moves the racquet up when UP_ARROW is pressed and down when DOWN_ARROW is pressed.
   */
  move() {
    if(keyIsDown(UP_ARROW) && this.racY >= (this.racHeight / 2)) {
      this.racY -= this.speed;
    } else if(keyIsDown(DOWN_ARROW) && this.racY <= height - (this.racHeight / 2)) {
      this.racY += this.speed;
    }
  }

  /**
   * Getter for the upper y-coord of the racquet.
   * @returns {number} Top y-coord of the racquet
   */
  getTop() {
    return this.racY - (this.racHeight / 2);
  }

  /**
   * Getter for the bottom y-coord of the racquet.
   * @returns {number} Bottom y-coord of the racquet
   */
  getBottom() {
    return this.racY + (this.racHeight / 2);
  }

  /**
   * Getter for the left-most y-coord of the racquet.
   * @returns {number} left edge
   */
  getEdge() {
    return (width - this.racWidth);
  }

  /**
   * Getter for the speed of the racquet.
   * @returns {number} speed
   */
  getSpeed() {
    return this.speed;
  }

  /**
   * Setter for the speed attribute.
   * @param {number} speed 
   */
  setSpeed(speed) {
    this.speed = speed;
  }

}

/**
 * Class representing a ball for the Racquetball game.
 */
class Ball {
  /**
   * Explicit value constructor.
   * @param {number} ballX starting x-value
   * @param {number} ballY starting y-value
   * @param {number} ballDiam diameter of ball
   * @param {number} xVel starting x-velocity
   * @param {number} yVel starting y-velocity 
   */
  constructor(ballX, ballY, ballDiam, xVel, yVel) {
    this.ballX = ballX;
    this.ballY = ballY;
    this.ballDiam = ballDiam;
    this.xVel = xVel;
    this.yVel = -yVel;
  }

  /**
   * Displays the ball.
   */
  show() {
    stroke(0);
    fill('#8B9B4B')
    circle(this.ballX, this.ballY, this.ballDiam);
  }

  /**
   * Moves the ball up when UP_ARROW is pressed and down when DOWN_ARROW is pressed.
   */
  move() {
    this.ballX += this.xVel;
    this.ballY += this.yVel;
  }

  /**
   * Reverses the velocity of the x-axis.
   */
  bounceX() {
    this.xVel *= -1;
  }

  /**
   * Reverses the velocity of the y-axis.
   */
  bounceY() {
    this.yVel *= -1;
  }

  /**
   * Setter for x-axis velocity.
   * @param {number} velocity 
   */
  setXVel(velocity) {
    this.xVel = velocity;
  }

  /**
   * Setter for y-axis velocity.
   * @param {number} velocity 
   */
  setYVel(velocity) {
    this.yVel = velocity;
  }

  /**
   * Getter the ball x-coord.
   * @returns {number} x-coord
   */
  getX() {
    return this.ballX;
  }

  /**
   * Getter the ball y-coord.
   * @returns {number} y-coord
   */
  getY() {
    return this.ballY;
  }

  /**
   * Getter the ball radius.
   * @returns {number} radius
   */
  getRad() {
    return this.ballDiam / 2;
  }

  /**
   * Getter the ball x velocity.
   * @returns {number} xVel
   */
  getXVel() {
    return this.xVel;
  }

  /**
   * Getter the ball y velocity.
   * @returns {number} yVel
   */
    getYVel() {
      return this.yVel;
    }
  
}

/**
 * Class that manages the Racquetball game.
 */
class Game {
  constructor() {
    // game and pause
    this.paused = false;
    this.highScore = 0;
    this.score = 0;
    let oldXVel = 0;
    let oldYVel = 0;
    let oldSpeed = 0;
 
    // racquet and ball
    this.racquet = new Racquet((height / 2), startWidth, startHeight, startSpeed);
    this.ball = new Ball(startX, random(0, height), diam, maxVel, random(-maxVel, maxVel));
    // play area bounds
    this.leftBound = 0;
    this.rightBound = width;
    this.upperBound = 0;
    this.lowerBound = height;
  }

  /**
   * Runs a game of racquetball.
   */
  play() {
    // Show score
    this.showScore();

    // show and move racquet
    this.racquet.show();
    this.racquet.move();

    // show and move ball
    this.ball.show();
    this.ball.move();

    // ball bounce conditions
    if(this.ball.getY() <= this.upperBound || this.ball.getY() >= this.lowerBound) {
      this.ball.bounceY();
    }

    if(this.ball.getX() <= this.leftBound) {
      this.ball.bounceX();
    } else if(this.ball.getX() >= (this.racquet.getEdge() - this.ball.getRad())) {
      if(this.ball.getY() >= this.racquet.getTop() && this.ball.getY() <= this.racquet.getBottom()) {
        this.ball.bounceX();
        this.increaseScore();
      } else {
        this.decreaseScore();
        this.reset();
      }
    }

    // pause screen condition
    if(this.isPaused()) {
      this.pauseScreen();
    }

    // set high score
    this.setHighScore();
  }

  /**
   * Increases player score.
   */
  increaseScore() {
    this.score++;
  }

  /**
   * Decreases player score.
   */
  decreaseScore() {
    if(this.score > 0) {
      this.score--;
    }
  }

  /**
   * Sets the high score.
   */
  setHighScore() {
    if(this.score > this.highScore) {
      this.highScore = this.score;
    }
  }

  /**
   * Returns player score.
   * @returns {number} score
   */
  getScore() {
    return this.score;
  }

  /**
   * Returns player high score.
   * @returns high score
   */
  getHighScore() {
    return this.highScore;
  }

  /**
   * Resets the position and velocity of the ball.
   */
  reset() {
    this.ball = new Ball(startX, random(0, height), diam, maxVel, random(-maxVel, maxVel));
  }

  /**
   * Pauses the game.
   */
  pause() {
    if(!this.paused) {
      // keep track of current values
      this.oldXVel = this.ball.getXVel();
      this.oldYVel = this.ball.getYVel();
      this.oldSpeed = this.racquet.getSpeed();
  
      // set velocities to zero
      this.ball.setXVel(0);
      this.ball.setYVel(0);
      this.racquet.setSpeed(0);
    }

    this.paused = true;

    console.log("Game paused.");
  }

  /**
   * Unpauses the game.
   */
  unpause() {
    // set to old values
    this.ball.setXVel(this.oldXVel);
    this.ball.setYVel(this.oldYVel);
    this.racquet.setSpeed(this.oldSpeed);

    this.paused = false;
    started = true; // set started to true after first unpause

    console.log("Game unpaused");
  }

  /**
   * Returns true if the game is paused.
   * @returns paused
   */
  isPaused() {
    return this.paused;
  }

  /**
   * Displays a pause screen.
   */
  pauseScreen() {
    // pause frame vars
    let frameCenterX = width / 2;
    let frameCenterY = height / 2;
    let frameWidth = 650;
    let frameHeight = 450;

    // pause frame
    fill(55, 100);
    rect(frameCenterX, frameCenterY, frameWidth, frameHeight);

    // Game Rules
    fill('#F6F4F1');
    textSize(13);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text("Rules:", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY + 3) - (frameHeight / 2)));
    text("1. Deflecting the ball scores a point", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY + 18) - (frameHeight / 2)))
    text("2. Missing the ball deducts a point", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY + 36) - (frameHeight / 2)))

    // "Game Paused" text
    textSize(25);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Game Paused", frameCenterX, frameCenterY);
    textSize(13);
    textStyle(NORMAL);
    text("Current Score: " + this.getScore() + " | High Score: " + this.getHighScore(), frameCenterX, (frameCenterY + 36));

    // Controls
    textSize(13);
    textStyle(NORMAL);
    textAlign(LEFT, BOTTOM);
    text("Down Arrow - Move Racquet Down", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY - 3) + (frameHeight / 2)));
    text("Up Arrow - Move Racquet Up", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY - 18) + (frameHeight / 2)));
    text("Escape - Pause / Unpause", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY - 36) + (frameHeight / 2)));
    text("Reset Game (when unpaused):", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY - 54) + (frameHeight / 2)));
    text("Controls:", ((frameCenterX + 3) - (frameWidth / 2)), ((frameCenterY - 72) + (frameHeight / 2)));

  }

  /**
   * Displays player score
   */
  showScore() {
    fill('#F6F4F1');
    textSize(13);
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    text("Score: " + this.getScore() + " | High Score: " + this.getHighScore(), 5, 15);
  }

  fullReset() {
    this.reset();
    started = false;
    this.score = 0;
    this.highScore = 0;
    started = false;
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