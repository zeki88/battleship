import { create, createBtn } from './domHelpers.js';
import { elements } from './dom.js';
import { handleBoard, initializeBoard } from './controller.js';

const container = document.querySelector('.game-container')

export function startScreen () {
    const startContainer = create('div', 'start-container', container);
    const input = create('input', 'start-input', startContainer);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter name');
    createBtn(() => start(), 'Start Game', startContainer);
}

function start() {
        const name = document.querySelector('.start-input').value;
        container.setAttribute('style', 'grid-template-columns: 1fr 1fr');
        const element = elements(name);
        const players = initializeBoard(name);
        handleBoard(element, players.newPlayer1, players.newPlayer2);
        document.querySelector('.start-container').remove();
}

