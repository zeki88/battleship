import player1 from "./player";
import gameboard from "./gameboard";
import ship from "./ship";

test('Player name should be Zeki', () => {
    const player = player1('Zeki');
    expect(player.name).toBe('Zeki');
});

test('Player board should be empty', () => {
    const player = player1('Zeki');
    expect(player.playerBoard.board).toEqual([
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

test('Player should be able to place ship', () => {
    const player = player1('Zeki');
    player.playerBoard.placeShip(ship(3, 'Destroyer', 'D'), 'horizontal', 0, 1);
    expect(player.playerBoard.board).toEqual([
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

test('Player should be able to place ship vertically', () => {
    const player = player1('Zeki');
    player.playerBoard.placeShip(ship(3, 'Destroyer', 'D'), 'vertical', 5, 2);
    expect(player.playerBoard.board).toEqual([
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

test('Player should be able to receive attack', () => {
    const player = player1('Zeki');
    player.playerBoard.placeShip(ship(3, 'Destroyer', 'D'), 'vertical', 0, 0);
    player.playerBoard.receiveAttack(0, 0);
    expect(player.playerBoard.board).toEqual([
        ['X', null, null, null, null, null, null, null, null, null],
        ['D', null, null, null, null, null, null, null, null, null],
        ['D', null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ]);
});

test('Player ship should be sunk', () => {
    const player = player1('Zeki');
    player.playerBoard.placeShip(ship(3, 'Destroyer', 'D'), 'vertical', 0, 0);
    player.playerBoard.receiveAttack(0, 0);
    player.playerBoard.receiveAttack(0, 1);
    player.playerBoard.receiveAttack(0, 2);
    expect(player.playerBoard.ships[0].sunk).toBe(true);
});