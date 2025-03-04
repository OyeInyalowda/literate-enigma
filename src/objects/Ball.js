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