'use strict';

var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var errorHandler = require('./errors.server.controller');

exports.update = function(req, res, next) {
    if (req.user) {
        console.log('req.body'+req.body);
        var tweet = new Tweet(req.body);
        console.log('tweet'+tweet);
        tweet.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                console.log(res.json(tweet));
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.me_timeline = function(req, res, next) {
    if (req.user) {
        var username = req.user.username;

        Tweet.find({
            screenName: username
        }, function(err, tweets) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(tweets);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.news_feed = function(req, res, next) {
    if (req.user) {
        var username = req.user.username;
        console.log('req.user '+req.user.username);
        Tweet.find({}, function(err, tweets) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(tweets);
                console.log('tweets vres'+res);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.user_timeline = function(req, res, next) {
    if (req.user) {
        var username = req.params.username;

        Tweet.find({
            screenName: username
        }, function(err, tweets) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(tweets);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};