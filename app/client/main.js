import 'bootstrap';
import 'p5';
import '../public/main.css';
import './main.css';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Random} from 'meteor/random';

state = new ReactiveDict();
state.set('rescuers', 1);
state.set('collected', 0);
state.set('timer', 300);
state.set('count', 0);
state.set('enemies', 1);

randomId = function () {
    return Random.id();
};

Template.registerHelper('state', function (key) {
    return state.get(key);
});

Template.body.events({

    'click #retry-level-button'(event) {
        event.preventDefault();
        event.stopPropagation();

        cleanupGame();
    },

    'click #next-level-button'(event) {
        event.preventDefault();
        event.stopPropagation();
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