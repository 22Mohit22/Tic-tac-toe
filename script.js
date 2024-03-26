const boardContainer = document.querySelector('.board');
const board_Dialog = document.querySelector('.board-dialog');
const player1info = document.querySelector('.player-1-info');
const player2info = document.querySelector('.player-2-info');
const startBtn = document.getElementById('startbtn');
const dialog = document.querySelector('dialog');
const dialogText = document.querySelector('.msg');
const round = document.querySelector('.round');
const closeBtn = document.querySelector('.okbtn');

const gameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];


let player1 = {};
let player2 = {};
let currentPlayer = player1;


count = 1;


function createPlayer(name, sign) {
    return {name, sign};
}


function fillBoard(sign, idx) {

    if(gameBoard[idx] == ' ' && checkWinner() != `${currentPlayer.sign} won`) {
        return gameBoard[idx] = sign;
    } else {
        return null;
    }
}

function checkWinner() {
    if(gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2] && gameBoard[0] != ' ') {
        return `${gameBoard[0]} won`;
    }
    if(gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5] && gameBoard[3] != ' ') {
        return `${gameBoard[3]} won`;
    }
    if(gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8] && gameBoard[6] != ' ') {
        return `${gameBoard[6]} won`;
    }
    
    
    if(gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6] && gameBoard[0] != ' ') {
        return `${gameBoard[0]} won`;
    }
    if(gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7] && gameBoard[1] != ' ') {
        return `${gameBoard[1]} won`;
    }
    if(gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8] && gameBoard[2] != ' ') {
        return `${gameBoard[2]} won`;
    }
    
    
    if(gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8] && gameBoard[0] != ' ') {
        return `${gameBoard[0]} won`;
    }
    if(gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6] && gameBoard[2] != ' ') {
        return `${gameBoard[2]} won`;
    } 
    else {
        return null;
    }
}

function resetBoard(gameBoard) {
    for(let i = 0; i < gameBoard.length; i++){
        gameBoard[i] = ' ';
    }
    return gameBoard;
}

function createDisplayBoard() {
    boardContainer.innerHTML = '';

    for(let i = 0; i < gameBoard.length; i++) {
        const board_box = document.createElement('div');
        board_box.className = 'board-ele';
        board_box.setAttribute('data', i);

        boardContainer.appendChild(board_box);
    }
}

function playerToDisplay(player, targetElement) {
    const playerName = document.createElement('h3');
    playerName.textContent = `${player.name}`;
    playerName.className = 'card-name';
    const playerSign = document.createElement('h4');
    playerSign.textContent = `Sign: ${player.sign}`;
    playerSign.className = 'card-sign';
    const playerScore = document.createElement('h4');
    playerScore.textContent = `Score: ${player.score}`;
    playerScore.className = 'card-score';
    
    targetElement.appendChild(playerName);
    targetElement.appendChild(playerSign);
    targetElement.appendChild(playerScore);
}

function getPlayers() {
    const player1_name = document.getElementById('player-1');
    const player1_sign = document.getElementById('sign-player-1');
    const player2_name = document.getElementById('player-2');
    const player2_sign = document.getElementById('sign-player-2');

    player1.name = player1_name.value;
    player1.sign = player1_sign.value;
    player2.name = player2_name.value;
    player2.sign = player2_sign.value;
    if(player1.sign == 'x' && player2.sign == 'x') {
        player2.sign = 'o';
    }
    if(player1.sign == 'o' && player2.sign == 'o') {
        player2.sign = 'x';
    }
    player1.score = 0;
    player2.score = 0;

    return {player1, player2};

}

function changeTurn(player) {
    if(currentPlayer == player2) {
        currentPlayer = player1;
    } else {
        currentPlayer = player2;
    }
    player = currentPlayer;
    return player;
}

startBtn.addEventListener('click', (e) => {
    player1info.classList.add('active');
    player2info.classList.add('active');
    player1info.textContent = '';
    player2info.textContent = '';
    e.preventDefault();
    createDisplayBoard();
    getPlayers();
    playerToDisplay(player1, player1info);
    playerToDisplay(player2, player2info);
    startBtn.textContent = 'Restart Game';
    board_Dialog.style.display = 'flex';
    count = 1;
    round.textContent = `Round ${count}`;

    
})

boardContainer.addEventListener('click', (e) => {
   handle_X_or_O(e);
   checkDraw();
})

function handle_X_or_O(e) {
    const board_ele = e.target.closest('.board-ele');
    const index = board_ele.getAttribute('data');

    if(board_ele.textContent == '') {
        gameBoard[index] = fillBoard(currentPlayer.sign, index);
        board_ele.textContent = gameBoard[index];
        if(checkWinner() != null){
            currentPlayer.score++;
            if(checkWinner() == `x won`){
                dialogText.textContent = `${player1.name} won`;
            }else{
                dialogText.textContent = `${player2.name} won`;
            };
            dialog.showModal();
        }
        changeTurn(currentPlayer);
        player1info.innerHTML = '';
        playerToDisplay(player1, player1info);
        player2info.innerHTML = '';
        playerToDisplay(player2, player2info);
    }
}

closeBtn.addEventListener('click', () => {
    createDisplayBoard();
    resetBoard(gameBoard);
    dialog.close();
    count++;
    round.textContent = `Round ${count}`;
})

function checkDraw() {
    if((gameBoard[0] != ' ' 
    && gameBoard[1] != ' ' 
    && gameBoard[2] != ' '
    && gameBoard[3] != ' '
    && gameBoard[4] != ' '
    && gameBoard[5] != ' '
    && gameBoard[6] != ' '
    && gameBoard[7] != ' '
    && gameBoard[8] != ' ') && checkWinner() == null) {
        dialog.showModal();
        dialogText.textContent = "Draw";
    }
}
