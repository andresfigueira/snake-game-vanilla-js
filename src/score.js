import { INITIAL_SCORE_INCREMENT } from './settings.js';

let score = 0;

export function addScore(value = INITIAL_SCORE_INCREMENT) {
    score += value;
}

export function getScore() {
    return score;
}

export function getBestScore() {
    return Number(localStorage.getItem('bestScore') || 0);
}

export function setBestScore(bestScore) {
    return localStorage.setItem('bestScore', bestScore);
}

export function saveBestScore(currentScore = score) {
    if (currentScore > getBestScore()) {
        setBestScore(currentScore);
    }
}

export function updateScoreDOM() {
    const scoreEl = document.getElementById('score');
    const container = document.createElement('div');
    container.setAttribute('class', 'flex flex-col items-center');

    const score = document.createElement('p');
    score.setAttribute('style', 'font-size: 24px');
    score.innerHTML = `Score: ${getScore()}`

    const bestScore = document.createElement('p');
    bestScore.setAttribute('style', 'font-size: 16px');
    bestScore.innerHTML = `Best: ${getBestScore()}`

    container.appendChild(score);
    container.appendChild(bestScore);

    scoreEl.innerHTML = '';
    scoreEl.appendChild(container);
}
