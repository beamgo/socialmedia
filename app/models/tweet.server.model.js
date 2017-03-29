'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');

var TweetSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    screenName: {
        type: String,
        trim: true
    },
    tweetText: {
        type: String
    },
    tweetTime: {
        type: Date,
        default: Date.now
    },
    tweetPic: {
        data: Buffer, 
        contentType: String
    } 
});

mongoose.model('Tweet', TweetSchema);