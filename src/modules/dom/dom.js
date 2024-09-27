import { create } from './domHelpers.js';

const gameContainer = document.querySelector('.game-container');
export function elementsPlayer(name) {
    const boardContainer = create('div', 'board-container', gameContainer);
    const gameboardContainer1 = create('div', 'gameboard-container', boardContainer);
    gameboardContainer1.classList.add('box');
    const span1 = create('span', 'player', gameboardContainer1);
    span1.innerHTML = `${name}'s waters`;
    create('i', 'water-container', gameboardContainer1);
    const divGameboard1 = create('div', 'gameboard-player1', gameboardContainer1);
    const logContainer1 = create('div', 'log-container', boardContainer);
    logContainer1.innerHTML = '<p>Your log</p><p class=" CPU"></p>';


    
    


    function createCells() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell1 = create('div', 'cell', divGameboard1);
                cell1.dataset.x = j;
                cell1.dataset.y = i;
            }
        }
    }

    createCells();
    shipsSelector()

    return {
        divGameboard1,
    }
}

function shipsSelector() {
    const shipsContainer = create('div', 'ships-container', gameContainer);

    const shipsData = [
        { length: 2, name: 'Destroyer', symbol: 'D' },
        { length: 3, name: 'Submarine', symbol: 'S' },
        { length: 3, name: 'Cruiser', symbol: 'C' },
        { length: 4, name: 'Battleship', symbol: 'B' },
        { length: 5, name: 'Carrier', symbol: 'A' },
    ];

    shipsData.forEach(ship => {
        const shipCard = create('div', 'ship-card', shipsContainer);
        const shipName = create('p', 'ship-name', shipCard);
        shipName.innerHTML = ship.name;
        const shipImg = create('img', 'ship-img', shipCard);
        shipImg.src = `../src/assets/img/${ship.name}.svg`;
        shipImg.setAttribute('id', `${ship.name}` );
})
}
export function elementsCPU() {
    const boardContainer = create('div', 'board-container', gameContainer);
    const gameboardContainer2 = create('div', 'gameboard-container', boardContainer);
    gameboardContainer2.classList.add('box');
    const span2 = create('span', 'player', gameboardContainer2);
    span2.innerHTML = `Enemy waters`;
    create('i', 'water-container', gameboardContainer2);
    const logContainer2 = create('div', 'log-container', boardContainer);
    const divGameboard2 = create('div', 'gameboard-player2', gameboardContainer2);
    logContainer2.innerHTML = '<p>Enemy log</p><p class=" P1"></p>';

    function createCells() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) { 
                const cell2 = create('div', 'cell', divGameboard2);
                cell2.dataset.x = j;
                cell2.dataset.y = i;
            }
        }
    }

    createCells();

}

function typeWriter(text, element, speed = 45) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

export function hitMessage(player) {
    const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU'); 
    newParagraph.innerHTML = '';
    const message = `${player.name}'s ship has been hit!`;
    typeWriter(message, newParagraph);
}

export function missMessage(player) {
    const newParagraph = player.name === 'CPU' ? document.querySelector('.CPU') : document.querySelector('.P1'); 
    newParagraph.innerHTML = '';
    const message = `${player.name}'s attack missed!`;
    typeWriter(message, newParagraph);
}

export function sunkMessage(ship, player) {
    const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU');
    newParagraph.innerHTML = ''; 
    const message = `${player.name}'s ${ship.name} has been sunk!`;
    typeWriter(message, newParagraph);
}
