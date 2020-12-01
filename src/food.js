import { drawRect, getRandomGridPosition } from './grid.js';
import { addScore } from './score.js';
import { FOOD_COLOR } from './settings.js';
import { expand as expandSnake, onSnake, addSpeed, getSpeed } from './snake.js';

let food = getRandomFoodPosition();
// let randomFood = null;

export function update() {
    if (!onSnake(food)) { return; }
    addScore();
    addSpeed();
    expandSnake();
    setRandomFoodPosition();
}

export function draw() {
    drawRect(food.x, food.y, FOOD_COLOR);
}

export function drawRandom() {
    // setInterval(() => {
    //     if (!randomFood) {
    //         randomFood = getRandomFoodPosition();
    //     }
    //     drawRect(randomFood.x, randomFood.y, FOOD_RANDOM_COLOR);
    // }, 1000);
}

export function setRandomFoodPosition() {
    food = getRandomFoodPosition();
}

export function resetFood() {
    setRandomFoodPosition();
}

function getRandomFoodPosition() {
    let newFoodPosition = null;
    while (newFoodPosition === null || onSnake(newFoodPosition)) {
        newFoodPosition = getRandomGridPosition();
    }
    return newFoodPosition;
}
