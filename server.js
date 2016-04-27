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
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('Disconnected: %s sockets connected', connections.length);
        io.emit('disconnect');
    });

    // Handler for adding messages
    socket.on('messageAdded', function(payload) {
        var newMessage = {
            timeStamp: payload.timestamp,
            text: payload.text
        };
        io.emit('messageAdded', newMessage);
    });

    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

});


console.log('Server is running on port ' + PORT_NUMBER);
