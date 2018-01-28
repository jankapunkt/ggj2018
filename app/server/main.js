import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser((options, user) => {
    user.score = 0;
    return user;
});

Meteor.publish(null, function () {
   return Meteor.users.find({}, {fields:{emails:1, score:1}})
});

Meteor.methods({
    'updateScore'({userId, score}){
        const user = Meteor.users.findOne(userId);
        Meteor.users.update(userId, {$set: {score: user.score + score}});
    },
    'getScores'({limit=20}) {
        return Meteor.users.find({}, {sort: {score:-1}, limit}).fetch();
    }
});