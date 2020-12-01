import { clearRect, drawRect, isOutsideDown, isOutsideGrid, isOutsideLeft, isOutsideRight, isOutsideUp } from './grid.js';
import { ctx, BOX, canvas, BOARD_SIZE, INITIAL_EXPANSION_RATE, INITIAL_SNAKE_SPEED_INCREMENT, INITIAL_SNAKE_SPEED, MAX_SNAKE_SPEED, CAN_GO_THROUGH_WALLS, END_BOARD, START_BOARD, SNAKE_COLOR } from './settings.js';
import { getInputDirection } from './input.js';

const INITIAL_SNAKE_POSITION = {
    x: Math.ceil(BOARD_SIZE / 2),
    y: Math.ceil(BOARD_SIZE / 2),
};
let snakeColor = SNAKE_COLOR;
let snakeBody = [{ ...INITIAL_SNAKE_POSITION }];
let newSegments = 0;
let speed = INITIAL_SNAKE_SPEED;

export function update() {
    const { x, y } = getInputDirection();
    if (x === 0 && y === 0) { return; }
    addSegments();
    move({ x, y });
}

export function move({ x, y }) {
    const nextPos = {
        x: snakeBody[0].x + x * BOX,
        y: snakeBody[0].y + y * BOX
    };

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    if (isOutsideRight(nextPos)) {
        nextPos.x = START_BOARD;
    } else if (isOutsideLeft(nextPos)) {
        nextPos.x = END_BOARD;
    } else if (isOutsideUp(nextPos)) {
        nextPos.y = END_BOARD;
    } else if (isOutsideDown(nextPos)) {
        nextPos.y = START_BOARD;
    }

    snakeBody[0] = { ...nextPos };
}

export function draw() {
    clear();
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        drawRect(segment.x, segment.y, snakeColor);
    }
}

export function reset() {
    resetPosition();
    resetSpeed();
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) { return false; }
        return equalPositions(segment, position);
    });
}

export function expand(value = INITIAL_EXPANSION_RATE) {
    newSegments += value;
}

export function isDead() {
    return (
        (!CAN_GO_THROUGH_WALLS && isOutsideGrid(getSnakeHead())) ||
        isSnakeIntersection()
    );
}

export function isSnakeIntersection() {
    return onSnake(getSnakeHead(), { ignoreHead: true });
}

export function resetPosition() {
    snakeBody = [{ ...INITIAL_SNAKE_POSITION }];
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function clear() {
    clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
}

export function addSpeed(value = INITIAL_SNAKE_SPEED_INCREMENT) {
    if (speed >= MAX_SNAKE_SPEED) { return; }
    speed += value;
}

export function resetSpeed() {
    speed = INITIAL_SNAKE_SPEED;
}

export function getSpeed() {
    return speed;
}

function equalPositions(a, b) {
    return a.x === b.x && a.y === b.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}
