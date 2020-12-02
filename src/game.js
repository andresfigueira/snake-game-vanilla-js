import { canvas, BOARD_SIZE, ctx } from './settings.js';
import { setAttributes } from './utils/HTMLElement.utils.js';
import { dom, food, input, score, snake } from './app.js';
import { DOWN_KEY, LEFT_KEY, RIGHT_KEY, UP_KEY } from './input.js';

export function Game() {
    this.gameOver = false;
    this.requestLoopId = null;
    this.playAI = false;
    this.lastRenderTime = 0;

    this.init = () => {
        input.addListener();
        this.drawBoard();
        this.loop();
    }

    this.loop = () => {
        this.requestLoopId = window.requestAnimationFrame((t) => this.main(t));
    }

    this.main = function (currentTime) {
        dom.update();
        this.loop();
        const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000
        if (secondsSinceLastRender < 1 / snake.getSpeed()) { return; }
        this.lastRenderTime = currentTime;

        this.update();
        this.draw();
        this.checkGameOver();
    }

    this.update = function () {
        if (this.playAI) { this.autoplayAi(); }
        snake.update();
        food.update();
    }

    this.draw = function () {
        snake.draw();
        food.draw();
    }

    this.autoplayAi = function () {
        const snakePos = snake.getHead();
        const foodPos = food.getFood();
        let aiKey = null;

        if (foodPos.x < snakePos.x) {
            aiKey = LEFT_KEY;
        } else if (foodPos.x > snakePos.x) {
            aiKey = RIGHT_KEY;
        } else if (foodPos.y < snakePos.y) {
            aiKey = UP_KEY;
        } else if (foodPos.y > snakePos.y) {
            aiKey = DOWN_KEY;
        }

        input.setDirectionByKey(aiKey);
    }

    this.playAgain = function () {
        this.gameOver = false;
        snake.reset();
        food.reset();
        score.reset();
    }

    this.stop = function () {
        if (this.requestLoopId === null) { return; }
        window.cancelAnimationFrame(this.requestLoopId);
    }

    this.checkGameOver = function () {
        this.gameOver = snake.isDead();
        if (this.gameOver) {
            score.saveBestScore();
            input.resetDirection();
            // if (!confirm('Play again?')) { return this.stop(); }
            this.playAgain();
        }
    }

    this.drawBoard = function () {
        this.setBoardSettings();
        ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    }

    this.setBoardSettings = function () {
        setAttributes(canvas, {
            width: BOARD_SIZE,
            height: BOARD_SIZE,
        });
    }
}
