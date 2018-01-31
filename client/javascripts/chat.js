var socket = io();
$('#send').click(function(){
	var msg = {text: $('#message').val(),roomid: $('input[name=roomid]:checked').val(), userid: $('#userid').val(),userlogin: $('#userlogin').val()};
	console.log('client chat.js ',msg)
	socket.emit('chat message', msg);
	$('#message').val('');
	return false;
});
socket.on('chat message', function(msg){
    $('#chat').append($('<li>').text(msg.userlogin + '(' + msg.roomid + ') : ' +  msg.text));
});