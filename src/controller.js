import player1 from './player.js';
import ship from './ship.js';
import { hitMessage, missMessage, sunkMessage, elements } from './dom.js';
import { endScreen } from './endScreen.js';

export function initializeBoard(name) {
    const newPlayer1 = player1(name);
    const newPlayer2 = player1('CPU');
    
    const shipsData = [
        { length: 2, name: 'Destroyer', symbol: 'D' },
        { length: 3, name: 'Submarine', symbol: 'S' },
        { length: 3, name: 'Cruiser', symbol: 'C' },
        { length: 4, name: 'Battleship', symbol: 'B' },
        { length: 5, name: 'Carrier', symbol: 'A' },
    ];
    initializePlayerBoard(newPlayer1, shipsData);
    initializePlayerBoard(newPlayer2, shipsData);
    //newPlayer2.playerBoard.placeShip(ship(5, 'Carrier', 'A'), 'vertical', 0, 0);
    return { newPlayer1, newPlayer2, shipsData };
}
export function handleBoard(board, player1, player2) {

    const gameBoard = board;
    const newPlayer1 = player1;
    const newPlayer2 = player2;
    function addListener() {
        gameBoard.divGameboard2.addEventListener('click', handlePlayerMove);
    }
    
    function removeListener() {
        gameBoard.divGameboard2.removeEventListener('click', handlePlayerMove);
    }

    removeListener();
    addListener();

    async function handlePlayerMove(e) {
        if (!e.target.classList.contains('cell') || e.target.classList.contains('clicked')) return;
        const { x, y } = getCoordinatesPlayer(e);
        if (x === undefined || y === undefined) return;
        
        const targetCell = newPlayer2.playerBoard.receiveAttack(x, y);
        
        
        removeListener();

        if (targetCell !== 'M') {
            if (newPlayer2.playerBoard.endGame() === true) {
                endScreen('win', newPlayer1);
            } else {
                targetCell.sunk === true ? sunkMessage(targetCell, newPlayer2) : hitMessage(newPlayer2);
            }
        }
        
        const result = targetCell === 'M' ? 'M' : 'X';
        
        updateCell(e.target, result);       
    
        if (result === 'M') {
            missMessage(newPlayer1)
            await delay(500);
            handleCpuMove()
        } else {
            await delay(1500);
            addListener();
        }
    }

    const cpuAi = cpu()

    async function handleCpuMove() {
        removeListener();
        cpuAi.startAttack();
    }
    
    
    function updateCell(cell, result) {
        cell.textContent = result;
        cell.classList.add('clicked', result === 'X' ? 'hit' : 'miss');
    }
    
       
    function cpu() {
        const arrayCells = gameBoard.cells ;
        console.log(gameBoard)
    
        function randomAttack() {
            const cell = arrayCells[Math.floor(Math.random() * arrayCells.length)];
            const { x, y } = getCoordinatesCPU(cell);
            attack(cell, x, y);
        }
    
        function startAttack () {
            const attackedShip = newPlayer1.playerBoard.ships.find(ship => ship.hits > 0 && ship.sunk === false);
            if (attackedShip) {
                const x = Number(attackedShip.hitPosition[0].x);
                const y = Number(attackedShip.hitPosition[0].y);
                predictiveAttack(x, y);
            } else {
                randomAttack();
            }
        }
    
        async function predictiveAttack(x, y, attempts = 0) {
            if (attempts >= 4) {
                const attackedShip = newPlayer1.playerBoard.ships.find(ship => ship.hitPosition.some(position => Number(position.x) === x && Number(position.y) === y));
                attackedShip.hitPosition.push(attackedShip.hitPosition.shift());
                startAttack();
                return;
            }
    
            const directions = [
                { dx: 1, dy: 0 },
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },  
                { dx: 0, dy: -1 }
            ];
        
            const { dx, dy } = directions[Math.floor(Math.random() * directions.length)];
        
            const targetCell = arrayCells.find(cell => {
                const cellX = Number(cell.dataset.x);
                const cellY = Number(cell.dataset.y);
                return cellX === x + dx && cellY === y + dy && !cell.classList.contains('clicked');
            });
    
            if (targetCell) {
                const cellX = Number(targetCell.dataset.x);
                const cellY = Number(targetCell.dataset.y);
                attack(targetCell, cellX, cellY);
            } else {
                predictiveAttack(x, y, attempts+1);
            }
        }
    
        async function attack(cell, x, y) {
            await delay(1500);
            const targetCell = newPlayer1.playerBoard.receiveAttack(x, y);
            
            console.log(x, y)
            
            if (targetCell !== 'M') {
                targetCell.sunk === true ? sunkMessage(targetCell, newPlayer1) : hitMessage(newPlayer1);
            }
            
            const result = targetCell === 'M' ? 'M' : 'X';
            updateCell(cell, result);
            arrayCells.splice(arrayCells.indexOf(cell), 1);
            result === 'X' ? predictiveAttack(x, y) : (addListener(), missMessage(newPlayer2));
        }
    
        return {
            startAttack: () => startAttack(),
            getArray: () => arrayCells
        };
    }
    
    function getCoordinatesPlayer(e) {
        return {
            x: Number(e.target.dataset.x),
            y: Number(e.target.dataset.y),
        };
    }
    
    function getCoordinatesCPU(cell) {
        return {
            x: Number(cell.dataset.x),
            y: Number(cell.dataset.y),
        };
    }
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return { addListener, removeListener };
}

function initializePlayerBoard(player, ships) {
    ships.forEach(({ length, name, symbol }) => {
        let shipPlaced = false;
            
        while (!shipPlaced) {
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
    
            try {
                player.playerBoard.placeShip(ship(length, name, symbol), orientation, x, y);
                shipPlaced = true;
            } catch (error) {
                console.log(`Error placing ${name}: ${error.message}. Retrying...`);
            }
        }
    });
}