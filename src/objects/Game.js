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