import { grid, score, snake } from './app.js';
import { FOOD_COLOR } from './settings.js';

export function Food() {
    this.food = this.getRandomPosition();
    this.color = FOOD_COLOR;

    this.getFood = function () {
        return this.food;
    }

    this.setFood = function (food) {
        this.food = food;
    }

    this.update = function () {
        if (!snake.onSnake(this.food)) { return; }
        score.add();
        snake.addSpeed();
        snake.expand();
        this.setRandomPosition();
    }

    this.draw = function () {
        grid.drawRect(this.food.x, this.food.y, this.color);
    }

    this.reset = function () {
        this.setRandomPosition();
    }

    this.setRandomPosition = function () {
        this.setFood(this.getRandomPosition());
    }

    this.drawRandom = () => {
        // setInterval(() => {
        //     if (!randomFood) {
        //         randomFood = getRandomFoodPosition();
        //     }
        //     drawRect(randomFood.x, randomFood.y, FOOD_RANDOM_COLOR);
        // }, 1000);
    }
}

Food.prototype.getRandomPosition = function () {
    let newFoodPosition = null;
    while (newFoodPosition === null || snake.onSnake(newFoodPosition)) {
        newFoodPosition = grid.getRandomPosition();
    }
    return newFoodPosition;
}
