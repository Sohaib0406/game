let currentPlayer = 'X';
let setupPhase = true;
let remainingX = 3;
let remainingO = 3;
let selectedCellIndex = null;
let selectedSymbol = null;

function checkSymbolsCount() {
    const cells = document.querySelectorAll('.cell');
    let xCount = 0;
    let oCount = 0;
    let invalidPlacement = false;
    cells.forEach(cell => {
        if (cell.textContent === 'X') {
            xCount++;
        } else if (cell.textContent === 'O') {
            oCount++;
        }
    

    const cellIndex = Array.from(cells).indexOf(cell);
        if (!setupPhase && !checkPlacementValidity(cellIndex)) {
            invalidPlacement = true;
        }
    });

    if (!setupPhase && (xCount !== 3 || oCount !== 3)) {
        alert("Missing 'X' or 'O'. Please ensure there are exactly 3 'X' and 3 'O' before starting the game.");
        return false;
    }

    if (invalidPlacement) {
        alert("Invalid placement. You cannot have more than 2 'X' or 'O' symbols vertically or horizontally adjacent to each other.");
        return false;
    }


    return true;
}

function checkPlacementValidity(cellIndex) {
    const cells = document.querySelectorAll('.cell');
    const cell = cells[cellIndex];
    const rowIndex = Math.floor(cellIndex / 3);
    const colIndex = cellIndex % 3;

    let horizontalCount = 1;
    for (let i = colIndex - 1; i >= 0; i--) {
        if (cells[rowIndex * 3 + i].textContent === cell.textContent) {
            horizontalCount++;
        } else {
            break;
        }
    }
    for (let i = colIndex + 1; i < 3; i++) {
        if (cells[rowIndex * 3 + i].textContent === cell.textContent) {
            horizontalCount++;
        } else {
            break;
        }
    }

    let verticalCount = 1;
    for (let i = rowIndex - 1; i >= 0; i--) {
        if (cells[i * 3 + colIndex].textContent === cell.textContent) {
            verticalCount++;
        } else {
            break;
        }
    }
    for (let i = rowIndex + 1; i < 3; i++) {
        if (cells[i * 3 + colIndex].textContent === cell.textContent) {
            verticalCount++;
        } else {
            break;
        }
    }

    if (!setupPhase) {
        if (cell.textContent === 'X' && horizontalCount > 2 || verticalCount > 2) {
             return false;
        } else if (cell.textContent === 'O' && (horizontalCount > 2 || verticalCount > 2)) {
            
            return false;
        }
    }

    return true;
}
function handleCellClick(cellIndex) {
    if (!checkSymbolsCount()) {
        return;
    }

    const targetCell = document.querySelectorAll('.cell')[cellIndex];
    const targetCellContent = targetCell.textContent;

    if (setupPhase) {
        if (!targetCellContent) {
            if (currentPlayer === 'X' && remainingX > 0) {
                targetCell.textContent = 'X';
                remainingX--;
            } else if (currentPlayer === 'O' && remainingO > 0) {
                targetCell.textContent = 'O';
                remainingO--;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
        return;
    }

    if (!checkPlacementValidity(cellIndex)) {
        return; 
    }

    if (selectedCellIndex === null) {
        if (targetCellContent === currentPlayer) {
            selectedCellIndex = cellIndex;
        }
    } else {
        const sourceCell = document.querySelectorAll('.cell')[selectedCellIndex];
        const sourceCellContent = sourceCell.textContent;

        const sourceRow = Math.floor(selectedCellIndex / 3);
        const sourceCol = selectedCellIndex % 3;
        const targetRow = Math.floor(cellIndex / 3);
        const targetCol = cellIndex % 3;

        if ((Math.abs(sourceRow - targetRow) === 1 && sourceCol === targetCol) ||
            (Math.abs(sourceCol - targetCol) === 1 && sourceRow === targetRow)) {
            if (!targetCellContent) {
                targetCell.textContent = sourceCellContent;
                sourceCell.textContent = '';
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                checkWin();
            }
        }

        selectedCellIndex = null;
    }
}
function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        const symbolA = cells[a].textContent;
        const symbolB = cells[b].textContent;
        const symbolC = cells[c].textContent;

        if (symbolA && symbolA === symbolB && symbolA === symbolC) {
            const winner = currentPlayer === 'X' ? 'O' : 'X';
            alert(winner + ' wins!');
            resetGame();
            return;
        }
    }
}

function resetGame() {
    currentPlayer = 'X';
    setupPhase = true;
    remainingX = 3;
    remainingO = 3;
    selectedCellIndex = null;
    selectedSymbol = null;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('startButton').disabled = false;
}

function startGame() {
    currentPlayer = 'X'; 
    setupPhase = false;
    document.getElementById('startButton').disabled = true;
}

document.getElementById('startButton').addEventListener('click', startGame);

document.getElementById('restartButton').addEventListener('click', resetGame);


document.getElementById('startButton').disabled = false;


document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', () => {
        if (setupPhase) {
            handleCellClick(Array.from(document.querySelectorAll('.cell')).indexOf(cell));
        } else {
            handleCellClick(Array.from(document.querySelectorAll('.cell')).indexOf(cell));
        }
    });
});

function generateInviteLink() {
    const player1Name = prompt("Enter your name:");
    const player2Name = prompt("Enter your friend's name:");
    const inviteLink = window.location.origin + "/?player1=" + player1Name + "&player2=" + player2Name;
    alert("Share this link with your friend: " + inviteLink);
}

document.getElementById('inviteButton').addEventListener('click', generateInviteLink);

function getPlayerNamesFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const player1Name = urlParams.get('player1') || 'Player 1';
    const player2Name = urlParams.get('player2') || 'Player 2';
    return { player1Name, player2Name };
}

const { player1Name, player2Name } = getPlayerNamesFromURL();
document.getElementById('player1').textContent = player1Name;
document.getElementById('player2').textContent = player2Name;