/**
 * Back-end entry point.
 */


// Modules
const express = require('express');

// Constants
const PORT_NUMBER = 3000;

// Initialize states
var connections = [],
    users = [];

// App and server
const app = express();
app.use(express.static('./public'));

// Using sockets
const server = app.listen(PORT_NUMBER);
io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

    // Disconnect handler (run once only)
    socket.once('disconnect', function() {

        // Remove the current user
        for (var i = 0; i < users.length; i++) {
            user = users[i];
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
    socket.on('userJoined', function(payload) {
        var newUser = {
            id: this.id,
            name: payload.name
        };

        users.push(newUser);

        io.emit('userJoined', users);
        console.log('User Joined: ' + payload.name);
    });

    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

});


console.log('Server is running on port ' + PORT_NUMBER);
