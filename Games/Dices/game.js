const status = document.getElementById('status');
const player1DiceImg = document.getElementById('player1DiceImg');
const player2DiceImg = document.getElementById('player2DiceImg');
const resetBtn = document.getElementById('resetBtn');
const player1Roll = document.getElementById('player1Roll');
const player2Roll = document.getElementById('player2Roll');
const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');

// Game state variables
let player1Score = 0;
let player2Score = 0;
let isGameOver = false;

// Function to get a random dice number between 1 and 6
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to display the dice image based on the roll value
function displayDice(diceValue, player) {
  const diceImage = `assets/dice-${diceValue}.png`;  // Construct the image path
  if (player === 1) {
    player1DiceImg.src = diceImage;
    player1Dice.classList.remove('hidden');
  } else {
    player2DiceImg.src = diceImage;
    player2Dice.classList.remove('hidden');
  }
}

// Player 1 rolls the dice
player1Roll.addEventListener('click', () => {
  if (isGameOver) return;

  // Roll a random number between 1 and 6 for Player 1
  player1Score = rollDice();
  console.log(`Player 1 rolled: ${player1Score}`); // Debugging log

  // Display Player 1's dice result
  displayDice(player1Score, 1);

  // Change the status message
  status.textContent = "Player 2, click to roll the dice!";

  // Hide Player 1's button and show Player 2's button
  player1Roll.classList.add('hidden');
  player2Roll.classList.remove('hidden');
});

// Player 2 rolls the dice
player2Roll.addEventListener('click', () => {
  if (isGameOver) return;

  // Roll a random number between 1 and 6 for Player 2
  player2Score = rollDice();
  console.log(`Player 2 rolled: ${player2Score}`); // Debugging log

  // Display Player 2's dice result
  displayDice(player2Score, 2);

  // Determine the winner or draw
  if (player2Score > player1Score) {
    status.textContent = "Player 2 wins! Congratulations!";
  } else if (player1Score > player2Score) {
    status.textContent = "Player 1 wins! Congratulations!";
  } else {
    status.textContent = "It's a Draw! Try again!";
  }

  // End the game and show the reset button
  isGameOver = true;
  player2Roll.classList.add('hidden');
  resetBtn.classList.remove('hidden');
});

// Restart the game
resetBtn.addEventListener('click', () => {
  // Reset game state
  player1Score = 0;
  player2Score = 0;
  isGameOver = false;

  // Hide dice images and reset status
  player1Dice.classList.add('hidden');
  player2Dice.classList.add('hidden');
  status.textContent = 'Player 1, click to roll the dice!';
  
  // Show Player 1's roll button and hide Player 2's button
  player1Roll.classList.remove('hidden');
  player2Roll.classList.add('hidden');
  
  // Hide the reset button
  resetBtn.classList.add('hidden');
});
