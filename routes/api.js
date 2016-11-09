/**
 * Created by alexa on 01/11/2016.
 */
var express = require('express');
var router = express.Router();
var controller = require('../modules/dataController');

var ObjectId = (require('mongoose').Types.ObjectId);

/* GET home page. */
router.post('/event/new', function(req, res, next) {
    controller.newEvent(req,res);
});

router.get('/events', function(req, res, next) {
    controller.getEvents(req,res);
});

router.get('/event/:id', function(req, res, next) {
    controller.getEvent(req,res);
});

router.put('/event/:id', function(req, res, next) {
    controller.editEvent(req,res);
});

router.delete('/event/:id', function(req, res, next) {
    controller.deleteEvent(req,res);
});

router.post('/event/:id/activity', function (req, res, next) {
    controller.addActivity(req,res)
})

module.exports = router;
