import { createBtn } from '../dom/domHelpers.js';
import player1 from '../factories/player.js';
import ship from '../factories/ship.js';
import { gameScreen } from './gameScreen.js';

let shipDataMobile = null;

export function initializeBoard(name) {
    const player = player1(name);
    
    const shipsData = [
        { length: 2, name: 'Destroyer', symbol: 'D' },
        { length: 3, name: 'Submarine', symbol: 'S' },
        { length: 3, name: 'Cruiser', symbol: 'C' },
        { length: 4, name: 'Battleship', symbol: 'B' },
        { length: 5, name: 'Carrier', symbol: 'A' },
    ];
    name === 'CPU' ? initializeCPUBoard(player, shipsData) : initializePlayerBoard(player, shipsData);

    return player;
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
const device = isMobileDevice() ? 'mobile' : 'desktop';

function initializeCPUBoard(player, ships) {
    const playerBoard = player.playerBoard;
    
    ships.forEach(({ length, name, symbol }) => {
        let shipPlaced = false;
            
        while (!shipPlaced) {
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
    
            try {
                playerBoard.placeShip(ship(length, name, symbol), orientation, x, y);
                shipPlaced = true;
            } catch (error) {
                console.log(`Error placing ${name}: ${error.message}. Retrying...`);
            }
        }
    });
}

export function initializePlayerBoard(player, shipsData) {
    const playerBoard = player.playerBoard;
    const playerGameboard = document.querySelector('.gameboard-player1')
    const ships = shipsData
    let counter = 0;
    let orientation = 'horizontal';

    const buttonH = createBtn(() => {orientation = 'horizontal'; buttonH.classList.add('active'); buttonV.classList.remove('active'); buttonV.style.removeProperty('background-color'); buttonH.style.color = 'white'}, 'Horizontal', document.querySelector('.gameboard-container'), 'button-horizontal');
    const buttonV = createBtn(() => {orientation = 'vertical'; buttonV.classList.add('active'); buttonH.classList.remove('active'); buttonH.style.removeProperty('background-color')}, 'Vertical', document.querySelector('.gameboard-container'), 'button-vertical');
    buttonH.classList.add('active')
    buttonH.style.top = '1%';
    buttonH.style.left = '5%';
    buttonV.style.top = '1%';
    buttonV.style.right = '5%';

    const buttonS = createBtn(() => {if (counter < 5) return; gameScreen(player)}, 'Start', document.querySelector('.gameboard-container'), 'button-start');
    buttonS.style.bottom = '1%'
    buttonS.style.justifySelf = 'center';

    
    ships.forEach(ship => {
        const shipImg = document.getElementById(ship.name);
        shipImg.addEventListener(device === 'mobile' ? 'touchstart' : 'dragstart', (e) => {
            const shipData = JSON.stringify(ship);
            if (device === 'mobile') {
                shipDataMobile = shipData;
            } else {
                e.dataTransfer.setData('application/json', shipData);
            }
        });
    });
    
    playerGameboard.addEventListener(device === 'mobile' ? 'touchmove' : 'dragover', (event) => {
        event.preventDefault();
    });
    
    playerGameboard.addEventListener(device === 'mobile' ? 'touchend' : 'drop', (event) => {
        event.preventDefault();

        let shipData;
        if (device === 'mobile') {
            shipData = shipDataMobile;
        } else {
            shipData = event.dataTransfer.getData('application/json')
        }
    
        const shipObject = JSON.parse(shipData);
        const shipImg = document.getElementById(shipObject.name);
        const cell = event.target;
        const x = Number(cell.getAttribute('data-x'));
        const y = Number(cell.getAttribute('data-y'));
        orientation === 'vertical' ? shipImg.style.transform = 'rotate(90deg) translate(0px, -100%)' : shipImg.style.transform = 'rotate(0deg) translate(0%, 0px)';
        if (!playerBoard.placeShip(ship(shipObject.length, shipObject.name, shipObject.symbol), orientation, x, y)) {
            return;
        };
        playerGameboard.appendChild(shipImg)
        shipImg.setAttribute('draggable', 'false')
        shipImg.style.position = 'absolute';
        shipImg.style.left = `${x * 10}%`;
        shipImg.style.top = `${y * 10}%`;
        shipImg.style.height = '10%'
        shipImg.style.aspectRatio = `${shipObject.length} / 1`;
        shipImg.style.transformOrigin = 'top left 0px';
        shipImg.style.zIndex = '-1';
        counter++;
    });
}