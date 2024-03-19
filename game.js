let currentPlayer = 'X';
let setupPhase = true;
let remainingX = 3;
let remainingO = 3;
let selectedCellIndex = null;
let selectedSymbol = null;

function handleCellClick(cellIndex) {
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