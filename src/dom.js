import { score, snake } from './app.js';

export function Dom() {
    this.update = () => {
        updateScore();
        updateSettings();
    }

    function updateSettings() {
        const settingsEl = document.getElementById('settings');
        const container = document.createElement('div');
        container.setAttribute('class', 'flex flex-row flex-wrap items-center');

        const speed = document.createElement('p');
        speed.setAttribute('style', 'font-size: 16px');
        speed.innerHTML = `Speed: ${snake.getSpeed()}`;

        container.appendChild(speed);

        settingsEl.innerHTML = '';
        settingsEl.appendChild(container);
    }

    function updateScore() {
        const scoreEl = document.getElementById('score');
        const container = document.createElement('div');
        container.setAttribute('class', 'flex flex-col items-center');

        const scoreP = document.createElement('p');
        scoreP.setAttribute('style', 'font-size: 24px');
        scoreP.innerHTML = `Score: ${score.getScore()}`

        const bestScore = document.createElement('p');
        bestScore.setAttribute('style', 'font-size: 16px');
        bestScore.innerHTML = `Best: ${score.getBestScore()}`

        container.appendChild(scoreP);
        container.appendChild(bestScore);

        scoreEl.innerHTML = '';
        scoreEl.appendChild(container);
    }
}
