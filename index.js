import { init } from './src/game.js';
import { canvas } from './src/settings.js';

(function setup() {
    if (!canvas?.getContext) { return alert('Unsupported'); } // !!! Unsupported
    init();
})();
