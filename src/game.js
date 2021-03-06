import { canvas, BOARD_SIZE, ctx, IMMORTAL, PLAY_AI } from './settings.js';
import { setAttributes } from './utils/HTMLElement.utils.js';
import { dom, food, GA, game, grid, input, score, snake } from './app.js';

export function Game() {
    this.gameOver = false;
    this.requestLoopId = null;
    this.playAi = PLAY_AI;
    this.immortal = IMMORTAL;
    this.lastRenderTime = 0;
    this.pause = false;

    this.init = () => {
        input.addListener();
        dom.init();
        this.drawBoard();
        this.loop();
    }

    this.loop = () => {
        this.requestLoopId = window.requestAnimationFrame((t) => this.main(t));
    }

    this.main = function (currentTime) {
        // TODO: Remove (only for debugging)
        // if (input.pressedKey === SPACE_KEY) { this.pause = true; }
        // if (input.pressedKey === '1') { this.pause = false; }

        const isMaxSpeed = snake.getSpeed() >= snake.maxSpeed;
        this.loop();

        if (!isMaxSpeed) {
            const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000
            if (secondsSinceLastRender < 1 / snake.getSpeed()) { return; }
            this.lastRenderTime = currentTime;
        }

        if (this.pause) { return; }
        this.update();
        this.draw();
        this.checkGameOver();
    }

    this.update = function () {
        if (this.playAi) { this.autoPlayAi(); }
        snake.update();
        food.update();
    }

    this.draw = function () {
        snake.draw();
        food.draw();
    }

    this.autoPlayAi = function () {
        const aiKey = snake.getNextBestPosition();
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
            GA.sendScore({
                score: score.getScore(),
                ai: game.playAi,
                crossWalls: grid.crossWalls,
            });
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

    this.setPlayAi = function (playAi) {
        this.playAi = playAi;
    }

    this.setImmortal = function (immortal) {
        this.immortal = immortal;
    }
}
