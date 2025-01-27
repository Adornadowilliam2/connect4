let currentPlayer = 'red'; // Player 1 starts (red)
let gameActive = true;
let player1Wins = 0;
let player2Wins = 0;
const rows = 6;
const columns = 7;
let board = Array.from({ length: rows }, () => Array(columns).fill(null));

const boardElement = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const scoreboard = document.getElementById('scoreboard');

// Create the game board
function createBoard() {
  boardElement.innerHTML = ''; // Clear the board
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

// Handle a cell click event
function handleCellClick(event) {
  if (!gameActive) return;

  const col = event.target.dataset.col;
  const column = board.map(row => row[col]); // Get the column values

  // Find the first empty row in the selected column
  const emptyRow = column.lastIndexOf(null);

  if (emptyRow === -1) return; // Column is full

  // Place the piece
  board[emptyRow][col] = currentPlayer;
  const cell = boardElement.children[emptyRow * columns + parseInt(col)];
  cell.classList.add(currentPlayer);

  // Check if the current player has won
  if (checkWinner(emptyRow, col)) {
    // Update the win count and display the winner
    if (currentPlayer === 'red') {
      player1Wins++;
      alert('Player 1 (Red) Wins!');
    } else {
      player2Wins++;
      alert('Player 2 (Yellow) Wins!');
    }
    gameActive = false;
    updateScoreboard();
  } else {
    // Switch players
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    gameStatus.textContent = `${currentPlayer === 'red' ? 'Player 1 (Red)' : 'Player 2 (Yellow)'}'s turn`;
  }
}

// Check if there is a winner
function checkWinner(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // Horizontal (left-right)
    checkDirection(row, col, 0, 1) || // Vertical (downwards)
    checkDirection(row, col, -1, 0) || // Vertical (upwards)
    checkDiagonal(row, col, 1, 1) || // Diagonal (top-left to bottom-right)
    checkDiagonal(row, col, -1, 1)   // Diagonal (bottom-left to top-right)
  );
}

// Check for horizontal and vertical connection
function checkDirection(row, col, rowDir, colDir) {
  let count = 1; // Start with the current piece

  // Check one direction (forward)
  for (let i = 1; i < 4; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  // Check in the opposite direction (backward)
  for (let i = 1; i < 4; i++) {
    const r = row - i * rowDir;
    const c = col - i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  return count >= 4; // We need 4 connected pieces
}

// Check for diagonal connections
function checkDiagonal(row, col, rowDir, colDir) {
  let count = 1; // Start with the current piece

  // Check one direction (forward)
  for (let i = 1; i < 4; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  // Check in the opposite direction (backward)
  for (let i = 1; i < 4; i++) {
    const r = row - i * rowDir;
    const c = col - i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  return count >= 4; // We need 4 connected pieces
}

// Reset the game
function resetGame() {
  board = Array.from({ length: rows }, () => Array(columns).fill(null));
  gameActive = true;
  currentPlayer = 'red';
  gameStatus.textContent = "Player 1's turn (Red)";
  createBoard();
}

// Update the scoreboard
function updateScoreboard() {
  scoreboard.textContent = `Player 1 (Red): ${player1Wins} Wins | Player 2 (Yellow): ${player2Wins} Wins`;
}

createBoard();
