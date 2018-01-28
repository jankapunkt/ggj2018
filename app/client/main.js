import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
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
state.set('level', 1);
state.set('scores', []);
state.set('win', false);
state.set('winMsg', 'fallback');

randomId = function () {
    return Random.id();
};

Template.body.onCreated(function () {



    this.autorun(function () {
        console.log(Meteor.user())
       Meteor.call('getScores', {}, function (err, res) {
           if (err) console.error(err);
           state.set('scores', res.map(el => { return {username: el.emails[0].address, score: el.score || 0}}));
           console.log(res);
       })
    });
});

Template.body.helpers({

    highScores() {
        return state.get('scores');
    },

    debug() {
        console.log(state.get('win'),state.get('winMsg'), state.get('currentScore'))
    },

    state(key) {
        console.log("state", key, state.get(key))
        return state.get(key);
    }
});

Template.body.events({

    'click #highScoresButton'(event) {
        event.preventDefault();
        event.stopPropagation();
        state.set('modal', true);
        $('#score-modal').modal('show');
    },

    'click .closeHighScoreButton'(event) {
        event.preventDefault();
        event.stopPropagation();
        state.set('modal', false);
        $('#score-modal').modal('hide');
    },


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
    },


    'change #levelSelect'(event) {
        event.preventDefault();

    }
});

function setLevel() {
    const tmr = state.get("timer");
    state.set("timer", Math.round(tmr * 0.9));
    const rsc = state.get("rescuers");
    state.set("rescuers", Math.round(rsc * 1.6));
    const enm = state.get("enemies");
    state.set("enemies", Math.round(enm * 1.9));
}

function nextLevel() {
    const lvl = state.get('level');
    state.set('level', lvl + 1);
    setLevel();
}

import './main.html';