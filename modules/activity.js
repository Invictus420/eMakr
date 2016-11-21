/**
 * Created by alexa on 09/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    name: String,
    description: String,
    creator :{type: Schema.Types.ObjectId, ref: 'Event'},
    location: {type: String, coordinates:[]},
    proximity: Number,
    type: String,
    proof: Boolean
});
var Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;