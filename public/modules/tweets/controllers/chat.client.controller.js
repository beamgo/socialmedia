'use strict';

angular.module('tweets')
    .directive('loginForm', loginFormDirective)
    .directive('registerForm', registerFormDirective)
    .directive('submit', submitDirective)
;

    var storage = $.localStorage;
    console.log('storage'+storage);

    //var d = new Date();

    //var D = d.toUTCString().replace('GMT', '');

    var name,
        recognizeUser = $('.recognize-user'),
        storageCheck = false,
        //NicknameButton = $('#chatnamesavebutton'),
        html,
        htmlNickname,
        whisper,
        whisper_button = $('#whisper_button'),
        whisperToName,
        whisperTo = $('.whisper'),
        whisperStatus = false,
        whisperMsg = $('#whisperMsg'),
        textarea = $('.msg'),
        status = $('.chat-status span'),
        statusbox = $('.chat-status').hide(),
        // statusOld = status.text(),
        $avatar = $('.text'),
        //nickname_bool = false,
        messagesDiv = $('.messages');


    messagesDiv.css({display: 'block'});


    try {
        var socket = io.connect();
    } catch (e) {
        console.log('Could not connect to socket.');
        console.log('socket '+socket);
    }

    if (socket !== undefined) {
        console.log('Ok!');

    }
    

function loginFormDirective() {
    return function(scope, element, attrs) {

        element.bind('click', function() {
            console.log('element: ', element[0].id);
            console.log('attributes: ', attrs);

            
        })
    }
}

function registerFormDirective() {
    return function(scope, element, attrs) {

        element.bind('click', function() {
            console.log('click');

        })
    }
}

function submitDirective() {
    return function(scope, element, attrs) {

        element.bind('click', function() {
            console.log('click');

        })
    }
}