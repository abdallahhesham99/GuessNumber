"use strict";
//Declare Variables
let messageSpan = document.querySelector(".right .message");
const numberSquare = document.querySelector(".number");
const scoreSpan = document.querySelector(".score");
const highscoreSpan = document.querySelector(".highscore");
const checkButton = document.querySelector(".btn.check");
const againButton = document.querySelector(".again");

//init value for score
let score = 20;

//empty variable for highscore to save it in localStorage
let highscore;

//variable for make random number between 1 to 20
let secretNumber = Math.trunc(Math.random() * 20 + 1);

// ==========================Check LocalStorage Data===============================================
//if there highscore item in localstorage get it
//else make highscore = 0
if (localStorage.getItem("highscore")) {
  highscore = JSON.parse(localStorage.getItem("highscore"));
  highscoreSpan.textContent = highscore;
} else {
  highscore = 0;
}
// =======================Function for display messages==========================================
//function takes messages and display it in messageSpan
function displayMessage(message) {
  messageSpan.textContent = message;
}

// =================================CheckButton Event Function=======================================
checkButton.addEventListener("click", function () {
  //get guess input value and converte it to number and set it in variable
  const guess = Number(document.querySelector(".guess").value);

  // if guess input is empty
  if (!guess) displayMessage("⛔⛔ No Number");
  // if guess input number greater than 20 and smaller than 1 display wrong message
  else if (guess > 20 || guess < 1)
    displayMessage("Enter number between 1 and 20");
  //if guess === secret number
  else if (guess == secretNumber) {
    displayMessage("🎉 Correct Number");
    numberSquare.textContent = secretNumber;
    document.body.style.backgroundColor = "#60b347";
    document.querySelector(".guess").setAttribute("disabled", true);
    //if score greater than highscore save it in highscore
    if (score > highscore) {
      highscore = score;
      highscoreSpan.textContent = highscore;
      localStorage.setItem("highscore", JSON.stringify(highscore));
    }
  }
  //if guess not equal secretNumber
  else if (guess != secretNumber) {
    // if score greater than 1 display message depends on number state and decrease score number
    if (score > 1) {
      displayMessage(guess > secretNumber ? "High Number 📈" : "Low Number 📉");
      score--;
      scoreSpan.textContent = score;
    }
    //else you lost the game
    else {
      scoreSpan.textContent = 0;
      displayMessage("You lost the game 💥💥");
      document.body.style.backgroundColor = "rgb(161 22 0)";
      document.querySelector(".guess").setAttribute("disabled", true);
      numberSquare.textContent = "😑";
    }
  }
});
// ================================Again Button===================================================
againButton.addEventListener("click", function () {
  //regenerate number
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  // reset init value for score
  score = 20;
  scoreSpan.textContent = score;

  //reset main color for bg
  document.body.style.backgroundColor = "#222";

  //remove number or emo from square
  numberSquare.textContent = "?";

  //enter starter message
  displayMessage("Start guessing...");

  //make guess input empty
  document.querySelector(".guess").value = "";

  //remove disabled attr from guess input
  document.querySelector(".guess").removeAttribute("disabled");
});
