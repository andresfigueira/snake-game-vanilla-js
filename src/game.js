import { canvas, BOARD_SIZE, ctx } from './settings.js';
import { setAttributes } from './utils/HTMLElement.utils.js';
import { addInputListener, resetInputDirection } from './input.js';
import {
    draw as drawSnake,
    update as updateSnake,
    isDead as isDeadSnake,
    reset as resetSnake,
    getSpeed,
} from './snake.js';
import {
    draw as drawFood,
    resetFood,
    update as updateFood,
} from './food.js';
import { saveBestScore, updateScoreDOM } from './score.js';

let gameOver = false;
let requestLoopId = null;
let lastRenderTime = 0;

export function init() {
    setCanvasSettings();
    drawBoard();
    addInputListener();
    gameLoop();
}

function main(currentTime) {
    updateSettingsDOM();
    updateScoreDOM();
    gameLoop();
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / getSpeed()) { return; }
    lastRenderTime = currentTime;

    update();
    draw();
    checkGameOver();
}

function update() {
    updateSnake();
    updateFood();
}

function draw() {
    drawSnake();
    drawFood();
}

function gameLoop() {
    requestLoopId = window.requestAnimationFrame(main);
}

function playAgain() {
    gameOver = false;
    resetSnake();
    resetFood();
}

function stopGame() {
    if (requestLoopId === null) { return; }
    window.cancelAnimationFrame(requestLoopId);
}

function checkGameOver() {
    gameOver = isDeadSnake();
    if (gameOver) {
        saveBestScore();
        resetInputDirection();
        if (!confirm('Play again?')) { return stopGame(); }
        playAgain();
    }
}

function drawBoard() {
    ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
}

function setCanvasSettings() {
    setAttributes(canvas, {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
    });
}

function updateSettingsDOM() {
    const settingsEl = document.getElementById('settings');
    const container = document.createElement('div');
    container.setAttribute('class', 'flex flex-row flex-wrap items-center');

    const speed = document.createElement('p');
    speed.setAttribute('style', 'font-size: 16px');
    speed.innerHTML = `Speed: ${getSpeed()}`;

    container.appendChild(speed);

    settingsEl.innerHTML = '';
    settingsEl.appendChild(container);
}
