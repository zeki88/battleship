export const divGameboard1 = document.querySelector('.gameboard-player1');
export const divGameboard2 = document.querySelector('.gameboard-player2');
//import gameboard from "./controller.js";

/*export async function start () {
    return new Promise(resolve => {
        document.body.innerHTML += '<div class="game-container"><div class="gameboard-container"><h1>Player 1</h1><div class="gameboard-player1"></div></div><div class="gameboard-container"><h1>Player 2</h1><div class="gameboard-player2"></div></div><div class="log-container"><p>Log CPU</p><p class=" CPU"></p></div><div class="log-container"><p>Log Player</p><p class=" P1"></p></div></div>'
        resolve();
    }).then(createCells());*/
    /*const gameContainer = createDiv('game-container', document.body);
    const gameboardContainer1 = createDiv('gameboard-container', gameContainer);
    const gameboardContainer2 = createDiv('gameboard-container', gameContainer);
    const logContainer1 = createDiv('log-container', gameContainer);
    const logContainer2 = createDiv('log-container', gameContainer);
    const gameboardPlayer1 = createDiv('gameboard-player1', gameboardContainer1);
    const gameboardPlayer2 = createDiv('gameboard-player2', gameboardContainer2);

    gameboardContainer1.innerHTML += '<h1>Player 1</h1>';
    gameboardContainer2.innerHTML += '<h1>Player 2</h1>';
    logContainer1.innerHTML = '<p>Log CPU</p><p class=" CPU"></p>';
    logContainer2.innerHTML = '<p>Log Player</p><p class=" P1"></p>';
}*/

//start();

/*function createDiv(className, parent) {
    const div = document.createElement('div');
    div.classList.add(className);
    parent.appendChild(div);
    return div;
}*/
export async function createCells() {

    //const divGameboard1 = document.querySelector('.gameboard-player1');
    //const divGameboard2 = document.querySelector('.gameboard-player2');
   
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = j;
            cell.dataset.y = i;
            divGameboard2.appendChild(cell);
        }
    }
    
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = j;
            cell.dataset.y = i;
            divGameboard1.appendChild(cell);
        }
    }
}

export async function cells () {
    //await createCells();
    /*const cell = divGameboard1.querySelectorAll('.cell');
    const array = Array.from(cell);
    return  array;*/
    return new Promise(resolve => {
        //start();
        createCells();
        //const cell = divGameboard1.querySelectorAll('.cell');
        //const array = Array.from(cell);
        resolve();
    }).then(() => {
        const cell = divGameboard1.querySelectorAll('.cell')
        const array = Array.from(cell);
        return array;
    });
}

function typeWriter(text, element, speed = 50) {
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

export async function hitMessage(player) {
    const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU'); 
    newParagraph.innerHTML = '';
    const message = `${player.name}'s ship has been hit!`;
    typeWriter(message, newParagraph);
}

export async function missMessage(player) {
    const newParagraph = player.name === 'CPU' ? document.querySelector('.CPU') : document.querySelector('.P1'); 
    newParagraph.innerHTML = '';
    const message = `${player.name}'s attack missed!`;
    typeWriter(message, newParagraph);
}

export async function sunkMessage(ship, player) {
    const newParagraph = player.name === 'CPU' ? document.querySelector('.P1') : document.querySelector('.CPU');
    newParagraph.innerHTML = ''; 
    const message = `${player.name}'s ${ship.name} has been sunk!`;
    typeWriter(message, newParagraph);
}