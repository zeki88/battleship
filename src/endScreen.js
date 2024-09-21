import { create, createBtn } from './domHelpers.js';

const container = document.querySelector('.game-container')

export function endScreen(state, player) {
    container.innerHTML = '';
    container.setAttribute('style', 'grid-template-columns: 1fr');
    const endScreen = document.createElement('div');
    endScreen.classList.add('end-screen');
    state === 'win' ? create('p', 'text-end', endScreen).innerHTML = `${player.name} wins!` : create('p', 'text-end', endScreen).innerHTML = 'You lose!';
    createBtn(() => location.reload(), 'Play Again!', endScreen);
    container.appendChild(endScreen);
}