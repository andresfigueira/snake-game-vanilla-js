import { game, grid, score, snake } from './app.js';
import { setAttributes } from './utils/HTMLElement.utils.js';

export function Dom() {
    this.init = function () {
        renderSpeedSlider();
        renderActiveAiCheckbox();
        renderCrossWallsCheckbox();
        renderImmortalCheckbox();
    }

    this.update = function () {
        updateScore();
        updateSettings();
    }

    function renderCheckbox(containerId, label, checked = false, onChange = () => { }, props = {}) {
        const containerEl = document.getElementById(containerId);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = checked;
        input.onchange = onChange;
        setAttributes(input, { ...props });
        if (!props.disabled) { input.removeAttribute('disabled'); }

        const span = document.createElement('span');
        span.className = 'ml-2 text-lg text-yellow-500';
        span.innerHTML = label;

        containerEl.innerHTML = '';
        containerEl?.appendChild(input);
        containerEl?.appendChild(span);
    }

    function renderImmortalCheckbox() {
        const containerId = 'immortal-container';
        const label = 'Immortal'
        const checked = game.immortal;
        const onChange = (event) => {
            const { checked } = event.target;
            game.setImmortal(checked);
            if (checked) { grid.setCrossWalls(checked) }
            renderCrossWallsCheckbox({ disabled: checked });
        };
        renderCheckbox(containerId, label, checked, onChange);
    }

    function renderCrossWallsCheckbox({ disabled = false } = {}) {
        const containerId = 'cross-walls-container';
        const label = 'Cross walls'
        const checked = grid.crossWalls;
        const onChange = (event) => grid.setCrossWalls(event.target.checked);
        renderCheckbox(containerId, label, checked, onChange, { disabled });
    }

    function renderActiveAiCheckbox() {
        const containerId = 'active-ai-container';
        const label = 'Active AI'
        const checked = game.playAi;
        const onChange = (event) => game.setPlayAi(event.target.checked);
        renderCheckbox(containerId, label, checked, onChange);
    }

    function renderSpeedSlider() {
        function onChange(event) {
            const speed = event.target.value;
            snake.setSpeed(speed);
        }

        const containerEl = document.getElementById('speed-slider-container');
        const input = document.createElement('input');
        setAttributes(input, {
            id: "speed-slider",
            type: "range",
            step: "1",
            value: snake.getSpeed(),
            min: "1",
            max: "500",
        });
        input.oninput = onChange;

        containerEl.appendChild(input);
    }

    function updateSettings() {
        const settingsEl = document.getElementById('settings');
        const container = document.createElement('div');
        container.setAttribute('class', 'flex flex-row flex-wrap items-center');

        const speed = document.createElement('p');
        speed.className = 'text-lg';
        speed.innerHTML = `Speed: ${snake.getSpeed()}`;
        container.appendChild(speed);

        settingsEl.innerHTML = '';
        settingsEl.appendChild(container);
    }

    function updateScore() {
        const scoreEl = document.getElementById('score');
        const container = document.createElement('div');

        const scoreP = document.createElement('p');
        scoreP.setAttribute('style', 'font-size: 24px');
        scoreP.innerHTML = `Score: ${score.getScore()}`

        const bestScore = document.createElement('p');
        bestScore.innerHTML = `Best: ${score.getBestScore()}`

        container.appendChild(scoreP);
        container.appendChild(bestScore);

        scoreEl.innerHTML = '';
        scoreEl.appendChild(container);
    }
}
