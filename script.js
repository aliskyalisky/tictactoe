const gameBoard = document.querySelector('.gameboard')
const resetBtn = document.querySelector('.resetbtn');
const infoBox = document.querySelector('.infoboxp')
const nameInput1 = document.querySelector('#nameinput1')
const nameInput2 = document.querySelector('#nameinput2')
const playButton = document.querySelector('#playbutton')
const inputBox = document.querySelector('.userinfo')
const contentArea = document.querySelector('.content')



let playerTurn = 1;
let gameBoxes;
let emptyBoxes = 9;
let winnerDeclared = false;
infoBox.textContent = '';

let player1 = {
    name: '',
    marker: 'X',
    mark: function(e) {
        let box = e.target
        box.innerHTML = player1.marker
        box.classList.add('classX')
        checkWin();
        checkTie();
    }
}

let player2 = {
    name: '',
    marker: 'O',
    mark: function(e) {
        let box = e.target
        box.innerHTML = player2.marker
        box.classList.add('classO')
        checkWin();
        checkTie();
    }
}

const executeMark = (e) => {
    let box = e.target;

    if (winnerDeclared === true) {
        return;
    }

    if (playerTurn === 1 && box.innerHTML === '') {
        emptyBoxes = --emptyBoxes;
        infoBox.textContent = `Your turn ${player2.name}!`
        player1.mark(e)
        playerTurn = 2;
        return;
    } else if (playerTurn === 2 && box.innerHTML === '') {
        emptyBoxes = --emptyBoxes;
        infoBox.textContent = `Your turn ${player1.name}!`
        player2.mark(e)
        playerTurn = 1;
        return;
    }
}


const initBoard = (() => {
    gameBoard.innerHTML = '';
    let boxes = [];
    emptyBoxes = 9;
    winnerDeclared = false;
    displayNames();
    
    for (let i = 0; i < 9; i++) {
       let box = document.createElement('div');
       box.classList.add('gamebox');
       box.onclick = executeMark;
       gameBoard.appendChild(box)
       boxes.push(box);
    }

    gameBoxes = boxes;

    if (playerTurn === 1) {
        infoBox.textContent = `Make your move ${player1.name}!`
    } else if (playerTurn === 2) {
        infoBox.textContent = `Make your move ${player2.name}!`
    }

});

function displayNames() {
    const displayName1 = document.querySelector('.player1name')
    const displayName2 = document.querySelector('.player2name') 
    const displayMarker1 = document.querySelector('.player1marker')
    const displayMarker2 = document.querySelector('.player2marker')

    displayName1.textContent = `${player1.name}`
    displayName2.textContent = `${player2.name}`
    displayMarker1.textContent = `${player1.marker}`
    displayMarker2.textContent = `${player2.marker}`
}



const gameStart = () => {
    player1.name = nameInput1.value;
    player2.name = nameInput2.value;
    initBoard();

    inputBox.classList.toggle('closed')
    playButton.classList.toggle('closed')
    contentArea.classList.toggle('blur')
}



resetBtn.addEventListener('click', initBoard);
playButton.addEventListener('click', gameStart)



const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
];

const checkWin = () => {
    winCombos.forEach((item) => {
        if (gameBoxes[item[0]].classList.contains('classX') && gameBoxes[item[1]].classList.contains('classX') && gameBoxes[item[2]].classList.contains('classX')) {
            winnerDeclared = true;
            infoBox.textContent = `${player1.name} wins!`
        } 
        if (gameBoxes[item[0]].classList.contains('classO') && gameBoxes[item[1]].classList.contains('classO') && gameBoxes[item[2]].classList.contains('classO')) {
            winnerDeclared = true;
            infoBox.textContent = `${player2.name} wins!`
        } 
    });
}

const checkTie = () => {
    if (emptyBoxes > 0) {
        return;
    } else if (emptyBoxes === 0 && winnerDeclared === false) {
        infoBox.textContent = 'It\'s a tie!'
    }
}
