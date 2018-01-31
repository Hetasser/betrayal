var express, 
app,
logger,
path,
_config,
favicon,
cookieParser,
session,
RedisStore,
sessionStore,
passport,
LocalStrategy,
flash,
ws,
requests,
db;

exports.configure = function(config){
	express = require('express');
	app=express();
	logger = require('morgan');
	path = require('path');
	favicon = require('serve-favicon');
	_config = config ;
	cookieParser = require('cookie-parser');
	bodyParser = require('body-parser');
	session = require('express-session');
	RedisStore = require('connect-redis')(session);
	sessionStore = new RedisStore(_config.redisStore || {});
	passport = require('passport');
	LocalStrategy = require('passport-local').Strategy;
	ws = require('./ws').start(app, _config),
	flash = require('connect-flash'),
	db= require('./db').init(config);
	requests = require('./requests.js');
	return this;
};


exports.start = function(){
	appSetup(app);
	return app;
};

function appSetup(app) {
	//view engine setup
	app.set('views', path.join(__dirname, '..','views'));
	app.set('view engine', 'jade');

	app.use(favicon(path.join(__dirname, '..','client', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '..','client')));

	//sessions
	app.use(session({
		store: sessionStore,
		secret: _config.secrets.session,
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	// passport
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new LocalStrategy({
		usernameField: 'b_username',
		passwordField: 'b_password'
	},
	function(username, password, done) {
		requests.findByUsername({username:username,password:password}).then(function(user) {
			if (!user) {
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			return done(null, user);
		});
	}
	));
	app.post('/login',
			passport.authenticate('local', { 
				successRedirect: '/',
				failureRedirect: '/',
				failureFlash: false })
	);
	app.post('/logout', function (req, res){
		req.logout();
		req.session.destroy(function (err) {
			res.redirect('/'); 
		});
	});

	//defining routes
	var admin = require('../routes/admin');
	var chat = require('../routes/chat');
	var equipment = require('../routes/equipment');
	var routes = require('../routes/index');
	var login = require('../routes/login');
	var view = require('../routes/view');
	var profile = require('../routes/profile');
	var world = require('../routes/world');
	var signup = require('../routes/signup');
	app.use('/', routes);
	app.use('/_adm1n', admin);
	app.use('/login', login);
	app.use('/chat', chat);
	app.use('/equipment', equipment);
	app.use('/profile', profile);
	app.use('/view', view);
	app.use('/world', world);
	app.use('/signup', signup);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

