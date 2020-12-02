import { BOARD_SIZE, BOX, ctx, END_BOARD, START_BOARD } from './settings.js';

export function Grid() {
    this.drawRect = (x, y, color, w = BOX, h = BOX) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    this.clearRect = (x, y, w = BOX, h = BOX) => {
        ctx.clearRect(x, y, w, h);
    }

    this.getRandomPosition = () => ({
        x: Math.floor(Math.random() * BOARD_SIZE / BOX) * BOX,
        y: Math.floor(Math.random() * BOARD_SIZE / BOX) * BOX,
    });

    this.isOutside = (pos) => {
        return (
            this.isOutsideLeft(pos) ||
            this.isOutsideRight(pos) ||
            this.isOutsideUp(pos) ||
            this.isOutsideDown(pos)
        );
    }

    this.isOutsideLeft = (pos) => {
        return pos.x < START_BOARD;
    }

    this.isOutsideRight = (pos) => {
        return pos.x > END_BOARD;
    }

    this.isOutsideUp = (pos) => {
        return pos.y < START_BOARD;
    }

    this.isOutsideDown = (pos) => {
        return pos.y > END_BOARD;
    }

}
