var chat,
	http,
	io;


exports.start = function(app, config){
	http = require('http').Server(app);
	io = require('socket.io')(http);
	chat = require('./chat').init(config,io);
	console.log('chat',chat);
	
	http.listen(config.port, function(){
		console.log('WS listening on *:'+config.port);
	});

	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
		socket.on('chat message', function(msg){
			console.log('message: ',msg.userid, msg.roomid,msg.text);
			chat.newMessage(msg);
		});
	});
	return this;
};