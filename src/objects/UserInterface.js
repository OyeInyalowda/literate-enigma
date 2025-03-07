class UserInterface {
    constructor() {
        this.frameCenterX = width / 2;
        this.frameCenterY = height / 2;
        this.frameWidth = 650;
        this.frameHeight = 450;    
    }
    
    pauseScreen() {
        // pause frame
        this.showFrame();
        // Game Rules
        this.showRules();
        // Controls
        this.showControls();
    
        // "Game Paused" text
        textSize(25);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("Game Paused", this.frameCenterX, this.frameCenterY);
        textSize(13);
        textStyle(NORMAL);
        text("Current Score: " + game.getScore() + " | High Score: " + game.getHighScore() + " | Lives: " + game.lives, this.frameCenterX, (this.frameCenterY + 36));
    }

    gameOverScreen() {
        // pause frame
        this.showFrame();
        // Game Rules
        this.showRules();
        // Controls
        this.showControls();

        // "Game Paused" text
        textSize(25);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("GAME OVER", this.frameCenterX, this.frameCenterY);
        textSize(13);
        textStyle(NORMAL);
        text("Press escape to reset", this.frameCenterX, (this.frameCenterY + 36));
        text("High Score: " + game.getHighScore(), this.frameCenterX, (this.frameCenterY + 54));

    }

    showRules() {
        fill('#F6F4F1');
        textSize(13);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        text("Rules:", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY + 3) - (this.frameHeight / 2)));
        text("1. Deflecting the ball scores a point", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY + 18) - (this.frameHeight / 2)));
        text("2. Missing the ball deducts a point", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY + 36) - (this.frameHeight / 2)));
    }

    showControls() {
        fill('#F6F4F1');
        textSize(13);
        textStyle(NORMAL);
        textAlign(LEFT, BOTTOM);
        text("Down Arrow - Move Racquet Down", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY - 3) + (this.frameHeight / 2)));
        text("Up Arrow - Move Racquet Up", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY - 18) + (this.frameHeight / 2)));
        text("Escape - Pause / Unpause", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY - 36) + (this.frameHeight / 2)));
        text("~ - Reset Game:", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY - 54) + (this.frameHeight / 2)));
        text("Controls:", ((this.frameCenterX + 3) - (this.frameWidth / 2)), ((this.frameCenterY - 72) + (this.frameHeight / 2)));
    }

    /**
     * Displays player score
     */
    showScore() {
        fill('#F6F4F1');
        textSize(13);
        textStyle(NORMAL);
        textAlign(LEFT, CENTER);
        text("Score: " + game.getScore() + " | High Score: " + game.getHighScore() + " | Lives: " + game.lives, 5, 15);
    }

    showFrame() {
        fill(55, 100);
        rect(this.frameCenterX, this.frameCenterY, this.frameWidth, this.frameHeight);
    }
    
}
