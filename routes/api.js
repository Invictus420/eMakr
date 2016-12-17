/**
 * Created by alexa on 01/11/2016.
 */
var express = require('express');
var router = express.Router();
var controller = require('../modules/dataController');
var god = require('../modules/user');
var jwtConfig = require("../config/jwtconfig").jwtConfig;


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

router.get('/users', function(req, res, next){
    controller.getGods(req, res);
});

router.get('/user/:id/events', function(req, res, next){
    controller.getUserEvents(req, res);
});

router.put('/event/:id', function(req, res, next) {
    controller.editEvent(req,res);
});

router.delete('/event/:id', function(req, res, next) {
    controller.deleteEvent(req,res);
});

router.post('/event/:id/activity', function (req, res, next) {
    controller.addActivity(req,res);
});

router.get('/activity/:id', function(req, res, next){
    controller.getActivity(req, res);
});

router.put('/activity/:id', function(req, res, next){
   controller.editActivity(req, res);
});

router.delete('/activity/:id', function (req, res, next) {
    controller.deleteActivity(req,res);
});

router.post('/user/new', function(req, res, next){
    controller.newGod(req, res);
});

router.post('/login', function(req, res, next){
    controller.login(req, res);
});

router.put('/user/:id', function(req, res, next){
    controller.editGod(req, res);
});

router.post('/authenticate', function(req, res) {
    god.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({ msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var iat = new Date().getTime()/1000; //convert to seconds
                    var exp = iat+jwtConfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.username
                    }
                    var token = jwt.encode(payload, jwtConfig.secret);
                    // return the information including token as JSON
                    res.json({token: 'JWT ' + token});
                } else {
                    res.status(401).send({ msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

module.exports = router;
