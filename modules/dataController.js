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
};

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
            god.findOneAndUpdate({_id: req.body.userid},
                {$pull:{'events': new ObjectId(req.params.id)}},{safe:true},
                function(err, user){
                    if(err){
                        res.send(err)
                    } else{
                        console.log("deleted from user");
                    }
            });
            res.send("The event committed seppuku in your honour")
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

var getActivity = function(req, res){
    Activity.findById(req.params.id)
        .exec(function(err, activity){
            if(err){
                res.send(err);
            }
            else {
                res.json(activity);
            }
        });
};

var getActivities = function (req,res) {
    Activity.find({})
        .exec(function (err, activities) {
            if(err){
                res.send(err);
            }else {
                res.json(activities);
            }
        })
};

var editActivity = function (req,res) {
    Activity.findOneAndUpdate({
            _id: req.params.id
        }, req.body
        ,{new: true}
        , function(err, activity){
            if(err){
                res.send(err);
            }
            else {
                res.send(activity);
            }
        });
};

var deleteActivity = function (req,res) {
    Activity.findOneAndRemove({
        _id: req.params.id
    }, function (err, activity ) {
        if(err){
            res.send(err);
        }
        else{
            console.log(activity);
            god.findOneAndUpdate({_id: req.body.eventid},
                {$pull:{'activities': new ObjectId(req.params.id)}},{safe:true},
                function(err, event){
                    if(err){
                        res.send(err)
                    } else{
                        console.log("deleted from user");
                    }
                });
            res.send("The event committed seppuku in your honour")
        }
    });
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

var login = function(req, res){
    god.findOne({username:req.body.username})
        .exec(function(err, god){
            console.log(err);
            if(god === null){
                res.send("You don't exist bro")
            } else{
                console.log(god);
                if(god.password === req.body.password){
                    res.send("Success")
                } else{
                    res.send("That ain't your password, i'm calling the cops")
                }
            }
        })
}

var getGods = function (req,res) {
    god.find({})
        .exec(function (err, gods) {
            if(err){
                res.send(err);
            }else {
                res.json(gods);
            }
        })
}

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
    getActivity : getActivity,
    getActivities : getActivities,
    editActivity : editActivity,
    newGod : newGod,
    editGod : editGod,
    getUserEvents : getUserEvents,
    getGods : getGods,
    login : login
};