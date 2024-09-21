import { create } from './domHelpers.js';

export function elements(name) {
    const gameContainer = document.querySelector('.game-container');
    const gameboardContainer1 = create('div', 'gameboard-container', gameContainer);
    gameboardContainer1.classList.add('box');
    const span1 = create('span', 'player', gameboardContainer1);
    span1.innerHTML = 'CPU';
    const i1 = create('i', 'water-container', gameboardContainer1);
    const gameboardContainer2 = create('div', 'gameboard-container', gameContainer);
    gameboardContainer2.classList.add('box');
    const span2 = create('span', 'player', gameboardContainer2);
    span2.innerHTML = `${name}`;
    const i2 = create('i', 'water-container', gameboardContainer2);
    const logContainer1 = create('div', 'log-container', gameContainer);
    const logContainer2 = create('div', 'log-container', gameContainer);
    const divGameboard1 = create('div', 'gameboard-player1', gameboardContainer1);
    const divGameboard2 = create('div', 'gameboard-player2', gameboardContainer2);

    logContainer1.innerHTML = '<p>Log CPU</p><p class=" CPU"></p>';
    logContainer2.innerHTML = '<p>Log Player</p><p class=" P1"></p>';

    function createCells() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell1 = document.createElement('div');
                cell1.classList.add('cell');
                cell1.dataset.x = j;
                cell1.dataset.y = i;
                divGameboard1.appendChild(cell1);
    
                const cell2 = document.createElement('div');
                cell2.classList.add('cell');
                cell2.dataset.x = j;
                cell2.dataset.y = i;
                divGameboard2.appendChild(cell2);
            }
        }
    }

    createCells();

    const cells = Array.from(divGameboard1.querySelectorAll('.cell'));

    return {
        divGameboard1,
        divGameboard2,
        logContainer1,
        logContainer2,
        cells,
    }
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
