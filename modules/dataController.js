var Event = require('./event');
var Activity = require('./activity');
var god = require('./user');

var newEvent = function (req, res) {
    var event = new Event();

    event.name = req.body.name;
    event.description = req.body.description;
    // TODO finish all these

    event.save(function (err, event) {
        if(err){
            res.send(err);
        } else {
            res.json(event);
        }
    });
};

var getEvents = function (req,res) {
    Event.find({})
        .exec(function (err, events) {
            if(err){
                res.send(err);
            }else {
                res.json(events);
            }
        })
}

var getEvent = function (req,res) {
    Event.findById(req.params.id)
        .exec(function(err, event){
            if(err){
                res.send(err);
            }
            else {
                res.json(event);
            }
    });
};

var editEvent = function (req,res) {
    Event.findOneAndUpdate({
        _id: req.params.id
    }, req.body
        ,{new: true}
        , function(err, event){
            if(err){
                res.send(err);
            }
            else {
                res.send(event);
            }
    });
};

var deleteEvent = function (req,res) {
    Event.findOneAndRemove({
        _id: req.params.id
    }, function (err, event ) {
        if(err){
            res.send(err);
        }
        else{
            console.log(event);
            res.send("bye! mutter fukker, i always hated you. i am truely happy now.")
        }
    });
};

var addActivity = function (req,res) {
    var newActivity = new Activity();
    newActivity.name = req.body.name;

    newActivity.save(function (err, activity) {
        if(err){
            res.send(err)
        } else {
            Event.findByIdAndUpdate(
                req.params.id,
                {$push: {activities: activity}},
                {new: true, safe: true, upsert: true},
            function (err,event) {
                    if(err){
                        res.send(err)
                    } else{
                        res.json(event);
                    }
            })
        }
    })
}

module.exports = {
    newEvent : newEvent,
    getEvent : getEvent,
    getEvents : getEvents,
    editEvent : editEvent,
    deleteEvent : deleteEvent,
    addActivity : addActivity
};