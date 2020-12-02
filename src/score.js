import { INITIAL_SCORE_INCREMENT } from './settings.js';

export function Score() {
    this.score = 0;

    this.getScore = function () {
        return this.score;
    }

    this.setScore = function (score) {
        this.score = score;
    }

    this.add = function (value = INITIAL_SCORE_INCREMENT) {
        this.setScore(this.score + value);
    }

    this.reset = function () {
        this.setScore(0);
    }

    this.getBestScore = function () {
        return Number(localStorage.getItem('bestScore') || 0);
    }

    this.setBestScore = function (bestScore) {
        return localStorage.setItem('bestScore', bestScore);
    }

    this.saveBestScore = function (currentScore = this.score) {
        if (currentScore > this.getBestScore()) {
            this.setBestScore(currentScore);
        }
    }
}
