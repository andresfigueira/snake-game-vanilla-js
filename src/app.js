import { Dom } from './dom.js';
import { Food } from './food.js';
import { Game } from './game.js';
import { Grid } from './grid.js';
import { Input } from './input.js';
import { Score } from './score.js';
import { GoogleAnalytics } from './services/google-analytics.js';
import { Snake } from './snake.js';

export const grid = new Grid();
export const game = new Game();
export const snake = new Snake();
export const food = new Food();
export const input = new Input();
export const score = new Score();
export const dom = new Dom();
export const GA = new GoogleAnalytics();

export function App() {
    this.run = () => {
        game.init();
    }
}
