/**
 * Created by alexa on 01/11/2016.
 */
var express = require('express');
var router = express.Router();
var schemas = require('../modules/schemas')
var ObjectId = (require('mongoose').Types.ObjectId);

/* GET home page. */
router.post('/event/new', function(req, res, next) {
    var newEvent = req.body;
    var event = new schemas.Event(newEvent);
    event.save(function (err) {
        if(err){
            res.send(err);
        }
    });
    res.send(event);
});

router.get('/event/:id', function(req, res, next) {
    schemas.Event.findById(req.params.id()).exec(function(err, event){
        if(err) res.send(err);
        else res.send(event);
    });
});

router.put('/event/:id', function(req, res, next) {
    schemas.Event.update({_id: req.params.id},req.body).exec( function(err, res){
        if(err){
            res.send(err);
        }
        else {
            res.send(res);
        }
    });
});

router.delete('/event/:id', function(req, res, next) {
    schemas.Event.remove({_id: req.params.id}).exec(function (err) {
        if(err){
            res.send(err);
        }
        else{
            res.send("bye! mutter fukker, i always hated you. i am truely happy now.")
        }
    });
});

module.exports = router;
