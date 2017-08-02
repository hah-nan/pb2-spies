/**
 * Back-end entry point.
 */


// Modules
const express = require('express');

// Constants
const PORT_NUMBER = 3000;

// Initialize states
var connections = [],
    users = [],
    messages = [];

// App and server
const app = express();
app.use(express.static('./public'));

// Using sockets
const server = app.listen(PORT_NUMBER);
io = require('socket.io').listen(server);

const cookie = require('cookie')

const jwt = require('jsonwebtoken')

io.sockets.on('connection', function(socket) {
    // Disconnect handler (run once only)
    var cookies = cookie.parse(socket.handshake.headers.cookie || '')
    if(cookies.token){
        var token = cookies.token
        var oldUser = jwt.decode(token, 'secret');
        oldUser.id = socket.id
        users.push(oldUser);

        console.log(oldUser.name)
        console.log(users)
        io.emit('userJoined', users);
        socket.emit('joined', oldUser, token)
    }

    socket.once('disconnect', function() {

        // Remove the current user
        for (var i = 0; i < users.length; i++) {
            user = users[i];
            console.log(this.id)
            if (user.id == this.id) {
                users.splice(i, 1);
                console.log("User disconnected: " + user);
            }
        };

        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('Disconnected: %s sockets connected', connections.length);
        io.emit('disconnect', users);
    });

    // Handler for adding messages
    socket.on('messageAdded', function(payload) {
        var newMessage = {
            timeStamp: payload.timestamp,
            text: payload.text,
            user: payload.user
        };
        io.emit('messageAdded', newMessage);
    });

    // Handler for adding users
    socket.on('join', function(payload) {
        var newUser = {
            id: this.id,
            name: payload.name
        };


        users.push(newUser);
        var token = jwt.sign(newUser, 'secret');

        socket.emit('joined', newUser, token)
        io.emit('userJoined', users);

        console.log('User Joined: ' + payload.name);
    });

    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

});


console.log('Server is running on port ' + PORT_NUMBER);
