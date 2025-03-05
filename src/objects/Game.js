/**
 * Class that manages the Racquetball game.
 */
class Game {
    constructor() {
      // game values
      this.lives = MAX_LIVES;
      this.highScore = 0;
      this.score = 0;
      this.outOfLives = false;
      // pause values
      this.paused = false;
      this.oldXVel = 0;
      this.oldYVel = 0;
      this.oldSpeed = 0;
   
      // racquet and ball
      this.racquet = new Racquet((height / 2), startWidth, startHeight, startSpeed);
      this.ball = new Ball(startX, random(0, height), diam, maxVel, random(-maxVel, maxVel));
      this.ui = new UserInterface();
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
      if(!this.started) {
        game.pause();
      } 
      if(this.outOfLives) {
        game.gameOver();
      }  
      // show and move racquet
      this.racquet.show();
      this.racquet.move();
  
      // show and move ball
      this.ball.show();
      this.ball.move();

      // bounce ball off bounds
      this.boundary();
  
      // if isPaused(), show pause screen. Else, show score in top left.
      if(this.isOver()) {
        this.ui.gameOverScreen();
      } else if(this.isPaused()) {
        this.ui.pauseScreen();
      } else {
        this.ui.showScore();
      }
  
      // set high score
      this.setHighScore();
    }

    /**
     * Bounces the ball off game boundaries
     */
    boundary() {
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
          this.loseLife();
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
      this.started = true; // set started to true after first unpause
  
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
     * Resets the position and velocity of the ball.
     */
    reset() {
      this.ball = new Ball(startX, random(0, height), diam, maxVel, random(-maxVel, maxVel));
    }

    /**
     * Resets the whole game
     */
    fullReset() {
      this.reset();
      this.score = 0;
      this.highScore = 0;
      this.lives = MAX_LIVES;
      this.unpause();
      this.outOfLives = false;
      this.started = false;
    }

    loseLife() {
      if(this.lives > 1) {
        this.lives--;
        console.log("Life lost");
      } else {
        this.outOfLives = true;
      }
    }

    isOver() {
      return this.outOfLives;
    }

    gameOver() {
      // set velocities to zero
      this.ball.setXVel(0);
      this.ball.setYVel(0);
      this.racquet.setSpeed(0);
      console.log("gameOver()")
    }
  }