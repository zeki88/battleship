import { create, createBtn } from './domHelpers.js';
import { elementsPlayer } from './dom.js';
import { handleBoard } from './controller.js';
import { initializeBoard } from './setupScreen.js';

const container = document.querySelector('.game-container')
const expression = /^[a-zA-ZÀ-ÿ]{2,10}$/

export function startScreen () {
    const startContainer = create('div', 'start-container', container);
    const input = create('input', 'start-input', startContainer);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter name');
    createBtn(start, 'Start Game', startContainer);
}

function start() {
        const name = document.querySelector('.start-input').value;
        if (!expression.test(name)) {
            document.querySelector('.start-input').value = '';
            document.querySelector('.start-input').setAttribute('placeholder', 'Only 2-10 letters!');
            return;
        }

        elementsPlayer(name);
        //const players = initializeBoard(name);
        //handleBoard(element, players.newPlayer1, players.newPlayer2);
        document.querySelector('.start-container').remove();
        initializeBoard(name);
}


