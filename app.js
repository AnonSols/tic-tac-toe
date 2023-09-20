window.onload = () => {
    startGame()
}

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
]
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessage  = document.querySelector('[data-winning-message-text]')
const winningDisplay = document.querySelector('.winning-message')
const restartButton = document.getElementById('restartButton')
const date = document.getElementById('date')
let circleTurn;

console.log(cellElement)

function startGame() {
    circleTurn = false;
    cellElement.forEach( cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleEvent)
        cell.addEventListener('click', handleEvent, {once:true})
    })
    setBoardHoverClass()
    winningDisplay.classList.remove('show')
    newDate()
}

function handleEvent(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS

    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endgame(false)
    } else if (isDraw()) {
        endgame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}


function endgame( draw ) {
    if ( draw ) {
        winningMessage.innerText = "It's a draw! "
    }
    else {
        winningMessage.innerText = `${circleTurn ? " O's wins ": "X's wins"}`
    }
    winningDisplay.classList.add("show")
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}


function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    if(circleTurn) {
        board.classList.add(O_CLASS)
    }else board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}

function newDate() {
    let curr = new Date().getFullYear()
    date.innerText = curr
}
restartButton.onclick = () => startGame()
