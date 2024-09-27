import ship from '../src/ship.js';

test('Ship', () => {
    const newShip = ship(3, 'Destroyer', 'D');
    expect(newShip.length).toBe(3);
    expect(newShip.name).toBe('Destroyer');
    expect(newShip.symbol).toBe('D');
    expect(newShip.hits).toBe(0);
    expect(newShip.sunk).toBe(false);
});

test('Ship hit', () => {
    const newShip = ship(3, 'Destroyer', 'D');
    newShip.hit();
    expect(newShip.hits).toBe(1);
});

test('Ship sunk', () => {
    const newShip = ship(3, 'Destroyer', 'D');
    newShip.hit();
    expect(newShip.hits).toBe(1);
    expect(newShip.sunk).toBe(false);
    newShip.hit();
    expect(newShip.hits).toBe(2);
    expect(newShip.sunk).toBe(false);
    newShip.hit();
    expect(newShip.hits).toBe(3);
    expect(newShip.sunk).toBe(true);
});

