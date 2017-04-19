'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	name: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    },
    avatar: String
});

mongoose.model('Chat', ChatSchema);