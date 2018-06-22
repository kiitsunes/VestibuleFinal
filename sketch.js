/*
Terminal Game
Marica Molder
May 17 2018
> Matrix Rain by The Coding train
> stars ripped from professor D's examples
*/
 
//variables
var textBeingTyped = '';
var textOnScreen = '';
//var i = 0;
var fontSize = 20;
var margin = 10;
//var h = hour();
//var m = minute();
 
var y = 0;
var lineSpeed = 1;
 
//sounds
var music;
var piano;
var heart;
var keys;
 
//array of objects in the room
var rObjects = [];
//array of objects on the player
var uObjects = [];
//professor D's stars
var stars = [];
 
//sets a string to receive player input
var textToShow = "";
 
//displays an initial line of text (a string) on the screen
//var firstLine = "test";
var firstLines = ["This feels like the beginning of something extraordinary. ",
    "I step into my room. It's full of cool stuff. ",
    ">> Try to 'EXAMINE' the room",""]
;
 
/*SPECIAL CASE effects*/
var blurScreen = false;
var thresholdScreen = false;
//var darkenScreen;
var soAnxious = false;
 
//preload() runs before setup()
function preload() {
    piano = loadSound("portal_short.ogg");
    music = loadSound("keyboard.mp3");
    heart = loadSound("heartbeat.mp3");
    keys = loadSound("key.mp3");
}
 
//setup() runs once
function setup() {
    //sets the canvas to the full dimensions of the window in its state upon launch
    createCanvas(windowWidth, windowHeight);
    //displays a carrot where the user's input(keyTyped()) will be displayed
    textBeingTyped = '>';
    //single character
    //value of textBeingTyped set to carrot
   
    //Assigns string variable to each item in the array rObjects[]
    rObjects[0] = new RoomObjects("room","I see a piano and a table. A book and a medicine bottle sit on the table to my right and there's a pen on the floor. I should 'USE' one of these things.","Why would I do that?");
    rObjects[1] = new RoomObjects("book", "It's my favorite book!", "'In my dreams of this city I am always lost.' Sounds about right.");
    rObjects[2] = new RoomObjects("piano", "It's a nice piano. I like to play it.", "I play the piano.");
    rObjects[3] = new RoomObjects("pen", "There's a nice pen on the floor.", "I reach for the pen. Oh no, my glasses!");
    rObjects[4] = new RoomObjects("glasses", "I can't see very well without my glasses.", "I should really keep these on.");
    rObjects[5] = new RoomObjects("medicine", "This calms me down when I'm feeling anxious.", "I take my prescribed dosage. Hope I feel better soon!");
    //can always add more objects here
 
    //Assigns string variable to each item in the array uObjects[]
    rObjects[6] = new RoomObjects("self", "I have a watch, glasses, and quite a lot of anxiety.", "That was pretty weird.");
    rObjects[7] = new RoomObjects("anxiety", "I'm feeling anxious.", "Finals are this week.");
    //rObjects[8] = new RoomObjects("sunnies", "They're prescription.", "Where'd all the light go?");
 
    //seeing stars
        for (var i = 0; i < 700; i++) { // loop and increment from 0 to 200.
            stars[i] = new Star(); // make a new star from the Star constructor basd on the size of the array.
        }
 
    }
 
//draw() continuously loops
function draw() {
    background(20); //off-black
    y = y + lineSpeed;
    if(y > height) {
        y = 0; //resets line
    }
   
    stroke(60);
    strokeWeight(3);
    line(0, y, width, y);
    //line starts at zero,  moves along the y axis, spans the width of canvas
   
    /* following lines set font, text color, font size */
   
    textFont("Courier"); //changes the font to courier
    fill(0,200,0);
    textSize(fontSize);
   
    //text displayed by terminal
    for (i = 0; i < firstLines.length; i++) {
        text(firstLines[i], margin, 100, width, 300);
        translate(0, 20);
    }
    text(textOnScreen, margin, 100, width, 300);
    //text typed by player/user
    text(textBeingTyped, margin, windowHeight-150);
  
    //loops the blur effect
  if(blurScreen){
      filter(BLUR, 3);
  } if (thresholdScreen) {
      filter(THRESHOLD);
  } /*if (darkenScreen) {
      fill(0, 50, 0);
  }*/
 
  //seeing stars
  if(soAnxious) {
      for (var i = 0; i < stars.length; i++) { 
      // display professor d's stars.
      stars[i].display();
  }
  }
 
}
 
//when a key is pressed, the keys.mp3 plays
function keyPressed() {
    if (keyIsPressed) {
        keys.play();
    }
}
 
function keyTyped() {
    /* The keyTyped() function is called once every time a key is pressed, 
    but action keys such as Ctrl, Shift, and Alt are ignored. 
    The most recent key pressed will be stored in the key variable.
     
    Because of how operating systems handle key repeats,
    holding down a key will cause multiple calls to keyTyped() (and keyReleased() as well). 
    */
  if(keyCode===ENTER) {
      newLine();
      //replaces the carrot with an empty space upon enter
      userCommand();
      //checks user's string input in cmd.js
  } else if(keyCode===BACKSPACE) {
    if(textBeingTyped.length>1){textBeingTyped = textBeingTyped.substring(0, textBeingTyped.length - 1);}
      /* takes the current string of textBeingTyped
      identifies last typed and removes one character
      */ 
  } else {
      textBeingTyped += key.toString();
      /* adds the key being pressed to the textBeingTyped
      string for the program to hold/display */
  }
  //To prevent any default behavior for this event, add "return false" to the end of the method.
  //return false;
  //textBeingTyped = ">";
    //resets the text to the initial >
}
 
function showText(textToAdd) {
    textOnScreen += textToAdd.trim() + " ";
    //textOnScreen.translate(0, 20);
  //letter/word spacing
}
 
/* below is a constructor function RoomObjects()
it takes three arguments, then in setup()
creates the array rObjects[]
*/
function RoomObjects(nameP, descriptionP, usesP){
    this.name = nameP;
    this.description = descriptionP;
    this.uses = usesP;
}
 
 
function Star() {
    this.x = random(0, width); // constrain to the window width.
    this.y = random(0, height); // constrain to the window height.
 
    this.display = function () {
        stroke(random(255)); // random grayscale for twinkle effect.
        noFill();
        point(this.x, this.y); // the referenced object's x and y position.
    }
}
 
/*function UserObjects(nameP, descriptionP, usesP) {
    this.name = nameP;
    this.description = descriptionP;
    this.uses = usesP;
}*/
 
/*
function readTime() {
 // text('Current hour:\n' + h + ':' + m, 5, 50);
}*/
