const cell = document.querySelector('.cell');
const gameboard = document.querySelector('.gameboard');
const boardContainer = document.querySelector('.board-container');
const gameboardContainer = document.querySelector('.gameboard-container');

cell.addEventListener('click', () => {
    const x = cell.dataset.x;
    const y = cell.dataset.y;
    //const playerBoard = player1.playerBoard;
    //playerBoard.receiveAttack(x, y);
    //updateGameboard();
    console.log(x, y);
});

export default cell;