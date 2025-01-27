let currentPlayer = 'red';
let gameActive = true;
let player1Wins = 0;
let player2Wins = 0;
const rows = 6;
const columns = 7;
let board = Array.from({ length: rows }, () => Array(columns).fill(null));

const boardElement = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const scoreboard = document.getElementById('scoreboard');

function createBoard() {
  boardElement.innerHTML = '';
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

function handleCellClick(event) {
  if (!gameActive) return;

  const col = event.target.dataset.col;
  const column = board.map(row => row[col]);

  const emptyRow = column.lastIndexOf(null);

  if (emptyRow === -1) return;

  board[emptyRow][col] = currentPlayer;
  const cell = boardElement.children[emptyRow * columns + parseInt(col)];
  cell.classList.add(currentPlayer);

  if (checkWinner(emptyRow, col)) {
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
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    gameStatus.textContent = `${currentPlayer === 'red' ? 'Player 1 (Red)' : 'Player 2 (Yellow)'}'s turn`;
  }
}

function checkWinner(row, col) {
  return (
    checkDirection(row, col, 1, 0) ||
    checkDirection(row, col, 0, 1) ||
    checkDirection(row, col, -1, 0) ||
    checkDiagonal(row, col, 1, 1) ||
    checkDiagonal(row, col, -1, 1)
  );
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 1;

  for (let i = 1; i < 4; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  for (let i = 1; i < 4; i++) {
    const r = row - i * rowDir;
    const c = col - i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  return count >= 4;
}

function checkDiagonal(row, col, rowDir, colDir) {
  let count = 1;

  for (let i = 1; i < 4; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  for (let i = 1; i < 4; i++) {
    const r = row - i * rowDir;
    const c = col - i * colDir;
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== currentPlayer) break;
    count++;
  }

  return count >= 4;
}

function resetGame() {
  board = Array.from({ length: rows }, () => Array(columns).fill(null));
  gameActive = true;
  currentPlayer = 'red';
  gameStatus.textContent = "Player 1's turn (Red)";
  createBoard();
}

function updateScoreboard() {
  scoreboard.textContent = `Player 1 (Red): ${player1Wins} Wins | Player 2 (Yellow): ${player2Wins} Wins`;
}

createBoard();
