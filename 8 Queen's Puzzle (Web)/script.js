const n = 8;
let qCnt = 0;
let Q = [], C = [], D1 = [], D2 = [];

function Load() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
            document.getElementById(i + "" + j).innerHTML = "";
        }
    }
    for (let i = 0; i < 2 * n - 1; i++) {
        Q[Math.floor(i / 2)] = -1;
        C[Math.floor(i / 2)] = true;
        D1[i] = true;
        D2[i] = true;
    }
    document.getElementById("startBtn").disabled = false;
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("solveBtn").disabled = true;
}

function IsAllOccupied(n, Q, C, D1, D2) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (Q[i] === -1 && C[j] && D1[(n - 1) + i - j] && D2[i + j]) {
                return false;
            }
        }
    }
    return true;
}

function Start() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = false;
        }
    }
    document.getElementById("startBtn").disabled = true;
    document.getElementById("solveBtn").disabled = false;
}

function Restart() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).innerHTML = "";
        }
    }
    for (let i = 0; i < 2 * n - 1; i++) {
        Q[Math.floor(i / 2)] = -1;
        C[Math.floor(i / 2)] = true;
        D1[i] = true;
        D2[i] = true;
    }
    qCnt = 0;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("solveBtn").disabled = true;
}

let success;
function Solve8Queens(step) {
    if (step === n) {
        success = true;
    }
    else if (Q[step] !== -1) {
        Solve8Queens(step + 1);
    }
    else {
        let move = 0;
        success = false;
        while (move < n && !success) {
            if (Q[step] === -1 && C[move] && D1[(n - 1) + step - move] && D2[step + move]) {
                Q[step] = move;
                C[move] = false;
                D1[(n - 1) + step - move] = false;
                D2[step + move] = false;
                if (!Solve8Queens(step + 1)) {
                    Q[step] = -1;
                    C[move] = true;
                    D1[(n - 1) + step - move] = true;
                    D2[step + move] = true;
                }
            }
            move++;
        }
    }
    return success;
}

function Solve() {
    for (let i = 0; i < 2 * n - 1; i++) {
        Q[Math.floor(i / 2)] = -1;
        C[Math.floor(i / 2)] = true;
        D1[i] = true;
        D2[i] = true;
    }
    Solve8Queens(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (Q[i] === j) {
                document.getElementById(i + "" + j).innerHTML = '<img src="Queen.gif" width="100%" height="80%">';
            }
            else {
                document.getElementById(i + "" + j).innerHTML = "";
            }
            document.getElementById(i + "" + j).disabled = true;
        }
    }
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("solveBtn").disabled = true;
}

function GameOver() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
        }
    }
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("solveBtn").disabled = true;
}

function PlaceQueen(row, col) {
    if (Q[row] === -1 && C[col] && D1[(n - 1) + row - col] && D2[row + col]) {
        document.getElementById(row + "" + col).innerHTML = '<img src="Queen.gif" width="100%" height="80%">';
        document.getElementById(row + "" + col).disabled = true;
        qCnt++;
        Q[row] = col;
        C[col] = false;
        D1[(n - 1) + row - col] = false;
        D2[row + col] = false;
        if (qCnt === n) {
            GameOver();
            alert("Solved!");
        }
        else if (IsAllOccupied(n, Q, C, D1, D2)) {
            GameOver();
            alert("Game Over!");
        }
    }
}

Load();