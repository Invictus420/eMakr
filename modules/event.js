/**
 * Created by alexa on 09/11/2016.
 */
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
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;