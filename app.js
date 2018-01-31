
var config;
try {
	config = require('./config.js');
} catch(err) {
	console.error('config.js loading failed');
}
//really starting the server (I think)
var app = require('./server/betrayal.js').configure(config).start();
 

module.exports = app;
