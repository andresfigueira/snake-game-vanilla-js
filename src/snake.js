import { food, game, grid, input } from './app.js';
import { ALL_KEYS, DOWN_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY } from './input.js';
import { ctx, BOX, canvas, BOARD_SIZE, INITIAL_EXPANSION_RATE, INITIAL_SNAKE_SPEED_INCREMENT, INITIAL_SNAKE_SPEED, MAX_SNAKE_SPEED, END_BOARD, START_BOARD, SNAKE_COLOR, IMMORTAL } from './settings.js';

export function Snake() {
    this.INITIAL_SNAKE_POSITION = {
        x: Math.ceil(BOARD_SIZE / 2),
        y: Math.ceil(BOARD_SIZE / 2),
    };
    this.snakeColor = SNAKE_COLOR;
    this.snakeBody = [{ ...this.INITIAL_SNAKE_POSITION }];
    this.newSegments = 0;
    this.speed = INITIAL_SNAKE_SPEED;
    this.maxSpeed = MAX_SNAKE_SPEED;
    this.prevPositions = [];
    this.nextPosition = null;
    this.currentPosition = this.snakeBody[0];
    this.slow = false;

    this.update = function () {
        const { x, y } = input.getDirection();
        if (x === 0 && y === 0) { return; }
        this.addSegments();
        this.move({ x, y });
    }

    this.getNextBestPosition = (badKeys = [], blocked = false) => {
        const getRandomKey = () => ALL_KEYS.filter(k => !badKeys.includes(k))[0] || null;
        const { x, y } = this.currentPosition;
        const foodPos = food.getFood();
        let key = null;
        const nextPossible = {
            [UP_KEY]: { ...this.currentPosition, y: y - BOX },
            [DOWN_KEY]: { ...this.currentPosition, y: y + BOX },
            [LEFT_KEY]: { ...this.currentPosition, x: x - BOX },
            [RIGHT_KEY]: { ...this.currentPosition, x: x + BOX },
            current: { ...this.currentPosition },
        }

        if (foodPos.y < y && (blocked || !badKeys.includes(UP_KEY))) { key = UP_KEY; }
        if (foodPos.y > y && (blocked || !badKeys.includes(DOWN_KEY))) { key = DOWN_KEY; }
        if (foodPos.x < x && (blocked || !badKeys.includes(LEFT_KEY))) { key = LEFT_KEY; }
        if (foodPos.x > x && (blocked || !badKeys.includes(RIGHT_KEY))) { key = RIGHT_KEY; }
        if (!key) { key = getRandomKey(); }

        // TODO: Change it to while instead of recursive
        if (this.isDead(nextPossible[key])) {
            return this.getNextBestPosition([...badKeys, key], !key);
        }

        return key;
    }

    this.move = function ({ x, y }) {
        const nextPos = {
            x: this.snakeBody[0].x + x * BOX,
            y: this.snakeBody[0].y + y * BOX
        };

        if (grid.crossWalls && grid.isOutsideRight(nextPos)) { nextPos.x = START_BOARD }
        if (grid.crossWalls && grid.isOutsideLeft(nextPos)) { nextPos.x = END_BOARD; }
        if (grid.crossWalls && grid.isOutsideUp(nextPos)) { nextPos.y = END_BOARD; }
        if (grid.crossWalls && grid.isOutsideDown(nextPos)) { nextPos.y = START_BOARD; }

        this.prevPositions.push(this.currentPosition);
        this.currentPosition = nextPos;
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

    this.isDead = function (position = this.getHead()) {
        if (game.immortal) { return false; }
        return (
            (!grid.crossWalls && grid.isOutside(position)) ||
            this.isIntersection(position)
        );
    }

    this.isIntersection = function (position = this.getHead()) {
        return this.onSnake(position, { ignoreHead: true });
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
        if (this.speed >= this.maxSpeed) { return; }
        this.speed += value;
    }

    this.resetSpeed = function () {
        this.speed = INITIAL_SNAKE_SPEED;
    }

    this.setSpeed = function (speed) {
        this.speed = speed;
    }

    this.getSpeed = function () {
        return this.slow ? 0.5 : this.speed;
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
