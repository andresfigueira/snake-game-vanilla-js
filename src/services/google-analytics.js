window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
window.ga('create', 'UA-155793457-1', 'auto');
window.ga('send', 'pageview');

export function GoogleAnalytics() {
    this.sendScore = function ({ ai, score, crossWalls }) {
        window.ga('send', {
            hitType: 'event',
            eventCategory: 'Score',
            eventAction: 'final-score',
            eventLabel: `Score - ${ai ? 'AI' : 'Human'}${crossWalls ? ' - Cross walls' : ''}`,
            eventValue: score,
        });
    }
}
