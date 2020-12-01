import { BOARD_SIZE, BOX, ctx } from './settings.js';

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
    return pos.x < 0;
}

export function isOutsideRight(pos) {
    return pos.x > BOARD_SIZE - BOX;
}

export function isOutsideUp(pos) {
    return pos.y < 0;
}

export function isOutsideDown(pos) {
    return pos.y > BOARD_SIZE - BOX;
}
