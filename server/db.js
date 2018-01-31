var Promise = require('bluebird');
var pg = require('pg');
var connString;

Promise.promisifyAll(pg,{ multiArgs: true });
Promise.promisifyAll(pg.Client.prototype,{ multiArgs: true });

exports.init = function(config){
	connString = config.database.url;
};

exports.connect = function() {
    var close;
    return pg.connectAsync(connString).spread(function(client, done) {
        close = done;
        return client;
    }).disposer(function() {
        if (close) close();
    });
};