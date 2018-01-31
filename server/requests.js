var Promise = require('bluebird');
var db = require('./db');

exports.findByUsername = function(user) {
    return Promise.using(db.connect(), function(client) {
        return client.queryAsync({
            name: 'get_user',
            text: "SELECT id, login FROM e_user WHERE login = $1 and password = $2",
            values: [user.username, user.password]
            });
    }).get(0).get('rows').get(0);
};

exports.addMessageToRoom = function (user, room, message){
    return Promise.using(db.connect(), function(client) {
        return client.queryAsync({
            name: 'add_message_to_room',
            text: 'insert into e_message (id_perso, id_room, text) Values ($1,$2,$3)',
            values: [user, room, message]
            });
    }).get(0).get('rows').get(0);
}

exports.getMessagesForRoom = function(room, nbMessages){
    return Promise.using(db.connect(), function(client) {
        return client.queryAsync({
            name: 'get_user',
            text: "SELECT id_user FROM e_user WHERE login = $1 and password = $2",
            values: [user.username, user.password]
            });
    }).get(0).get('rows').get(0);
}