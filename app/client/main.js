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
        if (Meteor.user()) {
            console.log(Meteor.user())
            state.set('level', Meteor.user().level || 1);
            setLevel();
            cleanupGame();
        }


        state.set('scores', Meteor.users.find({}).fetch()
            .sort((a,b)=> parseInt(b.score) - parseInt(a.score))
            .map(el => {
            return {
                level: el.level || 1,
                username: el.emails[0].address,
                score: el.score || 0
            }
        }));
    });
});

Template.body.helpers({

    highScores() {
        return state.get('scores');
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

function levelValue(start, level, factor) {
    //let tmp = start;
    //for (let i = 0; i < level; i++) {
     //   tmp = Math.round(tmp * factor);
    //}
    //return tmp;
    return Math.round(start * level * factor);
}

function setLevel() {
    const lvl = state.get("level");
    let _timer = 300;
    let _enemies = 1;
    let _rescuers = 1;


    state.set("timer", Math.round(_timer - (lvl * 9.5)));
    state.set("rescuers", levelValue(_rescuers, lvl, 1.6));
    state.set("enemies", levelValue(_enemies, lvl, 1.9));

}

function nextLevel() {
    const lvl = state.get('level');
    state.set('level', lvl + 1);
    setLevel();
}

import './main.html';