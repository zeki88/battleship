import gameboard from '../src/gameboard';
import ship from '../src/ship';



test('Gameboard', () => {
    const newGameboard = gameboard();
    expect(newGameboard.board).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ]);
});

test('Ship placement horizontal', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'horizontal', 0, 1);
    expect(newGameboard.board).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        ['D', 'D', 'D', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ]);
});

test('Ship placement vertical', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'vertical', 5, 2);
    expect(newGameboard.board).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, 'D', null, null, null, null],
        [null, null, null, null, null, 'D', null, null, null, null],
        [null, null, null, null, null, 'D', null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
        ]);
});

test('Invalid coordinates horizontal', () => {
    const newGameboard = gameboard();
    expect(() => newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'horizontal', 9, 0)).toThrow('Invalid coordinates'); // utilizar () => para que no se ejecute la función
});

test('Invalid coordinates vertical', () => {
    const newGameboard = gameboard();
    expect(() => newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'vertical', 0, 9)).toThrow('Invalid coordinates'); // utilizar () => para que no se ejecute la función
});

test('Ship already placed', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(1, 'Destroyer', 'D'), 'horizontal', 5, 3);
    expect(() => newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'horizontal', 4, 3)).toThrow('Ship already placed');
});

test('Ship already placed', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(2, 'Destroyer', 'D'), 'horizontal', 0, 0);
    expect(() => newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'vertical', 0, 0)).toThrow('Ship already placed');
});

test('Receive attack miss', () => {
    const newGameboard = gameboard();
    newGameboard.receiveAttack(0, 0);
    expect(newGameboard.board).toEqual([
        ['M', null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
        ]);
});

test('Receive attack hit', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'horizontal', 0, 1);
    newGameboard.receiveAttack(0, 1);
    expect(newGameboard.board).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        ['X', 'D', 'D', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
        ]);
});

test('Receive attack sunk', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(3, 'Destroyer', 'D'), 'horizontal', 0, 1);
    newGameboard.receiveAttack(0, 1);
    newGameboard.receiveAttack(1, 1);
    newGameboard.receiveAttack(2, 1);
    expect(newGameboard.board).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        ['X', 'X', 'X', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
        ]);
        expect(newGameboard.ships[0].sunk).toBe(true);
});

test ('Win game false', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(1, 'Destroyer', 'D'), 'horizontal', 0, 0);
    expect(newGameboard.endGame()).toBe(false);
});
    
test ('Win game true', () => {
    const newGameboard = gameboard();
    newGameboard.placeShip(ship(1, 'Destroyer', 'D'), 'horizontal', 0, 0);
    newGameboard.receiveAttack(0, 0);
    expect(newGameboard.endGame()).toBe(true);
});