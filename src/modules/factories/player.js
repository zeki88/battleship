import gameboard from './gameboard.js';

export default function player1 (name) {
    const playerBoard = gameboard();
    return {
        name,
        get playerBoard() { return playerBoard; },
    }
};
