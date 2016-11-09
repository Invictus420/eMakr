/**
 * Created by alexa on 09/11/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var godSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('God', godSchema);