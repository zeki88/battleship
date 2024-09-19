export default function ship(length, name, symbol) {
    let hits = 0;
    let sunk = false;
    let position = [];
    let hitPosition = [];

    function hit() {
        hits++;
        if (hits === length) {
            sunk = true;
        }
    }

    return {
        length,
        name,
        symbol,
        get hits() { return hits; },
        get sunk() { return sunk; },
        hit,
        position,
        hitPosition
    }
}