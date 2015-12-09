/**
 * Created by jmorey11 on 10/22/15.
 */
// Import the Express module
var express = require('express');



// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the Anagrammatix game file.
var ssApp = require('./soundsolution');

//define logger
var logger = require('morgan');

// Create a simple Express application
app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);


// Reduce the logging output of Socket.IO
io.set('log level',1);


// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    ssApp.initGame(io, socket);
});