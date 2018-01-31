var request,
	_io;

exports.init = function(config,io){
	_io = io;
	request = require('./requests');
	return this;
}

exports.newMessage = function(msg){
	console.log(msg);
	request.addMessageToRoom(msg.userid, 1,msg.text);
	_io.emit('chat message', {userlogin: msg.userlogin, roomid: 1, text: msg.text});
}

