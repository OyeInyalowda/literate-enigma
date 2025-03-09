class Scoreboard{
    constructor() {
        this.scoreboardFile;
        this.scoreboardArr = [];
    }

    /**
     * Writes the current scoreboard array to the scoreboard file 
     */
    write() {

    }

    /**
     * Reads the current scoreboard file into the scoreboard array
     */
    read() {

    }
    
    /**
     * Adds a username and score to the scoreboard if it is > lowest score on the board.
     * @param {string} userName 
     * @param {number} userScore 
     * @returns false if the score is <= the lowest score on the scoreboard
     */
    add(userName, userScore) {
        if(scoreboardArr.length >= SCOREBOARD_SIZE && userScore <= scoreboardArr[scoreboardArr.length - 1]) {
        // if the scoreboard is full and the score is less than the min value it is not added, return false
          console.log("Scoreboard full, score <= than min. Score not added");
          return false;
        } else {
          if(scoreboardArr.length == 0) {
          // if the array is empty, add name score in the front, return true
            // add value
            scoreboardArr.unshift(userScore);
            scoreboardArr.unshift(userName);
            console.log("Scoreboard empty, adding to front");
          } else if(userScore < scoreboardArr[scoreboardArr.length - 1]) {
          // if the scoreboard is not full and the score is less than the min value it is added to the end
            scoreboardArr.push(userName);
            scoreboardArr.push(userScore);
            console.log("Scoreboard not full, score < than min. Score appended");
          } else if(userScore > scoreboardArr[1]) {
            // if the score is greater than the max value, add to front and shift all values right
            scoreboardArr.unshift(userScore);
            scoreboardArr.unshift(userName);
            console.log("Score > than max, adding to front");
          } else {
            // else search the array for a value less than the target, then shift everything down
            let nameIndex, scoreIndex;
            let found = false;
            console.log("Search for insertion point");
      
            // find insertion point
            let i = 1; // first score index
            while(!found) {
              if(userScore > scoreboardArr[i]) {
                console.log("HERE: " + scoreboardArr[i]);
                scoreIndex = i;
                nameIndex = i - 1;
                found = true;
              } else {
                i+=2; // visit every score until insert point is found
              }
            }
          
            // shift values down and insert new vals
            for(let j = (scoreboardArr.length + 1); j > nameIndex; j--) {
              scoreboardArr[j] = scoreboardArr[j - 2];
            }
            scoreboardArr[nameIndex] = userName;
            scoreboardArr[scoreIndex] = userScore;
          }
          // TODO remove lowest name/score if scoreboard is full
          if(scoreboardArr.length > SCOREBOARD_SIZE) {
            scoreboardArr.pop();
            scoreboardArr.pop();
            console.log("scoreboardArr > scoreboard size, trimming");
          }
           return true;
        }
      }
}