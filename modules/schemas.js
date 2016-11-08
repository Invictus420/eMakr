var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: String,
    description: String,
    activities: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
    date: Date,
    joinCode: String,
    location: {type: String, coordinates:[]},
    proximity: Number,
    participants: [{type: Schema.Types.ObjectId, ref: 'Participant'}]
});

var activitySchema = new Schema({
    name: String,
    description: String,
    location: {type: String, coordinates:[]},
    proximity: Number,
    type: String,
    proof: Boolean
});

var participantSchema = new Schema({
    nickname: String,
    location: {type: String, coordinates:[]},
    group: Number
});

var godSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

var Event = mongoose.model('Event', eventSchema);
var Activity = mongoose.model('Activity', eventSchema);
var Participant = mongoose.model('Participant', eventSchema);
var God = mongoose.model('God', eventSchema);

module.exports.Event = Event;
module.exports.Activity = Activity;
module.exports.Participant = Participant;
module.exports.God = God;
