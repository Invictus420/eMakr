var Event = require('./event');
var Activity = require('./activity');
var god = require('./user');
var ObjectId = require('mongoose').Types.ObjectId;
var async = require('async');

var newEvent = function (req, res) {

    var event = new Event();
    event.name = req.body.name;
    event.description = req.body.description;

    event.save(function (err, event) {
        if(err){
            res.send(err)
        } else {
            god.findByIdAndUpdate(
                req.body.userid,
                {$push: {events: event}},
                {new: true, safe: true, upsert: true},
                function (err,user) {
                    if(err){
                        console.log("user not found")
                        res.send(err)

                    } else{
                        res.json(event);
                    }
                })
        }
    })


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

var getUserEvents = function(req, res){
    god.findById(req.params.id)
        .exec(function(err, user){
            if(err){
                res.send(err);
            } else{
                Event.find({
                    _id: user.events
                }).exec(function (err, events) {
                    if(err){
                        res.send(err)
                    } else {
                        res.json(events);
                    }
                })

            }
    });
};

var getEventArray = function(idArray){
    async.map(idArray, function(currentValue){
        Event.findById(new ObjectId(currentValue))
            .exec(function(err, event){
                if(err){
                    console.log(err);
                } else{
                    return event;

                }
        })
    }, function (err ,res) {
        console.log(res);
        return res;
    });
};

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
};

var newGod = function(req, res){

    var user = new god();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err, user){
        if(err){
            res.send(err)
        } else{
            res.json(user);
        }
    });

};

var editGod = function(req, res){
    god.findOneAndUpdate({
            _id: req.params.id
        }, req.body
        ,{new: true}
        , function(err, god){
            if(err){
                res.send(err);
            }
            else {
                res.send(god);
            }
        });
}

var deleteGod = function(req, res){

};

module.exports = {
    newEvent : newEvent,
    getEvent : getEvent,
    getEvents : getEvents,
    editEvent : editEvent,
    deleteEvent : deleteEvent,
    addActivity : addActivity,
    newGod : newGod,
    editGod : editGod,
    getUserEvents : getUserEvents
};