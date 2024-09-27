import { hitMessage, missMessage, sunkMessage } from '../dom/dom.js';
import { endScreen } from '../screens/endScreen.js';
export function handleBoard(player1, player2) {

    const divGameboard2 = document.querySelector('.gameboard-player2');
    const newPlayer1 = player1;
    const newPlayer2 = player2;
    function addListener() {
        divGameboard2.addEventListener('click', handlePlayerMove);
    }
    
    function removeListener() {
        divGameboard2.removeEventListener('click', handlePlayerMove);
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
        const divGameboard1 = document.querySelector('.gameboard-player1');
        const arrayCells = Array.from(divGameboard1.querySelectorAll('.cell'));
    
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
                      
            if (targetCell !== 'M') {
                if (newPlayer1.playerBoard.endGame() === true) {
                    endScreen('lose', newPlayer1);
                } else {
                targetCell.sunk === true ? sunkMessage(targetCell, newPlayer1) : hitMessage(newPlayer1);}
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