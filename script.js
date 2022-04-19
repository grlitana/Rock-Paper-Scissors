const container = document.querySelector(".container");
const playerButtons = document.querySelectorAll(".btn-player");
const computerButtons = document.querySelectorAll(".btn-computer");
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("computer-score");
const roundInfo = document.getElementById("round-info");
const roundWinner = document.getElementById("round-winner");
const retryBtn = document.getElementById("restartBtn");

let winner = "";
let playerScore = 0;
let computerScore = 0;
let round = 0;
let gameEnds = false;

playerButtons.forEach((selection) =>
  selection.addEventListener("click", () => {
    if (!gameEnds) {
      game(selection.id);
    }
  })
);

retryBtn.addEventListener("click", () => {
  window.location.reload(true);
});

function game(playerSelection) {
  let computerSelection = computerPlay();

  gameRound(playerSelection, computerSelection);

  playerButtons.forEach(button => button.classList.remove("active"))
  computerButtons.forEach(button => button.classList.remove("active"))

  var userSelection = document.getElementById(playerSelection);
  var compSelection = document.getElementById(computerSelection + "-comp");

  userSelection.className += " active";
  compSelection.className += " active";

  userScore.textContent = "YOU: " + playerScore;
  compScore.textContent = "COMPUTER: " + computerScore;
  roundInfo.textContent = "Round " + round;
  roundWinner.textContent = winner;

  //Check if game is over
  if (playerScore == 5 || computerScore == 5) {
    roundInfo.textContent = playerScore == 5 ? "YOU WON!" : "YOU LOST";
    roundWinner.textContent =
      playerScore == 5
        ? "You scored 5 points after " + round + " rounds"
        : "Computer scored 5 points after " + round + " rounds";
    gameEnds = true;
    retryBtn.style.display = "inline-block";
  }
}

function computerPlay() {
  let choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function gameRound(playerSelection, computerSelection) {
  if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper")
  ) {
    winner = "You win this round!";
    playerScore++;
  } else if (
    (computerSelection == "rock" && playerSelection == "scissors") ||
    (computerSelection == "paper" && playerSelection == "rock") ||
    (computerSelection == "scissors" && playerSelection == "paper")
  ) {
    winner = "Computer wins this round!";
    computerScore++;
  } else {
    winner = "It's a tie!";
  }

  round++;
}
