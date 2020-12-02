import { snake } from './app.js';

const INITIAL_INPUT_DIRECTION = { x: 0, y: 0 };

export const UP_KEY = 'ArrowUp';
export const DOWN_KEY = 'ArrowDown';
export const LEFT_KEY = 'ArrowLeft';
export const RIGHT_KEY = 'ArrowRight';
export const ALL_KEYS = [UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY];

export function Input() {
    this.direction = { ...INITIAL_INPUT_DIRECTION };

    this.addListener = () => {
        document.addEventListener('keydown', ({ key }) => {
            this.setDirectionByKey(key);
        });
    }

    this.setDirectionByKey = (key) => {
        let { x, y } = { ...this.getDirection() };
        const isUpOrDown = y === -1 || y === 1;
        const isLeftOrRight = x === -1 || x === 1;

        if (UP_KEY === key && !isUpOrDown) { x = 0; y = -1; }
        if (DOWN_KEY === key && !isUpOrDown) { x = 0; y = 1; }
        if (RIGHT_KEY === key && !isLeftOrRight) { x = 1; y = 0; }
        if (LEFT_KEY === key && !isLeftOrRight) { x = -1; y = 0; }

        this.setDirection({ x, y });
    }

    this.setDirection = (direction) => {
        this.direction = direction;
    }

    this.getDirection = () => {
        return this.direction;
    }

    this.resetDirection = () => {
        this.direction = { ...INITIAL_INPUT_DIRECTION };
    }
}

