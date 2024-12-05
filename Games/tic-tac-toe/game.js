const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Initialize game state
let currentPlayer = 'X'; // Player 1 starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let isGameOver = false; // To prevent further moves after game ends

// Initialize the game board
function createBoard() {
  board.innerHTML = ''; // Clear the board before re-rendering
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.addEventListener('click', () => makeMove(index));
    cellDiv.textContent = cell;
    board.appendChild(cellDiv);
  });
}

// Handle a player making a move
function makeMove(index) {
  if (gameBoard[index] || isGameOver) return; // Prevent overwrite or move after game over
  gameBoard[index] = currentPlayer;
  createBoard(); // Re-render the board
  checkWinner(); // Check if there is a winner
  if (!isGameOver) {
    togglePlayer(); // Switch player turn
  }
}

// Toggle between Player 1 and Player 2
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer === 'X' ? 1 : 2}'s turn (${currentPlayer})`;
}

// Check if a player has won the game
function checkWinner() {
  const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      // Winner found
      isGameOver = true;
      status.textContent = `Player ${currentPlayer === 'X' ? 1 : 2} wins! Congratulations!`;
      return;
    }
  }

  // Check for a draw (if the board is full and no winner)
  if (!gameBoard.includes('')) {
    isGameOver = true;
    status.textContent = "It's a draw! No winners.";
  }
}

// Reset the game
resetBtn.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  status.textContent = "Player 1's turn (X)";
  createBoard();
});

// Start the game
createBoard();
