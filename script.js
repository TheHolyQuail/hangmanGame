//constant variables
var POSSIBLEGUESS = "abcdefghijklmnopqrstuvwxyz";
var OTHERSYMBOLS = "- '";

//array of the topics and one of their array variable name
var titles = ["Challenge Words", "Food Brands", "Common Brands", "Car Brands", "Videogame words"];
var lists = [hardWordsList, foodBrandWordsList, commonBrandWordslist ,carBrandWordslist, videogameWordsList];

//change per game variables
var word = "";
var words = [""];

//change during game variables
var guesses = 0;
var correctGuesses = "";
//used to update the guessing progress and to see if the guesser wins
//should always be the same length as word
var wordProgress = "";

//for animation
var phase = 0;

var win = false;

function start(){
    changePhase(0);

    //makes the buttons
    var alphabet = POSSIBLEGUESS.toUpperCase();
    for(var i = 0; i < POSSIBLEGUESS.length; i++){
        var div = document.getElementById("buttons");
        var button = document.createElement("button");
        button.setAttribute("id",POSSIBLEGUESS[i]);
        button.innerHTML = alphabet[i];
        button.setAttribute("onclick", "guess(this.id)");
        div.appendChild(button);
    }
}

//take the category selection and uses it to make a word
function playGame(){
    var category = document.getElementById("categorySelection").value;
    document.getElementById("WinOrLoose").innerHTML = "";

    //checks if the category selected exists
    var t = false;
    for(var i = 0; i < 5;i++){
        if(titles[i] == category){
            t = true;
        }
    }

    if(t){
        words = lists[titles.indexOf(category)];
    } else {
        alert("Please choose a category")
    }
    //choosing word and starting game
    if(words.length > 1 ){
        var x = words.length;
        var y =Math.floor(Math.random() * x);
        word = words[y];
        console.log(word);

        //sets up the game
        updateGame(true);
    } else{
        //error
        console.log("fail with the words list referencing");
    }
}

function updateGame(start){
    if(start) {
        //hide selection and show game
        changePhase(0);

        document.getElementById("start").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("WinOrLoose").innerHTML = "";

        guesses = word.length;
        for (var i = 0; i < word.length; i++) {
            if (POSSIBLEGUESS.includes(word[i])) {
                wordProgress += "_ ";
            } else if (OTHERSYMBOLS.includes(word[i])) {
                wordProgress += word[i] + " ";
            } else {
                //there is an error with the word if this runs
                console.log("word is not possible// check word list for impossible words")
            }
        }
    } else {
        //the below code section updates the word guessing progress to the current amount of the word guessed
        //p takes into account the fact that the correlated letters in wordGuessed and wordProgress get farther appart linearly
        wordProgress = ""
        var winTest = 0;
        for (var i = 0; i < word.length; i++) {
            if (correctGuesses.includes(word[i])) {
                wordProgress += word[i];
                winTest += 1;
            } else {
                if (POSSIBLEGUESS.includes(word[i])) {
                    wordProgress += "_";
                } else if (OTHERSYMBOLS.includes(word[i])) {
                    wordProgress += word[i];
                    winTest += 1;
                }
            }
            wordProgress += " ";
        }
    }
    //the below code section updates the html
    console.log("update");

    document.getElementById("wordProgress").innerHTML = wordProgress;
    document.getElementById("remainingGuesses").innerHTML = guesses.toString();

    if(winTest == word.length){
        endGame(true);
    } else if(guesses < 1){
        endGame(false);
    }
}

function guess(val) {
    var guess = val;

    if(word.includes(guess)){
        for(var i = 0; i < word.length; i++){
            console.log("letter = " + word[i]);
            if(word[i] === guess){
                correctGuesses += guess;
            }
        }
    //wrong guess
    } else{
        guesses -= 1;
    }
    //disables the guessed button
    document.getElementById(guess).disabled = true;

    //update game
    updateGame(false);
}

function endGame(winTrue){
    document.getElementById("reset").style.display = "block";

    for(var i = 0; i < POSSIBLEGUESS.length;i++){
        document.getElementById(POSSIBLEGUESS[i]).disabled = true;
    }

    if(winTrue){
        console.log("win");
        changePhase(111);
        document.getElementById("WinOrLoose").innerHTML = "YOU WIN! I will let you live this time...";
        //for customized start
        win = true;
    }else{
        console.log("loose");
        changePhase(333);
        document.getElementById("WinOrLoose").innerHTML = "YOU LOOSE... the word was " + word;
        //for customized start
        win = false;
    }
}

function changePhase(num){
    //for redundancy
    phase = num;
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (phase == 0) {
            //base
            ctx.fillRect(0,175,100,25);
            //pole
            ctx.fillRect(20,20,90,10);
            //arm
            ctx.fillRect(10,20,10,200);
            //noose point
            ctx.fillRect(85,20,10,20);
            ctx.beginPath();
            ctx.moveTo(90, 40);
            ctx.lineTo(80,80);
            ctx.stroke();

            //stool
            ctx.fillRect(60,155,40,8);
            ctx.fillRect(65,157,5,20);
            ctx.fillRect(90,157,5,20);

            //character guy
            ctx.beginPath();
            //left leg
            ctx.moveTo(65, 155);
            ctx.lineTo(80,130);
            //body
            ctx.lineTo(80, 100);
            //left arm
            ctx.lineTo(65,130);
            //right arm
            ctx.moveTo(80, 100);
            ctx.lineTo(95,130);
            //right leg
            ctx.moveTo(80, 130);
            ctx.lineTo(95,155);
            ctx.stroke();
            //head
            ctx.beginPath();
            ctx.arc(80,90,10,0,2*Math.PI);
            ctx.stroke();

            //hangman guy
            ctx.beginPath();
            //left leg
            ctx.moveTo(160, 200);
            ctx.lineTo(175,175);
            //body
            ctx.lineTo(175, 135);
            //left arm
            ctx.lineTo(160,152);
            ctx.lineTo(145,152);
            //right arm
            ctx.moveTo(175, 135);
            ctx.lineTo(190,175);
            //right leg
            ctx.moveTo(175, 175);
            ctx.lineTo(190,200);
            //rope
            ctx.moveTo(145, 158);
            ctx.lineTo(145,150);
            ctx.lineTo(90,167);
            ctx.stroke();
            //head
            ctx.beginPath();
            ctx.moveTo(175, 135);
            ctx.lineTo(185, 135);
            ctx.lineTo(165, 135);
            ctx.lineTo(170, 120);
            ctx.lineTo(175, 115);
            ctx.lineTo(180, 120);
            ctx.lineTo(185, 135);
            ctx.fill();

        } else if (phase > 0 && phase < word.length) {
            //during gameplay

        } else if (phase == 111) {
            //clears canvas

            //win
            //base
            ctx.fillRect(0,175,100,25);
            //pole
            ctx.fillRect(20,20,90,10);
            //arm
            ctx.fillRect(10,20,10,200);
            //noose point
            ctx.fillRect(85,20,10,20);

            //character guy
            ctx.beginPath();
            //left leg
            ctx.moveTo(65, 175);
            ctx.lineTo(80,150);
            //body
            ctx.lineTo(80, 120);
            //left arm
            ctx.lineTo(65,100);
            //right arm
            ctx.moveTo(80, 120);
            ctx.lineTo(95,100);
            //right leg
            ctx.moveTo(80, 150);
            ctx.lineTo(95,175);
            ctx.stroke();
            //head
            ctx.beginPath();
            ctx.arc(80,110,10,0,2*Math.PI);
            ctx.stroke();
        } else if (phase == 333) {

            //loose
            //base
            ctx.fillRect(0,175,100,25);
            //pole
            ctx.fillRect(20,20,90,10);
            //arm
            ctx.fillRect(10,20,10,200);
            //noose point
            ctx.fillRect(85,20,10,20);
            ctx.beginPath();
            ctx.moveTo(90,40);
            ctx.lineTo(90,60);
            ctx.stroke();

            //character guy
            ctx.beginPath();
            //left leg
            ctx.moveTo(75, 135);
            ctx.lineTo(90,110);
            //body
            ctx.lineTo(90, 80);
            //left arm
            ctx.lineTo(75,110);
            //right arm
            ctx.moveTo(90, 80);
            ctx.lineTo(105,110);
            //right leg
            ctx.moveTo(90, 110);
            ctx.lineTo(105,135);
            ctx.stroke();
            //head
            ctx.beginPath();
            ctx.arc(90,70,10,0,2*Math.PI);
            ctx.stroke();
        } else{
            //other
        }
    }
}

//starts a new game
function reset() {
    guesses = 0;
    wordProgress = "";

    word = "";
    words = "";
    correctGuesses = "";

    phase = 0;

    document.getElementById("game").style.display = "none";
    document.getElementById("end").style.display = "none";
    document.getElementById("reset").style.display = "none";
    document.getElementById("start").style.display = "block";
    document.getElementById("animation").style.display = "block";
    document.getElementById("WinOrLoose").innerHTML = "";

    for(var i = 0; i < POSSIBLEGUESS.length;i++){
        document.getElementById(POSSIBLEGUESS[i]).disabled = false;
    }

    changePhase(0);
    if(win) {
        document.getElementById("spoken").innerHTML = "You got in serious trouble again?!...<break/> Well... I'm still bored so I'll let you play another game to survive. <break/> If you win I'll let you escape. If you lose you will die.";
    } else {
        document.getElementById("spoken").innerHTML = "You are probably here for something pretty bad but whatever...<break/> I'm bored so I'll let you play a game to survive. <break/> If you win I'll let you escape. If you lose you will die.";
    }

}