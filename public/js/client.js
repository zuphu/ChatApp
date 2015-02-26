var socket = io();

$(document).ready(function() {
    var cc = new ChatClient(socket);
    cc.listenAll();
    
    /* Click the send button */
    $('form').submit(function() {
	var msg = $('#m').val();
	processInput(msg, cc);
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
    });


});

var processInput = function (message, chatClient) {
    if (message[0] == "/") {
	var words = message.split(' ');
	console.log(words);
	message = words[0]
	    .substring(1, words[0].length)
	    .toLowerCase();
	var result = false;

	switch(message) {
	case 'join':
	    words.shift();
	    var room = words.join(' ');
	    joinRoom(room);
	    break;
	case 'nick':
	    words.shift();
	    var name = words.join(' ');
	    this.socket.emit('change name', name);
	    break;
	default:
	    result = 'Unrecognized command.';
	    break;
	};
    }
    else
	this.socket.emit('chat message', message);
    
    return result;
}

var joinRoom = function (newRoom) {
    this.socket.emit('join room', newRoom);
}
