  var setup = {
    winningNumber: 0,
    playersGuess: [],
    userInput: $("#usrInput"),
    submitButton: $("#submitButton"),
    provideHint: $("#provideHint"),
    playAgain: $("#playAgain"),
    message: $("#messageToUser"),
    attemptsArray: $("#attemptsArray"),
    attemptsRemaining: $("#attemptsRemaining"),
    gameOver: false,
    maxAttempts: 5,
    hintMessage: ""
  }

init();

$(document).ready(function(){
    setup.submitButton.on('click', fetchPlayersGuessValue);
    setup.playAgain.on('click', init);
    setup.provideHint.on('click', provideHintFunc);
    $(this).on('keyup', function(e){
        if (event.keyCode == 13)
      fetchPlayersGuessValue();
    })
})

function init(){
    setup.gameOver = false;
    setup.playersGuess = [];
    setup.winningNumber = generateWinningNumber();
    displayMessage(messageMaker("newGame"));
    setup.attemptsArray.text("Previous Guesses: ")
    updateAttemptsRemaining();
}

function generateWinningNumber(){
    return Math.floor(Math.random() * 100)
}

function fetchPlayersGuessValue(){
    if (setup.gameOver === true ) {
        setup.userInput.val("");
        return gameOverFunc();
    }
    if (!setup.userInput.val()) {
        return displayMessage(messageMaker("nan"));
        setup.userInput.val("");
    }
    var tempGuess = +setup.userInput.val();
    if (!isDuplicate(tempGuess)) {
        setup.playersGuess.push(tempGuess);
        setup.attemptsArray.text("Previous Guesses: " + setup.playersGuess);
        updateAttemptsRemaining();
        compareWinningNumberAndPlayersGuess();
        if (setup.playersGuess.length === setup.maxAttempts) {
            playerLost();
        }
    } else {
        displayMessage(messageMaker("duplicate"));
    }
    setup.userInput.val("");
}

function updateAttemptsRemaining(){
    var attempts =  setup.maxAttempts - setup.playersGuess.length;
    setup.attemptsRemaining.text(attempts + " attempts remaining")
}

function compareWinningNumberAndPlayersGuess(){
    if (setup.winningNumber === setup.playersGuess[setup.playersGuess.length - 1])
        playerWins();
    else
        playerWrong();
}

function isDuplicate(num){
    for (var i = 0; i < setup.playersGuess.length; i++) {
        if (setup.playersGuess[i] == num) {
            return true;
        }
    }
    return false;
}

function lowerOrHigher(){
    if (setup.playersGuess[setup.playersGuess.length-1] > setup.winningNumber){
        return 1;
    } else
        return -1;
}

function distanceOfGuess(){
    return Math.abs(setup.winningNumber - setup.playersGuess[setup.playersGuess.length-1])
}

function provideHintFunc(){
    if (setup.gameOver === true || setup.playersGuess.length === 0) {
        displayMessage(messageMaker("noHint"));
    } else {
      displayMessage(setup.hintMessage);
    }
}

function guessMessage(){
    var lOrH = lowerOrHigher();
    var dOG = distanceOfGuess();
    var within = Math.ceil(dOG / 5) * 5
    return "Your guess is " + ((lOrH === 1)?"higer":"lower") + " and within " + within + " digits of the winning number."
}

function displayMessage(newMessage) {
    setup.message.text(newMessage);
}

function messageMaker(message){
    var randomizer = Math.floor(Math.random() * 3)
    var object = {
        nan: ["HEY MAN!! THAT ISN'T A NUMBER!! TRY AGAIN!!!", "DUDE NOT A NUMBER!!!", "WHAT IS WRONG WITH YOU MAN!! THAT IS NOT A NUMBER!!!"],
        newGame: ["FEELING LUCKY PUNK?", "TRY ME TRY ME TRY ME", "OH LOOK WHAT WE HAVE HERE! GO FER IT!"],
        noHint: ["NO HINT FOR YOU!!!", "UM LIKE NO HINT DUDE", "GROSS NO HINT"],
        won: ["HOLY *@#! YOU WON!", "YOU ARE A GOD OF LUCK", "I AM YOUR SLAVE MY LORD FOR YOU HAVE WONITH"],
        lost: ["YOU FREAKIN LOST MANG!", "HAHAHA LOSER!!!", "OOOOH YOU LOST SO GOOD!!"],
        wrong: ["HA!! SOOOO WRONG!", "YOU CALL THAT A GUESS?!?! WRONG!!", "DUDE YOU SUCK! TRY AGAIN!!"],
        duplicate: ["COME ON YOU ALREADY SAID THAT!!!", "WHAT IS WRONG WITH YOU MR DE JA VU!", "JUST...NO...DUPLICATE!!!!!"],
        gameOver: ["DUDE THE GAME IS OVER GO HOME!!!", "I QUIT IM DONE ITS OVER", "STOP TOUCHING ME!!!!"]
    }
    return object[message][randomizer];
}


function gameOverFunc(){
    displayMessage(messageMaker("gameOver"));
}

function playerWins(){
    displayMessage(messageMaker("won"));
    gameOver = true;
}

function playerWrong(){
    setup.hintMessage = guessMessage();
    displayMessage(messageMaker("wrong"));
}

function playerLost(){
    displayMessage(messageMaker("lost"));
    setup.gameOver = true;
}