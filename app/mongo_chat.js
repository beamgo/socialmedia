var mongo = require('mongodb').MongoClient;


exports.mognolizer = function (io,socket, users, WhisperChek) {
    mongo.connect('mongodb://127.0.0.1/twister-dev', function (err, db) {
        if (err) {
            throw err;
        }
        var collection = db.collection('messages');
        // console.log('users'+Object.keys(users));
        outputAllMessages(socket, collection);
        nickName(socket,io,users);
        userInput(io,socket,collection,WhisperChek);

    });
};

/**
 * OUTPUT ALL MESSAGES
 * @param socket
 * @param collection
 */
function outputAllMessages(socket, collection) {
    
    socket.on('user_param', function (user1,user2) {
        
    console.log('1'+user1);
    
    console.log('2'+user2);
    collection.find({$or: [
{$and: [{ name:user1 },{ paticipant:user2 }]}
,{$and: [{ name:user2 },{ paticipant:user1 }]}
]}).limit(50).sort({date: 1}).toArray(function (err, res) {
        if (err) {
            sendStatus('Error fetching messages.');
        }
        console.log('res'+res);
        // socket.on('storage', function (storage_data) {

            // console.log("storage: "+storage_data);

            for (var x = 0; x < res.length; x += 1) {
                // console.log({}"res[x].name: "+res[x].name);

                var output = {
                    date: res[x].date,
                    name: res[x].name,
                    message: res[x].message,
                    avatar: res[x].avatar
                };
                console.log('name'+res[x].name);


                // console.log("output: "+output);
                socket.emit('output-all', output, true);

            }
            if(res.length == 0) {
                socket.emit('output-all', {}, true);
            } 

        // });//end socket.on ('storage'...)
        });
    });
}

/**
 * NICKNAME
 * @param socket
 * @param io
 * @param users
 */
function nickName(socket,io,users) {
    socket.on('nickname', function (data) {
        socket.Username = data;
        users[socket.Username] = socket;
        console.log('users',users);
        updateNicknames(io,users);
    });
}




/**
 * sendStatus
 * @param socket
 * @param s
 */
function sendStatus(socket,s) {
    socket.emit('status', s);
}

/**
 * updateNicknames
 * @param io
 * @param users
 */
function updateNicknames(io,users) {
    io.emit('nickname', Object.keys(users));
}


/**
 * USER INPUT
 * @param io
 * @param socket
 * @param collection
 * @param WhisperChek
 */
function userInput(io,socket,collection,WhisperChek) {
    socket.on('userinput', function (data) {
        var name = data.name,
            message = data.message,
            whitespacePattern = /^\s*$/,
            date = data.date,
            avatar = data.avatar,
            paticipant = data.paticipant;
        console.log('paticipant'+paticipant);
        if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
            console.log('Invalid! Cannot insert empty string.');
            sendStatus(socket, 'Did you choose a USERNAME or typed in a MESSAGE yet?');
        }
        else {
            collection.insert({date: date, name: name, message: message, avatar: avatar, paticipant:paticipant}, function () {
                console.log(data.name + ' inserted a message into db');
                io.sockets.emit('output', data, WhisperChek);
                //Send status to current client
                sendStatus(socket,{
                    message: 'Message sent!',
                    clear: true
                });
            });
        }

    });
}

