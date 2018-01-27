import 'bootstrap';
import 'p5';
import '../public/main.css';
import './main.css';
import {ReactiveDict} from 'meteor/reactive-dict';

state = new ReactiveDict();
state.set('rescuers', 0);
state.set('timer', null);

Template.registerHelper('state', function (key) {
    return state.get(key);
});

Template.body.events({
    'click #start-game-button'(event) {
        event.preventDefault();
        state.set('isRunning', true);
        initGame();
    }
})

import './main.html';