"use strict";

// ====================================
// PROJECT #3: Pig Game
// Selection & Core Logic
// ====================================

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// ====================================
// Sound Effect
// ====================================
const clickSound = new Audio("sound/click.mp3");

// ====================================
// Game State Variables
// ====================================
let scores, currentScore, activePlayer, playing;

// Initialization Function
const init = function () {
  scores = [0, 0]; // Scores stored in an array [Player 1, Player 2]
  currentScore = 0; // Temporary score for current turn
  activePlayer = 0; // 0 = Player 1, 1 = Player 2
  playing = true; // game state flag

  // Reset UI values
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Hide dice at start
  diceEl.classList.add("hidden");

  // Remove winner classes and reset active player highlight
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

// Helper Function
function switchPlayer() {
  // Reset the current score in the UI for the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // Reset Current Score
  currentScore = 0;

  // Flip activePlayer (0 → 1, or 1 → 0)
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle highlight between players
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// ==================================
// Rolling The Dice
// ==================================
btnRoll.addEventListener("click", () => {
  if (playing) {
    clickSound.play(); // play sound on roll

    // 1. Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// ==================================
// Holding The Score
// ==================================
btnHold.addEventListener("click", () => {
  if (playing) {
    clickSound.play(); // play sound on hold

    // 1. Add currentScore to active player's total
    scores[activePlayer] += currentScore;

    // 2. Update the UI
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 3. Check for win
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// ==================================
// Reset Game
// ==================================
btnNew.addEventListener("click", () => {
  clickSound.play(); // play sound on reset
  init();
});
