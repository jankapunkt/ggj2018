import 'bootstrap';
import 'p5';
import '../public/main.css';
import './main.css';
import {ReactiveDict} from 'meteor/reactive-dict';

state = new ReactiveDict();
state.set('rescuers', 1);
state.set('timer', 300);
state.set('enemies', 1);

Template.registerHelper('state', function (key) {
    return state.get(key);
});

Template.body.events({
    'click #start-game-button'(event) {
        event.preventDefault();
        state.set('isRunning', true);
        initGame();
    },

    'click #retry-level-button'(event) {
        event.preventDefault();
        cleanupGame();
    },

    'click #next-level-button'(event) {
        event.preventDefault();
        nextLevel();
        cleanupGame();
    }
});

function nextLevel() {
    const tmr = state.get("timer");
    state.set("timer", Math.round(tmr * 0.9));
    const rsc = state.get("rescuers");
    state.set("rescuers", Math.round(rsc * 1.6));
    const enm = state.get("enemies");
    state.set("rescuers", Math.round(enm * 1.9));
}

import './main.html';