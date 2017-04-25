'use strict';

var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var errorHandler = require('./errors.server.controller');

exports.update = function(req, res, next) {
    if (req.user) {
        var tweet = new Tweet(req.body);
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

exports.reply = function(req, res, next) {
    if (req.user) {
        console.log('in reply'+req.body);
        var tweet = new Tweet(req.body);
        console.log('tweet'+tweet);
        console.log('id'+tweet.id);
        console.log('reply1'+tweet.reply);
        console.log('reply2'+tweet.reply[0].name);
        Tweet.update({_id: tweet.reply[0].text}, {
            reply:
                {
                    "tweetTime" : tweet.reply[0].tweetTime, 
                    "tweetText" : tweet.reply[0].tweetText, 
                    "screenPicture" : tweet.reply[0].screenPicture, 
                    "screenName" : tweet.reply[0].screenName, 
                    "name" : tweet.reply[0].name
                }
             },function(err) {
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