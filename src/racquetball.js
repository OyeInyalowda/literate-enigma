/**
 * Racquetball v2, now with more objects.
 * 
 * @author Mike Vance
 * @version 27Feb25
 */

let racquet;
let ball;
let game;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('game-container');
  game = new Game();
  
  // prevent default behavior
  window.addEventListener("keydown", function(e) {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  }, false);
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
  constructor(racY, racWidth, racHeight, velocity) {
    this.racY = racY;
    this.racWidth = racWidth;
    this.racHeight = racHeight;
    this.velocity = velocity;
    rectMode(CENTER); // mode: CENTER to make calculations easier
  }

  show() {
    noStroke();
    fill(242, 240, 101);
    rect((width - this.racWidth / 2), this.racY, this.racWidth, this.racHeight);
  }

  move() {
    if(keyIsDown(UP_ARROW) && this.racY >= (this.racHeight / 2)) {
      this.racY -= this.velocity;
    } else if(keyIsDown(DOWN_ARROW) && this.racY <= height - (this.racHeight / 2)) {
      this.racY += this.velocity;
    }
  }

  getTop() {
    return this.racY - (this.racHeight / 2);
  }

  getBottom() {
    return this.racY + (this.racHeight / 2);
  }

  getEdge() {
    return (width - this.racWidth);
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

  show() {
    stroke(0, 0, 0);
    fill(225, 75, 75)
    circle(this.ballX, this.ballY, this.ballDiam);
  }

  move() {
    // launch
    this.ballX += this.xVel;
    this.ballY += this.yVel;
  }

  bounceX() {
    this.xVel *= -1;
  }

  bounceY() {
    this.yVel *= -1;
  }

  setXVel(velocity) {
    this.xVel = velocity;
  }

  setYVel(velocity) {
    this.yVel = velocity;
  }

  getX() {
    return this.ballX;
  }

  getY() {
    return this.ballY;
  }

  getRad() {
    return this.ballDiam / 2;
  }
  
}

/**
 * Class that manages the Racquetball game.
 */
class Game {
  constructor() {
    let randomVel = random(-5, 5);
    let randomY = random(50, 350)
    this.score = 0;
    this.racquet = new Racquet(200, 10, 50, 5);
    this.ball = new Ball(7, randomY, 15, 5, randomVel);
    this.leftBound = 0;
    this.rightBound = width;
    this.upperBound = 0;
    this.lowerBound = height;
  }

  play() {
    this.racquet.show();
    this.racquet.move();
    // TODO add Ball

    this.ball.show();
    this.ball.move();

    // bounce conditions
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

  increaseScore() {
    this.score++;
  }

  decreaseScore() {
    if(this.score > 0) {
      this.score--;
    }
  }

  getScore() {
    return this.score;
  }

  reset() {
    let randomVel = random(-5, 5);
    let randomY = random(50, 350)
    this.ball = new Ball(7, randomY, 15, 5, randomVel);
  }
}