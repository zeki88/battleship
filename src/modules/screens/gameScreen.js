import { elementsCPU } from '../dom/dom.js';
import { initializeBoard } from './setupScreen.js';
import { handleBoard } from '../controller/controller.js';

export function gameScreen(player) {
    const container = document.querySelector('.game-container');
    document.querySelector('.ships-container').remove();
    document.getElementById('button-horizontal').remove();
    document.getElementById('button-vertical').remove();
    document.getElementById('button-start').remove();
    
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '1fr 1fr';
    container.style.justifyItems = 'center';
    container.style.alignItems = 'center';
    
    elementsCPU();
    const cpu = initializeBoard('CPU');
    displayDom();
    handleBoard(player, cpu);
    console.log(player.playerBoard.ships, cpu.playerBoard.ships)
}

function displayDom() {
    const spanName = document.querySelectorAll('.player');
    spanName[0].style.display = 'block';
    spanName[1].style.display = 'block';
    const logContainer = document.querySelectorAll('.log-container');
    logContainer[0].style.display = 'flex';
    logContainer[1].style.display = 'flex';
}