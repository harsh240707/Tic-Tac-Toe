const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

function checkWinner() {
  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = Player ${board[a]} wins!;
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function cellClicked(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = Player ${currentPlayer}'s turn;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = "Player X's turn";