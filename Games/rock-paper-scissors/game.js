const status = document.getElementById('status');
const player1ChoiceText = document.getElementById('player1ChoiceText');
const player2ChoiceText = document.getElementById('player2ChoiceText');
const resetBtn = document.getElementById('resetBtn');

// Game state variables
let player1Choice = '';
let player2Choice = '';
let isGameOver = false;

// Event listeners for Player 1's buttons
document.getElementById('player1Rock').addEventListener('click', () => playerChoice(1, 'rock'));
document.getElementById('player1Paper').addEventListener('click', () => playerChoice(1, 'paper'));
document.getElementById('player1Scissors').addEventListener('click', () => playerChoice(1, 'scissors'));

// Event listeners for Player 2's buttons
document.getElementById('player2Rock').addEventListener('click', () => playerChoice(2, 'rock'));
document.getElementById('player2Paper').addEventListener('click', () => playerChoice(2, 'paper'));
document.getElementById('player2Scissors').addEventListener('click', () => playerChoice(2, 'scissors'));

// Function to handle player choices
function playerChoice(player, choice) {
  if (isGameOver) return; // Prevent further choices after game is over

  if (player === 1) {
    // Player 1's choice
    player1Choice = choice;
    player1ChoiceText.classList.remove('hidden');
    
    // Hide Player 1's options and show Player 2's options
    document.getElementById('player1Rock').classList.add('hidden');
    document.getElementById('player1Paper').classList.add('hidden');
    document.getElementById('player1Scissors').classList.add('hidden');
    
    // Enable Player 2 to make a move
    document.getElementById('player2Rock').classList.remove('hidden');
    document.getElementById('player2Paper').classList.remove('hidden');
    document.getElementById('player2Scissors').classList.remove('hidden');
    
    status.textContent = "Player 2, make your move!";
  } else if (player === 2) {
    // Player 2's choice
    player2Choice = choice;
    player2ChoiceText.classList.remove('hidden');
    
    // Hide Player 2's options after selection
    document.getElementById('player2Rock').classList.add('hidden');
    document.getElementById('player2Paper').classList.add('hidden');
    document.getElementById('player2Scissors').classList.add('hidden');
    
    // Reveal both players' choices after Player 2 selects
    checkWinner();
  }
}

// Function to check the winner
function checkWinner() {
  if (player1Choice === player2Choice) {
    status.textContent = "It's a draw!";
  } else if (
    (player1Choice === 'rock' && player2Choice === 'scissors') ||
    (player1Choice === 'scissors' && player2Choice === 'paper') ||
    (player1Choice === 'paper' && player2Choice === 'rock')
  ) {
    status.textContent = 'Player 1 wins! Congratulations!';
  } else {
    status.textContent = 'Player 2 wins! Congratulations!';
  }

  isGameOver = true; // End the game
  resetBtn.classList.remove('hidden'); // Show the reset button
}

// Restart the game
resetBtn.addEventListener('click', () => {
  player1Choice = '';
  player2Choice = '';
  isGameOver = false;
  player1ChoiceText.classList.add('hidden');
  player2ChoiceText.classList.add('hidden');
  status.textContent = 'Player 1, make your move!';
  
  // Show Player 1's choices again
  document.getElementById('player1Rock').classList.remove('hidden');
  document.getElementById('player1Paper').classList.remove('hidden');
  document.getElementById('player1Scissors').classList.remove('hidden');
  
  // Hide Player 2's choices until Player 1 makes their choice
  document.getElementById('player2Rock').classList.add('hidden');
  document.getElementById('player2Paper').classList.add('hidden');
  document.getElementById('player2Scissors').classList.add('hidden');
  
  resetBtn.classList.add('hidden'); // Hide reset button
});
