/**
 * Racquetball v3, now with more objects.
 * 
 * @author Mike Vance
 * @version 01MAR25
 */

/**
 * TODO List
 * 1. Pause functionality - partially implemented
 * 2. Game does not start until the player moves
 * 3. Game does not start until the player moves after reset
 * 4. Increase frame size - DONE
 * 5. Add 'guide' for the racquet - DONE
 * 
 * Possible Features
 * 1. Implement lives and game over mechanic
 * 2. Increase ball speed with score
 * 3. Maybe change some colors on bounce or return
 * 
 */

let racquet;
let ball;
let game;

function setup() {
  createCanvas(800, 600);
  game = new Game();
}

function draw() {
  background(25);
  game.play();
  text("Score:" + game.getScore(), 5, 15);
}

/**
 * Class representing a racquet for the Racquetball game.
 */
class Racquet {
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
    fill(50, 50, 101);
    rect((width - this.racWidth / 2), (height / 2), this.racWidth, height)

    // racquet
    fill(242, 240, 101);
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
    stroke(0, 0, 0);
    fill(225, 75, 75)
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
    let randomVel = random(-7, 7);
    let randomY = random(50, 350)
    this.score = 0;
    this.racquet = new Racquet(200, 10, 75, 5);
    this.ball = new Ball(7, randomY, 15, 10, randomVel);
    this.leftBound = 0;
    this.rightBound = width;
    this.upperBound = 0;
    this.lowerBound = height;
  }

  /**
   * Runs a game of racquetball.
   */
  play() {
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
   * Returns player score.
   * @returns {number} score
   */
  getScore() {
    return this.score;
  }

  /**
   * Resets the position and velocity of the ball.
   */
  reset() {
    let randomVel = random(-5, 5);
    let randomY = random(50, 350);
    this.ball = new Ball(7, randomY, 15, 10, randomVel);
  }

  pause() {
    // keep track of current values
    oldXVel = this.ball.getXVel();
    oldYVel = this.ball.getYVel();
    oldSpeed = this.racquet.getSpeed();

    // set velocities to zero
    this.ball.setXVel(0);
    this.ball.setYVel(0);
    this.racquet.setSpeed(0);
  }
}