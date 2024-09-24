export default function gameboard() {
    const board = Array.from({ length: 10 }, () => Array(10).fill(null));
    const ships = [];
    const missedShots = [];
    const successfulShot = [];

    function receiveAttack(x, y) {
        if (board[y][x] === null) {
            missedShots.push({ x, y });
            board[y][x] = 'M';
            return 'M';
        } else {
            const ship = ships.find(s => s.position.some(pos => pos.x === x && pos.y === y));
            if (ship) {
                ship.hit();
                ship.hitPosition.push({ x, y }); 
                ship.position.splice(ship.position.findIndex(pos => pos.x === x && pos.y === y), 1);
                successfulShot.push({ x, y });
                board[y][x] = 'X';
            }
            return ship;
        }
    }

    function isValidPosition(ship, x, y, orientation) {
        for (let i = 0; i < ship.length; i++) {
            const posX = orientation === 'horizontal' ? x + i : x;
            const posY = orientation === 'vertical' ? y + i : y;
            if (posX >= 10 || posY >= 10 || board[posY][posX] !== null) {
                throw new Error('Ship already placed');
            }
        }
        return true;
    }

    function placeShipOnBoard(ship, x, y, orientation) {
        for (let i = 0; i < ship.length; i++) {
            const posX = orientation === 'horizontal' ? x + i : x;
            const posY = orientation === 'vertical' ? y + i : y;
            board[posY][posX] = ship.symbol;
            ship.position.push({ x: posX, y: posY });
        }
    }

    function placeShip(ship, orientation, x, y) {
        if (x < 0 || y < 0 || (orientation === 'horizontal' && x + ship.length > 10) ||
            (orientation === 'vertical' && y + ship.length > 10)) {
                throw new Error('Invalid coordinates');
        }

        if(isValidPosition(ship, x, y, orientation)) {
            placeShipOnBoard(ship, x, y, orientation)
            ships.push(ship);
            return true;
        } else {
            return false;
        }
    }

    function printBoard() {
        console.log('  1 2 3 4 5 6 7 8 9 10');
        for (let i = 0; i < board.length; i++) {
            console.log(i + 1 + ' ' + board[i].join(' '));
        }
    }

    function endGame() {
        const state = ships.every(ship => ship.sunk) ?  true : false;
        return state
    }

    return {
        get board() { return board; },
        ships,
        missedShots,
        successfulShot,
        receiveAttack,
        placeShip,
        printBoard,
        endGame,
    };
}
