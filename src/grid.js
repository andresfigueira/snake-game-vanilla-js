import { BOARD_SIZE, BOX, ctx, END_BOARD, START_BOARD } from './settings.js';

export function drawRect(x, y, color, w = BOX, h = BOX) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

export function clearRect(x, y, w = BOX, h = BOX) {
    ctx.clearRect(x, y, w, h);
}

export function getRandomGridPosition() {
    return {
        x: Math.floor(Math.random() * BOARD_SIZE / BOX) * BOX,
        y: Math.floor(Math.random() * BOARD_SIZE / BOX) * BOX,
    }
}

export function isOutsideGrid(pos) {
    return isOutsideLeft(pos) || isOutsideRight(pos) || isOutsideUp(pos) || isOutsideDown(pos);
}

export function isOutsideLeft(pos) {
    return pos.x < START_BOARD;
}

export function isOutsideRight(pos) {
    return pos.x > END_BOARD;
}

export function isOutsideUp(pos) {
    return pos.y < START_BOARD;
}

export function isOutsideDown(pos) {
    return pos.y > END_BOARD;
}
