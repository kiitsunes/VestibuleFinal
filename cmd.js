function newLine() {
    userCommand(textBeingTyped.replace(">", ""));
    textBeingTyped = '>';
  //replaces the carrot with an empty space upon enter
}
 
function userCommand() {
 
    if (textBeingTyped.includes("examine")) {
        /*if the text being typed by the user includes the word EXAMINE
        and as long as our iterator hasn't run through the entire
        length of the rObjects array...*/
        for (var i = 0; i < rObjects.length; i++) {
            if (textBeingTyped.includes(rObjects[i].name)) {
                showText(rObjects[i].description);
                /*Check if the user's text, then compare it to each .name in the array ([0])
                and select the pertaining .descriptions([2]) string and display it */
            }
        }
    }
 
    if (textBeingTyped.includes("use")) {
        /*if the text being typed by the user includes the word USE
        and as long as our iterator hasn't run through the entire
        length of the rObjects array...*/
        for (var i = 0; i < rObjects.length; i++) {
            /*Check if the user's text, then compare it to each .name in the array ([0])
            and select the pertaining .uses([3]) string and display it */
            if (textBeingTyped.includes(rObjects[i].name)) {
                showText(rObjects[i].uses);
                /* SPECIAL CASES */
                if (rObjects[i].name == "piano") {
                    //IF the .name is piano, play ".mp3"
                    piano.play();
                }
                else if (rObjects[i].name == "pen") {
                    //IF it's PEN, blur the screen
                    blurScreen = true;
                } else if (rObjects[i].name == "glasses") {
                    //IF it's glasses, turn off blur
                    blurScreen = false;
                } else if (rObjects[i].name == "medicine") {
                    thresholdScreen = false;
                    soAnxious = false;
                    heart.stop();
                } else if (rObjects[i].name == "anxiety") {
                    thresholdScreen = true;
                    soAnxious = true;
                        heart.play();                        
                } /*else if (rObjects[i].name == "sunnies") {
                    //IF it's glasses, turn off blur
                   darkenScreen = !darkenScreen;
                }*/
            }
        }
        /*for (var i = 0; i < uObjects.length; i++) {
            if (textBeingTyped.includes(uObjects[i].name)) {
                showText(uObjects[i].uses);
                // SPECIAL CASES
                if (uObjects[i].name == "anxiety") {
                    thresholdScreen = true;
                    heart.play();
                }
            }
        }*/
    }
}
