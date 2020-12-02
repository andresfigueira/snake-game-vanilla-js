import { grid, input } from './app.js';
import { ctx, BOX, canvas, BOARD_SIZE, INITIAL_EXPANSION_RATE, INITIAL_SNAKE_SPEED_INCREMENT, INITIAL_SNAKE_SPEED, MAX_SNAKE_SPEED, CAN_GO_THROUGH_WALLS, END_BOARD, START_BOARD, SNAKE_COLOR } from './settings.js';

export function Snake() {
    this.INITIAL_SNAKE_POSITION = {
        x: Math.ceil(BOARD_SIZE / 2),
        y: Math.ceil(BOARD_SIZE / 2),
    };
    this.snakeColor = SNAKE_COLOR;
    this.snakeBody = [{ ...this.INITIAL_SNAKE_POSITION }];
    this.newSegments = 0;
    this.speed = INITIAL_SNAKE_SPEED;

    this.update = function () {
        const { x, y } = input.getDirection();
        if (x === 0 && y === 0) { return; }
        this.addSegments();
        this.move({ x, y });
    }

    this.move = function ({ x, y }) {
        const nextPos = {
            x: this.snakeBody[0].x + x * BOX,
            y: this.snakeBody[0].y + y * BOX
        };

        if (grid.isOutsideRight(nextPos)) {
            nextPos.x = START_BOARD;
        } else if (grid.isOutsideLeft(nextPos)) {
            nextPos.x = END_BOARD;
        } else if (grid.isOutsideUp(nextPos)) {
            nextPos.y = END_BOARD;
        } else if (grid.isOutsideDown(nextPos)) {
            nextPos.y = START_BOARD;
        }

        this.snakeBody.pop();
        this.snakeBody.unshift(nextPos);
    }

    this.draw = function () {
        this.clear();
        for (let i = 0; i < this.snakeBody.length; i++) {
            const segment = this.snakeBody[i];
            grid.drawRect(segment.x, segment.y, this.snakeColor);
        }
    }

    this.reset = function () {
        this.resetPosition();
        this.resetSpeed();
    }

    this.onSnake = function (position, { ignoreHead = false } = {}) {
        return this.snakeBody.some((segment, index) => {
            if (ignoreHead && index === 0) { return false; }
            return this.equalPositions(segment, position);
        });
    }

    this.expand = function (value = INITIAL_EXPANSION_RATE) {
        this.newSegments += value;
    }

    this.isDead = function () {
        return (
            (!CAN_GO_THROUGH_WALLS && grid.isOutside(this.getHead())) ||
            this.isIntesection()
        );
    }

    this.isIntesection = function () {
        return this.onSnake(this.getHead(), { ignoreHead: true });
    }

    this.resetPosition = function () {
        this.snakeBody = [{ ...this.INITIAL_SNAKE_POSITION }];
    }

    this.getHead = function () {
        return this.snakeBody[0];
    }

    this.clear = function () {
        grid.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    }

    this.addSpeed = function (value = INITIAL_SNAKE_SPEED_INCREMENT) {
        if (this.speed >= MAX_SNAKE_SPEED) { return; }
        this.speed += value;
    }

    this.resetSpeed = function () {
        this.speed = INITIAL_SNAKE_SPEED;
    }

    this.getSpeed = function () {
        return this.speed;
    }

    this.equalPositions = function (a, b) {
        return a.x === b.x && a.y === b.y;
    }

    this.addSegments = function () {
        for (let i = 0; i < this.newSegments; i++) {
            this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
        }
        this.newSegments = 0;
    }

}
