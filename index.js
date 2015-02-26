/*
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var io = require('socket.io');
var server = http.createServer(app);
*/
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'public')));

/*Default route*/
app.get('/', function(req, res){
    res.sendFile('index.html');
});

/*web server listening locally on port 3000*/
server.listen(3000, function(){
    console.log('listening on 127.0.0.1:3000');
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);
