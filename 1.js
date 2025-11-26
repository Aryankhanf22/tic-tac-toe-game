const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const board = document.querySelector('.board');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            // Highlight winning cells with animation
            highlightWinningCells(pattern);
            setStatus(`${currentPlayer} Wins!`);
            return;
        }
    }

    // If no winner and board is full, it's a tie
    if (!gameBoard.includes('')) {
        gameActive = false;
        setStatus('It\'s a Tie!');
    }
}

function setStatus(message) {
    status.innerText = message;
}

function handleCellClick(event) {
    const index = Array.from(cells).indexOf(event.target); // Get the index of clicked cell

    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    // Add the class to apply the white color
    event.target.classList.add(currentPlayer.toLowerCase()); // Adds 'x' or 'o' class

    checkWinner();

    // Switch player turn
    if (gameActive) {
        if (currentPlayer === 'X') {
            currentPlayer = 'O'; // Switch to Player O
            setStatus(`Player O's turn`);
        } else {
            currentPlayer = 'X'; // Switch to Player X
            setStatus(`Player X's turn`);
        }
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winning-cell', 'x', 'o'); // Remove winning styles and player colors
    });
    setStatus(`Player X's turn`);
}

function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        cells[index].classList.add('winning-cell'); // Add class for flip animation
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
