var express = require('express');
var router = express.Router();

var user;

router.all('/', function(req, res, next) {
	var isLoggedIn = (req.session.passport && req.session.passport.user);
	if(isLoggedIn){user = req.session.passport.user;}
	res.render('index',{ title: "Login", isLoggedIn: isLoggedIn, isInclude: true, user: user, values: req.body });
});
module.exports = router;
