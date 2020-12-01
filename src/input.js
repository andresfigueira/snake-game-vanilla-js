const INITIAL_INPUT_DIRECTION = { x: 0, y: 0 };
let inputDirection = { ...INITIAL_INPUT_DIRECTION };

const UP_KEY = 'ArrowUp';
const DOWN_KEY = 'ArrowDown';
const LEFT_KEY = 'ArrowLeft';
const RIGHT_KEY = 'ArrowRight';

export function addInputListener() {
    document.addEventListener('keydown', ({ key }) => {
        let { x, y } = { ...inputDirection };
        const isUpOrDown = y === -1 || y === 1;
        const isLeftOrRight = x === -1 || x === 1;

        if (UP_KEY === key && !isUpOrDown) { x = 0; y = -1; }
        if (DOWN_KEY === key && !isUpOrDown) { x = 0; y = 1; }
        if (RIGHT_KEY === key && !isLeftOrRight) { x = 1; y = 0; }
        if (LEFT_KEY === key && !isLeftOrRight) { x = -1; y = 0; }

        inputDirection = { x, y };
    });
}

export function getInputDirection() {
    return inputDirection;
}

export function resetInputDirection() {
    inputDirection = { ...INITIAL_INPUT_DIRECTION };
}
