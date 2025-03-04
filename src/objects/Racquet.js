
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