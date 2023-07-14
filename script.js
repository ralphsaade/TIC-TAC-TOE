// Get HTML Elements
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const gameBoard = document.getElementById('game-board');
const winnerAnnouncement = document.getElementById('winner-announcement');
const cells = document.getElementsByClassName('cell');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Function to handle user cell click
function cellClicked(e) {
    const clickedCell = e.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    let win = checkWin();
    if (win) {
        gameActive = false;
        win.forEach(index => {
            cells[index].classList.add('winning');
            cells[index].appendChild(createLineThrough(win));
        });
        if (currentPlayer === 'X') {
            player1Score.textContent = parseInt(player1Score.textContent) + 1;
        } else {
            player2Score.textContent = parseInt(player2Score.textContent) + 1;
        }
        winnerAnnouncement.textContent = `${currentPlayer === 'X' ? player1Input.value : player2Input.value} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check winning conditions
function checkWin() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            return winCondition;
        }
    }
    return null;
}

// Function to create a line through the winning cells
function createLineThrough(win) {
    let line = document.createElement('div');
    line.classList.add('line-through');
    if (win[0] === win[1] - 1 && win[1] - 1 === win[2] - 2) { // horizontal win
        line.classList.add('horizontal');
    } else if (win[0] === win[1] - 3 && win[1] - 3 === win[2] - 6) { // vertical win
        line.classList.add('vertical');
    } else if (win[0] === win[1] - 4 && win[1] - 4 === win[2] - 8) { // diagonal descending win
        line.classList.add('diagonal', 'desc');
    } else if (win[0] === win[1] - 2 && win[1] - 2 === win[2] - 4) { // diagonal ascending win
        line.classList.add('diagonal', 'asc');
    }
    setTimeout(() => line.classList.add('show'), 50);
    return line;
}

// Function to reset the game
function resetGame() {
    if (!gameActive && player1Input.value && player2Input.value) {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        winnerAnnouncement.textContent = "";
        Array.from(cells).forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('winning');
            let line = cell.querySelector('.line-through');
            if (line) cell.removeChild(line);
        });
    }
}


// Adding Event Listener to cells
Array.from(cells).forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

// Adding Event Listener to reset button
document.getElementById('reset-button').addEventListener('click', resetGame);
